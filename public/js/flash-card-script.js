let cards = [];
  
fetch("/get-cards")
  .then(response => response.json())
  .then(data => {
    cards = data;

    if (cards.length === 0) {
      cardFront.textContent = "No cards available";
      cardBack.textContent = "Please add cards in Edit Stack";
      counter.textContent = "0 / 0 Cards";

      // Disable navigation buttons
      document.getElementById('prevBtn').disabled = true;
      document.getElementById('nextBtn').disabled = true;
      return;
    }

    showCard(currentCard); // Now call showCard once data is ready
  })
  .catch(error => {
    console.error("Failed to fetch cards:", error);
    cardFront.textContent = "Error loading cards.";
    cardBack.textContent = "";
    counter.textContent = "";
  });
  
  // Current card index
  let currentCard = 0;
  
  // Get element references
  const card = document.getElementById('card');
  const cardFront = document.getElementById('cardFront');
  const cardBack = document.getElementById('cardBack');
  const counter = document.getElementById('counter');

  // Show a loading message initially
  cardFront.textContent = "Loading...";
  cardBack.textContent = "";
  counter.textContent = "";
  
  // Function to display and animate a specific card
  function showCard(index, direction = 'next') {
    const cardContainer = document.getElementById('card');
  
    const currentFront = cards[index].front;
    const currentBack = cards[index].back;
    counter.textContent = `${index + 1} / ${cards.length} Cards`;
  
    // Reset flipped state
    card.classList.remove('flipped');
  
    if (direction === 'next') {
      // Animate card when entering
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay-enter';
      overlay.textContent = currentFront;
      cardContainer.appendChild(overlay);
  
      setTimeout(() => {
        cardFront.textContent = currentFront;
        cardBack.textContent = currentBack;
        overlay.remove();
        updateNavigationButtons(index); // update next/prev disabled state
      }, 400);
  
    } else if (direction === 'prev') {
      // Animate card when exiting
      const overlay = document.createElement('div');
      overlay.className = 'card-overlay-exit';
      overlay.textContent = cardFront.textContent;
      cardContainer.appendChild(overlay);
  
      cardFront.textContent = currentFront;
      cardBack.textContent = currentBack;
  
      setTimeout(() => {
        overlay.remove();
        updateNavigationButtons(index); // update next/prev disabled state
      }, 400);
  
    } else {
      // Loads content to the card without any animation. This is used for when we shuffle or first initialize
      cardFront.textContent = currentFront;
      cardBack.textContent = currentBack;
      updateNavigationButtons(index); // update next/prev disabled state
    }
  
    // Track the current index
    currentCard = index; 
  }
  
  // Disable "Previous" button if we are on the first card & "Next" button if we are on the last card
  function updateNavigationButtons(index) {
    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === cards.length - 1;
  }
  
  // Flip card when clicked
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
  
  // Navigate to next card
  document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentCard < cards.length - 1) {
      showCard(currentCard + 1, 'next');
    }
  });
  
  // Navigate to previous card
  document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentCard > 0) {
      showCard(currentCard - 1, 'prev');
    }
  });
  
  // Shuffles the cards
  document.getElementById('shuffleBtn').addEventListener('click', () => {
    const cardInner = document.querySelector('.card-inner');
  
    // Add shuffle animation class and icon
    cardInner.classList.add('card-shuffle-animate', 'shuffle-active');
  
    // Remove animation classes after animation ends
    cardInner.addEventListener('animationend', () => {
      cardInner.classList.remove('card-shuffle-animate', 'shuffle-active');
    }, { once: true });
  
    // Shuffle cards and reset to index 0
    cards = cards.sort(() => Math.random() - 0.5);
    currentCard = 0;
    showCard(currentCard, 'none');
  });
  
  // // Initial load
  // showCard(currentCard);
  