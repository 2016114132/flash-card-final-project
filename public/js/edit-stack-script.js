let cardIndex = 1;

// Build a card form block
function createCardForm(card = { id: null, front: '', back: '' }, index = 1) {
  const disabled = card.id ? 'disabled' : '';
  const isNew = !card.id;
  return `
    <div id="card-${index}" class="card-form ${isNew ? 'edit-mode' : ''}" data-id="${card.id || ''}">
      <div class="card-header">
        <span>${index}</span>
        <div>
          ${isNew ? '' : `
            <button type="button" class="edit-btn" onclick="editCard(this)">
              <i class="fas fa-pen"></i>
            </button>
          `}
          <button type="button" class="save-btn" onclick="saveCard(this)" ${isNew ? '' : 'style="display:none;"'}>
            <i class="fas fa-save"></i>
          </button>
          
          <button type="button" class="delete-btn" onclick="deleteCard(this)">
             <i class="fas fa-trash"></i>
           </button>
          
        </div>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>TERM</label>
          <input type="text" value="${card.front ?? ''}" ${disabled} required>
        </div>
        <div class="form-group">
          <label>DEFINITION</label>
          <input type="text" value="${card.back ?? ''}" ${disabled} required>
        </div>
      </div>
    </div>
  `;
}

// Switch card to edit mode
function editCard(button) {
  const card = button.closest('.card-form');
  card.classList.add('edit-mode');
  card.querySelectorAll('input').forEach(input => input.disabled = false);
  card.querySelector('.edit-btn').style.display = 'none';
  card.querySelector('.save-btn').style.display = 'inline-block';
}

// Updates or adds a card
function saveCard(button) {
  const card = button.closest('.card-form');
  const inputs = card.querySelectorAll('input');
  const frontInput = inputs[0];
  const backInput = inputs[1];
  const front = frontInput.value.trim();
  const back = backInput.value.trim();
  const id = card.getAttribute('data-id');

  // Clear previous errors
  card.querySelectorAll('.error-message').forEach(e => e.remove());
  frontInput.style.borderColor = "";
  backInput.style.borderColor = "";

  let hasError = false;
  if (!front) {
    showFieldError(frontInput);
    hasError = true;
  }
  if (!back) {
    showFieldError(backInput);
    hasError = true;
  }
  if (hasError) {
    showToast("Term and Definition cannot be empty.", "error");
    return;
  }

  const saveIcon = button.querySelector('i');
  if (saveIcon) {
    saveIcon.className = "fas fa-spinner fa-spin";
  }

  const payload = JSON.stringify({ front, back });
  const headers = { "Content-Type": "application/json" };

  if (id) {
    // Update existing card
    fetch(`/cards/${id}`, { method: "PUT", headers, body: payload })
      .then(handleFetchResponse)
      .then(() => {
        afterSaveSuccess(card, inputs, saveIcon, "Card updated successfully!");
      })
      .catch(err => {
        console.error(err);
        showToast("Failed to update card.", "error");
      });
  } else {
    // Add new card
    fetch("/cards", { method: "POST", headers, body: payload })
      .then(handleFetchResponse)
      .then(newCard => {
        card.setAttribute('data-id', newCard.id);
        afterSaveSuccess(card, inputs, saveIcon, "Card added successfully!");
      })
      .catch(err => {
        console.error(err);
        showToast("Failed to add card.", "error");
      });
  }
}

// Delete a card
function deleteCard(button) {
  const card = button.closest('.card-form');
  const id = card.getAttribute('data-id');

  if (!id) {
    card.remove();
    updateCardNumbers();
    cardIndex--;
    return;
  }

  if (confirm("Are you sure you want to delete this card?")) {
    fetch(`/card/${id}`, { method: "DELETE" })
      .then(handleFetchResponse)
      .then(() => {
        card.remove();
        updateCardNumbers();
        cardIndex--;
        showToast("Card deleted successfully!");
      })
      .catch(err => {
        console.error(err);
        showToast("Failed to delete card.", "error");
      });
  }
}

// Load existing cards
function loadCards() {
  fetch("/get-cards")
    .then(res => res.json())
    .then(cards => {
      cards.forEach((card, i) => {
        const html = createCardForm(card, i + 1);
        document.getElementById('cardList').insertAdjacentHTML('beforeend', html);
      });
      cardIndex = cards.length + 1;
    })
    .catch(err => {
      console.error("Load cards failed:", err);
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadCards();
  document.getElementById('addCardBtn').addEventListener('click', () => {
    const html = createCardForm({}, cardIndex++);
    document.getElementById('cardList').insertAdjacentHTML('beforeend', html);
  });
});

// Helper functions
function showFieldError(input) {
  input.style.borderColor = "red";
  const error = document.createElement('div');
  error.className = 'error-message';
  error.textContent = "Field is required.";
  error.style.color = "red";
  error.style.fontSize = "0.8rem";
  error.style.marginTop = "4px";
  input.parentNode.appendChild(error);
}

function afterSaveSuccess(card, inputs, saveIcon, message) {
  inputs.forEach(input => input.disabled = true);
  card.classList.remove('edit-mode');

  // if (saveIcon) {
  //   saveIcon.className = "fas fa-check";
  //   saveIcon.style.color = "#fff";
  // }

  showToast(message);

  // setTimeout(() => {
    const header = card.querySelector('.card-header div');
    header.innerHTML = `
      <button type="button" class="edit-btn" onclick="editCard(this)">
        <i class="fas fa-pen"></i>
      </button>
      <button type="button" class="save-btn" onclick="saveCard(this)" style="display:none;">
        <i class="fas fa-save"></i>
      </button>
      <button type="button" class="delete-btn" onclick="deleteCard(this)">
        <i class="fas fa-trash"></i>
      </button>
    `;
    updateCardNumbers();
  // }, 500);
}

function handleFetchResponse(res) {
  if (!res.ok) {
    return res.json().then(error => { throw new Error(error.error || "Server error"); });
  }
  return res.json();
}

function updateCardNumbers() {
  document.querySelectorAll('.card-form').forEach((card, idx) => {
    card.querySelector('.card-header span').textContent = idx + 1;
  });
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';

  if (type === 'success') {
    toast.style.backgroundColor = '#28a745';
  } else if (type === 'error') {
    toast.style.backgroundColor = '#dc3545';
  }

  let icon = type === 'success'
    ? `<i class="fas fa-check-circle" style="color: white; margin-right: 8px;"></i>`
    : `<i class="fas fa-times-circle" style="color: white; margin-right: 8px;"></i>`;

  toast.innerHTML = `${icon} ${message}`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}
