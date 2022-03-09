const cardsImg = document.querySelectorAll(".card-img");
const cards = document.querySelectorAll(".card");
const questionMark = document.querySelectorAll("h1");
const modal = document.querySelector(".modal");
const container = document.querySelector(".container");
const startingContainer = document.querySelector(".starting-container");
const startButton = document.querySelector(".starting-button");
const modalButton = document.querySelector(".modal-button");
const attempts = document.querySelector(".attempts");
const bestResult = document.querySelector(".best-result");
const images = [
  { tag: "deer", image: "url('./images/image1.jfif')" },
  { tag: "deer", image: "url('./images/image1.jfif')" },
  { tag: "bear", image: "url('./images/image2.jfif')" },
  { tag: "bear", image: "url('./images/image2.jfif')" },
  { tag: "fish", image: "url('./images/image3.jfif')" },
  { tag: "fish", image: "url('./images/image3.jfif')" },
  { tag: "elephant", image: "url('./images/image4.jfif')" },
  { tag: "elephant", image: "url('./images/image4.jfif')" },
  { tag: "cat", image: "url('./images/image5.jfif')" },
  { tag: "cat", image: "url('./images/image5.jfif')" },
  { tag: "dog", image: "url('./images/image6.jfif')" },
  { tag: "dog", image: "url('./images/image6.jfif')" },
  { tag: "horse", image: "url('./images/image7.jfif')" },
  { tag: "horse", image: "url('./images/image7.jfif')" },
  { tag: "monkey", image: "url('./images/image8.jfif')" },
  { tag: "monkey", image: "url('./images/image8.jfif')" },
];

let results = [];
let completedTracker = 0;
let openedCards = [];
let clicks = 0;

if (!localStorage.najbolji) localStorage.setItem("najbolji", "10000");

const addStyle = (element, index) => {
  element.style.background = images[index].image;
  element.style.backgroundSize = "cover";
  element.style.backgroundPosition = "center";
  element.style.backgroundRepeat = "no-repeat";
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

cardsImg.forEach((cardImg, index) => {
  cardImg.addEventListener("click", () => {
    if (results.length < 2) {
      cardImg.classList.remove("close");
      cardImg.classList.add("open");
      results.push(images[index].tag);
      openedCards.push(cardImg);
      clicks++;
    }
    if (results.length === 2 && results[0] === results[1]) {
      cardImg.disabled = "true";
      results = [];
      openedCards = [];
      completedTracker++;
    }

    if (results.length === 2 && results[0] !== results[1]) {
      setTimeout(() => {
        openedCards[0].classList.remove("open");
        openedCards[0].classList.add("close");
        openedCards[1].classList.remove("open");
        openedCards[1].classList.add("close");
        results = [];
        openedCards = [];
      }, 800);
    }
    if (completedTracker === 8) {
      setTimeout(() => {
        if (localStorage.najbolji > clicks) {
          localStorage.najbolji = clicks;
        }
        attempts.innerText = `Uspjeli ste iz ${clicks} pokušaja.`;
        bestResult.innerText = `Najbolji prijašnji rezultat: ${localStorage.najbolji}`;
        container.classList.add("hidden");
        modal.classList.remove("hidden");
      }, 1000);
    }
  });
});

const beginGame = () => {
  results = [];
  completedTracker = 0;
  openedCards = [];
  clicks = 0;
  startingContainer.classList.add("hidden");
  container.classList.remove("hidden");
  modal.classList.add("hidden");
  cardsImg.forEach((cardImg) => {
    cardImg.disabled = "false";
    cardImg.classList.remove("open");
  });
  (() => {
    shuffleArray(images);
    cards.forEach((card, index) => {
      addStyle(card, index);
    });
  })();
};

startButton.addEventListener("click", () => beginGame());
modalButton.addEventListener("click", () => beginGame());
