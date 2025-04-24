// Temporary Flashcard data
let cards = [
    { front: "What does HTML stand for?", back: "HyperText Markup Language" },
    { front: "What does CSS stand for?", back: "Cascading Style Sheets" },
    { front: "What is the purpose of JavaScript?", back: "To make web pages interactive" },
    { front: "What does SQL stand for?", back: "Structured Query Language" },
    { front: "What is the output of `typeof null` in JavaScript?", back: "`object`" },
    { front: "What does the '==' operator do in JavaScript?", back: "Compares values with type coercion" },
    { front: "What does the '===' operator do?", back: "Compares values without type coercion (strict equality)" },
    { front: "What is a function?", back: "A reusable block of code that performs a task" },
    { front: "What is a variable?", back: "A container used to store data values" },
    { front: "What keyword is used to declare a constant in JavaScript?", back: "`const`" },
    { front: "What is a loop?", back: "A way to repeat a block of code multiple times" },
    { front: "What is an array?", back: "A list-like object used to store multiple values" },
    { front: "What is a for loop?", back: "A loop that repeats until a condition is false" },
    { front: "What is recursion?", back: "A function that calls itself" },
    { front: "What does DOM stand for?", back: "Document Object Model" },
    { front: "What does API stand for?", back: "Application Programming Interface" },
    { front: "What is a Git commit?", back: "A snapshot of changes in a repository" },
    { front: "What is the purpose of `npm`?", back: "To manage packages for Node.js" },
    { front: "What does JSON stand for?", back: "JavaScript Object Notation" },
    { front: "What is a callback function?", back: "A function passed into another function as an argument" }
  ];
  
  // Current card index
  let currentCard = 0;
  
  // Get element references
  const card = document.getElementById('card');
  const cardFront = document.getElementById('cardFront');
  const cardBack = document.getElementById('cardBack');
  const counter = document.getElementById('counter');
  
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
  
  // Initial load
  showCard(currentCard);
  