let cardIndex = 1;

  function createCardForm(index, card = { front: '', back: '' }) {
    return `
      <div class="card-form">
        <div class="card-header">
          <span>${index}</span>
          <button type="button" class="delete-btn" onclick="removeCard(this)">
            <i class="fas fa-trash"></i>
          </button>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label>TERM</label>
            <input type="text" name="cards[${index - 1}][front]" value="${card.front}" required>
          </div>
          <div class="form-group">
            <label>DEFINITION</label>
            <input type="text" name="cards[${index - 1}][back]" value="${card.back}" required>
          </div>
        </div>
      </div>
    `;
  }

  function removeCard(button) {
    const card = button.closest('.card-form');
    card.remove();
    updateCardNumbers();
  }

  function updateCardNumbers() {
    const cards = document.querySelectorAll('.card-form');
    cards.forEach((card, i) => {
      card.querySelector('.card-header span').textContent = i + 1;
    });
    cardIndex = cards.length + 1;
  }

  function loadCards() {
    fetch('/get-cards')
      .then(res => res.json())
      .then(data => {
        data.forEach((card, i) => {
          const html = createCardForm(i + 1, card);
          document.getElementById('cardList').insertAdjacentHTML('beforeend', html);
        });
        cardIndex = data.length + 1;
      })
      .catch(err => {
        console.error("Failed to load cards:", err);
      });
  }

  document.addEventListener("DOMContentLoaded", () => {
    loadCards();

    const addBtn = document.getElementById('addCardBtn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const html = createCardForm(cardIndex++);
        document.getElementById('cardList').insertAdjacentHTML('beforeend', html);
      });
    }
  });