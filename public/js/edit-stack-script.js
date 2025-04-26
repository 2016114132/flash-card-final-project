let cardIndex = 1;

  // Build a card form block (front + back fields)
  function createCardForm(card = { id: null, front: '', back: '' }, index = 1) {
    const disabled = card.id ? 'disabled' : '';
    return `
      <div class="card-form" data-id="${card.id || ''}">
        <div class="card-header">
          <span>${index}</span>
          <div>
            <button type="button" class="edit-btn" onclick="editCard(this)">
              <i class="fas fa-pen"></i>
            </button>
            <button type="button" class="save-btn" onclick="saveCard(this)" style="display:none;">
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
            <input type="text" value="${card.front}" ${disabled} required>
          </div>
          <div class="form-group">
            <label>DEFINITION</label>
            <input type="text" value="${card.back}" ${disabled} required>
          </div>
        </div>
      </div>
    `;
  }  

  // Switch card to edit mode
  function editCard(button) {
    const card = button.closest('.card-form');
    card.querySelectorAll('input').forEach(input => input.disabled = false);
    card.querySelector('.edit-btn').style.display = 'none';
    card.querySelector('.save-btn').style.display = 'inline-block';
  }

  // Save card (update or add)
  function saveCard(button) {
    const card = button.closest('.card-form');
    const inputs = card.querySelectorAll('input');
    const front = inputs[0].value.trim();
    const back = inputs[1].value.trim();
    const id = card.getAttribute('data-id');

    if (!front || !back) {
      alert("Term and Definition cannot be empty.");
      return;
    }

    if (id) {
      // Existing card - update it
      fetch(`/cards/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ front, back })
      })
      .then(res => res.json())
      .then(() => {
        alert("Card updated!");
        inputs.forEach(input => input.disabled = true);
        card.querySelector('.edit-btn').style.display = 'inline-block';
        card.querySelector('.save-btn').style.display = 'none';
      })
      .catch(err => {
        console.error("Update failed:", err);
        alert("Failed to update card.");
      });

    } else {
      // New card - add it
      fetch("/cards", {
        method: "POST",
        // headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ front, back })
      })
      .then(res => res.json())
      .then(newCard => {
        alert("Card added!");
        card.setAttribute('data-id', newCard.id);
        inputs.forEach(input => input.disabled = true);
        card.querySelector('.edit-btn').style.display = 'inline-block';
        card.querySelector('.save-btn').style.display = 'none';
        updateCardNumbers();
      })
      .catch(err => {
        console.error("Add failed:", err);
        alert("Failed to add card.");
      });
    }
  }

  // Delete a card
  function deleteCard(button) {
    const card = button.closest('.card-form');
    const id = card.getAttribute('data-id');

    if (id) {
      // Confirm delete
      if (confirm("Are you sure you want to delete this card?")) {
        fetch(`/card/${id}`, {
          method: "DELETE"
        })
        .then(() => {
          alert("Card deleted!");
          card.remove();
          updateCardNumbers();
        })
        .catch(err => {
          console.error("Delete failed:", err);
          alert("Failed to delete card.");
        });
      }
    } else {
      // New (unsaved) card
      card.remove();
      updateCardNumbers();
    }
  }

  // Update card numbers displayed
  function updateCardNumbers() {
    document.querySelectorAll('.card-form').forEach((card, idx) => {
      card.querySelector('.card-header span').textContent = idx + 1;
    });
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

  document.addEventListener("DOMContentLoaded", () => {
    loadCards();

    document.getElementById('addCardBtn').addEventListener('click', () => {
      const html = createCardForm({}, cardIndex++);
      document.getElementById('cardList').insertAdjacentHTML('beforeend', html);
    });
  });