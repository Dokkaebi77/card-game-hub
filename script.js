// --------------------
// SHARED CARD DATA
// --------------------

const values = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A"
];

const suits = [
  "♠",
  "♥",
  "♦",
  "♣"
];


function setCardColor(
  element,
  cardText
) {

  if (
    cardText.includes("♥") ||
    cardText.includes("♦")
  ) {

    element.style.color =
      "#ef3123";

  }

  else {

    element.style.color =
      "black";

  }

}



// --------------------
// GAME MENU
// --------------------

const gameButtons =
  document.querySelectorAll(
    ".game-button"
  );

const gameScreens =
  document.querySelectorAll(
    ".game-screen"
  );


gameButtons.forEach(
  function(button) {

    button.addEventListener(
      "click",
      function() {

        const selectedGame =
          button.dataset.game;


        gameScreens.forEach(
          function(screen) {

            screen.classList.add(
              "hidden"
            );

          }
        );


        document
          .getElementById(
            selectedGame
          )
          .classList.remove(
            "hidden"
          );

      }
    );

  }
);



// --------------------
// HIGH CARD
// --------------------

const playerCard =
  document.getElementById(
    "player-card"
  );

const computerCard =
  document.getElementById(
    "computer-card"
  );

const drawButton =
  document.getElementById(
    "draw-button"
  );

const result =
  document.getElementById(
    "result"
  );


drawButton.addEventListener(
  "click",
  function() {

    const playerValue =
      Math.floor(
        Math.random() * 13
      );

    const computerValue =
      Math.floor(
        Math.random() * 13
      );

    const playerSuit =
      Math.floor(
        Math.random() * 4
      );

    const computerSuit =
      Math.floor(
        Math.random() * 4
      );


    playerCard.textContent =
      values[playerValue] +
      suits[playerSuit];


    computerCard.textContent =
      values[computerValue] +
      suits[computerSuit];


    setCardColor(
      playerCard,
      playerCard.textContent
    );


    setCardColor(
      computerCard,
      computerCard.textContent
    );


    if (
      playerValue >
      computerValue
    ) {

      result.textContent =
        "You win! 🎉";

    }

    else if (
      playerValue <
      computerValue
    ) {

      result.textContent =
        "Computer wins! 💻";

    }

    else {

      result.textContent =
        "Tie!";

    }

  }
);



// --------------------
// WAR
// --------------------

const warPlayerCard =
  document.getElementById(
    "war-player-card"
  );

const warComputerCard =
  document.getElementById(
    "war-computer-card"
  );

const warDrawButton =
  document.getElementById(
    "war-draw-button"
  );

const warResult =
  document.getElementById(
    "war-result"
  );

const warScore =
  document.getElementById(
    "war-score"
  );


let warPlayerScore = 0;
let warComputerScore = 0;


function showWarCards(
  playerValue,
  playerSuit,
  computerValue,
  computerSuit
) {

  warPlayerCard.textContent =
    values[playerValue] +
    suits[playerSuit];


  warComputerCard.textContent =
    values[computerValue] +
    suits[computerSuit];


  setCardColor(
    warPlayerCard,
    warPlayerCard.textContent
  );


  setCardColor(
    warComputerCard,
    warComputerCard.textContent
  );

}


warDrawButton.addEventListener(
  "click",
  function() {

    let playerValue =
      Math.floor(
        Math.random() * 13
      );

    let computerValue =
      Math.floor(
        Math.random() * 13
      );

    let playerSuit =
      Math.floor(
        Math.random() * 4
      );

    let computerSuit =
      Math.floor(
        Math.random() * 4
      );


    showWarCards(
      playerValue,
      playerSuit,
      computerValue,
      computerSuit
    );


    if (
      playerValue >
      computerValue
    ) {

      warPlayerScore++;

      warResult.textContent =
        "You win this round!";

    }

    else if (
      playerValue <
      computerValue
    ) {

      warComputerScore++;

      warResult.textContent =
        "Computer wins this round!";

    }

    else {

      let warFinished =
        false;


      while (
        !warFinished
      ) {

        playerValue =
          Math.floor(
            Math.random() * 13
          );

        computerValue =
          Math.floor(
            Math.random() * 13
          );

        playerSuit =
          Math.floor(
            Math.random() * 4
          );

        computerSuit =
          Math.floor(
            Math.random() * 4
          );


        showWarCards(
          playerValue,
          playerSuit,
          computerValue,
          computerSuit
        );


        if (
          playerValue >
          computerValue
        ) {

          warPlayerScore++;

          warResult.textContent =
            "WAR! You win the war!";

          warFinished =
            true;

        }

        else if (
          playerValue <
          computerValue
        ) {

          warComputerScore++;

          warResult.textContent =
            "WAR! Computer wins the war!";

          warFinished =
            true;

        }

      }

    }


    warScore.textContent =
      "Player: " +
      warPlayerScore +
      " | Computer: " +
      warComputerScore;

  }
);



// --------------------
// BLACKJACK
// --------------------

const blackjackPlayerCards =
  document.getElementById(
    "blackjack-player-cards"
  );

const blackjackDealerCards =
  document.getElementById(
    "blackjack-dealer-cards"
  );

const blackjackPlayerTotal =
  document.getElementById(
    "blackjack-player-total"
  );

const blackjackDealerTotal =
  document.getElementById(
    "blackjack-dealer-total"
  );

const blackjackStartButton =
  document.getElementById(
    "blackjack-start-button"
  );

const blackjackHitButton =
  document.getElementById(
    "blackjack-hit-button"
  );

const blackjackStandButton =
  document.getElementById(
    "blackjack-stand-button"
  );

const blackjackResult =
  document.getElementById(
    "blackjack-result"
  );


let blackjackPlayerHand = [];

let blackjackDealerHand = [];

let blackjackGameOver =
  true;



function drawBlackjackCard() {

  return {

    value:
      Math.floor(
        Math.random() * 13
      ),

    suit:
      Math.floor(
        Math.random() * 4
      )

  };

}



function getBlackjackCardName(
  card
) {

  return (
    values[card.value] +
    suits[card.suit]
  );

}



function getBlackjackCardPoints(
  card
) {

  const cardName =
    values[card.value];


  if (
    cardName === "J" ||
    cardName === "Q" ||
    cardName === "K"
  ) {

    return 10;

  }


  if (
    cardName === "A"
  ) {

    return 11;

  }


  return Number(
    cardName
  );

}



function calculateBlackjackTotal(
  hand
) {

  let total = 0;

  let aces = 0;


  hand.forEach(
    function(card) {

      total +=
        getBlackjackCardPoints(
          card
        );


      if (
        values[
          card.value
        ] === "A"
      ) {

        aces++;

      }

    }
  );


  while (
    total > 21 &&
    aces > 0
  ) {

    total -= 10;

    aces--;

  }


  return total;

}



/*
This is the important part.

Every Blackjack card now gets
a real white card box.
*/

function displayBlackjackHand(
  container,
  hand,
  hideSecondCard = false
) {

  container.innerHTML =
    "";


  hand.forEach(
    function(card, index) {

      const cardElement =
        document.createElement(
          "div"
        );


      cardElement.className =
        "blackjack-card";


      if (
        hideSecondCard &&
        index === 1
      ) {

        cardElement.classList.add(
          "hidden-card"
        );


        cardElement.textContent =
          "🂠";


        container.appendChild(
          cardElement
        );


        return;

      }


      const cardName =
        getBlackjackCardName(
          card
        );


      cardElement.textContent =
        cardName;


      setCardColor(
        cardElement,
        cardName
      );


      container.appendChild(
        cardElement
      );

    }
  );

}



function showBlackjackCards(
  hideDealerCard = true
) {

  displayBlackjackHand(
    blackjackPlayerCards,
    blackjackPlayerHand,
    false
  );


  blackjackPlayerTotal.textContent =
    "Total: " +
    calculateBlackjackTotal(
      blackjackPlayerHand
    );


  if (
    hideDealerCard &&
    !blackjackGameOver
  ) {

    displayBlackjackHand(
      blackjackDealerCards,
      blackjackDealerHand,
      true
    );


    blackjackDealerTotal.textContent =
      "Total: ?";

  }

  else {

    displayBlackjackHand(
      blackjackDealerCards,
      blackjackDealerHand,
      false
    );


    blackjackDealerTotal.textContent =
      "Total: " +
      calculateBlackjackTotal(
        blackjackDealerHand
      );

  }

}



// NEW GAME

blackjackStartButton.addEventListener(
  "click",
  function() {

    blackjackPlayerHand = [

      drawBlackjackCard(),

      drawBlackjackCard()

    ];


    blackjackDealerHand = [

      drawBlackjackCard(),

      drawBlackjackCard()

    ];


    blackjackGameOver =
      false;


    blackjackResult.textContent =
      "Hit or Stand?";


    showBlackjackCards(
      true
    );


    const playerTotal =
      calculateBlackjackTotal(
        blackjackPlayerHand
      );


    const dealerTotal =
      calculateBlackjackTotal(
        blackjackDealerHand
      );


    if (
      playerTotal === 21
    ) {

      blackjackGameOver =
        true;


      showBlackjackCards(
        false
      );


      if (
        dealerTotal === 21
      ) {

        blackjackResult.textContent =
          "Both have Blackjack! Push.";

      }

      else {

        blackjackResult.textContent =
          "Blackjack! You win! 🎉";

      }

    }

  }
);



// HIT

blackjackHitButton.addEventListener(
  "click",
  function() {

    if (
      blackjackGameOver
    ) {

      return;

    }


    blackjackPlayerHand.push(
      drawBlackjackCard()
    );


    showBlackjackCards(
      true
    );


    const total =
      calculateBlackjackTotal(
        blackjackPlayerHand
      );


    if (
      total > 21
    ) {

      blackjackGameOver =
        true;


      showBlackjackCards(
        false
      );


      blackjackResult.textContent =
        "Bust! Dealer wins.";

    }

    else if (
      total === 21
    ) {

      blackjackResult.textContent =
        "21! You can Stand.";

    }

  }
);



// STAND

blackjackStandButton.addEventListener(
  "click",
  function() {

    if (
      blackjackGameOver
    ) {

      return;

    }


    while (
      calculateBlackjackTotal(
        blackjackDealerHand
      ) < 17
    ) {

      blackjackDealerHand.push(
        drawBlackjackCard()
      );

    }


    blackjackGameOver =
      true;


    showBlackjackCards(
      false
    );


    const playerTotal =
      calculateBlackjackTotal(
        blackjackPlayerHand
      );


    const dealerTotal =
      calculateBlackjackTotal(
        blackjackDealerHand
      );


    if (
      dealerTotal > 21
    ) {

      blackjackResult.textContent =
        "Dealer busts! You win! 🎉";

    }

    else if (
      playerTotal >
      dealerTotal
    ) {

      blackjackResult.textContent =
        "You win! 🎉";

    }

    else if (
      playerTotal <
      dealerTotal
    ) {

      blackjackResult.textContent =
        "Dealer wins!";

    }

    else {

      blackjackResult.textContent =
        "Push! It's a tie.";

    }

  }
);



// --------------------
// GO FISH
// --------------------

const goFishPlayerHand =
  document.getElementById(
    "gofish-player-hand"
  );

const goFishPlayerBooks =
  document.getElementById(
    "gofish-player-books"
  );

const goFishComputerCount =
  document.getElementById(
    "gofish-computer-count"
  );

const goFishComputerBooks =
  document.getElementById(
    "gofish-computer-books"
  );

const goFishDeckCount =
  document.getElementById(
    "gofish-deck-count"
  );

const goFishRankSelect =
  document.getElementById(
    "gofish-rank"
  );

const goFishAskButton =
  document.getElementById(
    "gofish-ask-button"
  );

const goFishNewButton =
  document.getElementById(
    "gofish-new-button"
  );

const goFishResult =
  document.getElementById(
    "gofish-result"
  );


let goFishDeck = [];

let goFishPlayer = [];

let goFishComputer = [];

let playerBooks = 0;

let computerBooks = 0;

let goFishGameOver =
  true;



function createGoFishDeck() {

  const deck = [];


  for (
    let value = 0;
    value < values.length;
    value++
  ) {

    for (
      let suit = 0;
      suit < suits.length;
      suit++
    ) {

      deck.push({

        value: value,

        suit: suit

      });

    }

  }


  return deck;

}



function shuffleDeck(
  deck
) {

  for (
    let i =
      deck.length - 1;

    i > 0;

    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    const temp =
      deck[i];


    deck[i] =
      deck[j];


    deck[j] =
      temp;

  }

}



function drawFromGoFishDeck() {

  if (
    goFishDeck.length === 0
  ) {

    return null;

  }


  return goFishDeck.pop();

}



function getFishCardName(
  card
) {

  return (
    values[card.value] +
    suits[card.suit]
  );

}



function dealGoFishCards() {

  goFishPlayer = [];

  goFishComputer = [];


  for (
    let i = 0;
    i < 5;
    i++
  ) {

    goFishPlayer.push(
      drawFromGoFishDeck()
    );


    goFishComputer.push(
      drawFromGoFishDeck()
    );

  }

}



function removeBooks(
  hand,
  owner
) {

  const counts = {};


  hand.forEach(
    function(card) {

      if (
        !counts[
          card.value
        ]
      ) {

        counts[
          card.value
        ] = 0;

      }


      counts[
        card.value
      ]++;

    }
  );


  for (
    const value in counts
  ) {

    if (
      counts[value] >= 4
    ) {

      const numericValue =
        Number(value);


      for (
        let i =
          hand.length - 1;

        i >= 0;

        i--
      ) {

        if (
          hand[i].value ===
          numericValue
        ) {

          hand.splice(
            i,
            1
          );

        }

      }


      if (
        owner ===
        "player"
      ) {

        playerBooks++;

      }


      if (
        owner ===
        "computer"
      ) {

        computerBooks++;

      }

    }

  }

}



function updateGoFishRankOptions() {

  goFishRankSelect.innerHTML =
    "";


  const uniqueValues =
    [];


  goFishPlayer.forEach(
    function(card) {

      if (
        !uniqueValues.includes(
          card.value
        )
      ) {

        uniqueValues.push(
          card.value
        );

      }

    }
  );


  uniqueValues.forEach(
    function(value) {

      const option =
        document.createElement(
          "option"
        );


      option.value =
        value;


      option.textContent =
        values[value];


      goFishRankSelect.appendChild(
        option
      );

    }
  );

}



function displayGoFish() {

  goFishPlayerHand.innerHTML =
    "";


  goFishPlayer.forEach(
    function(card) {

      const cardElement =
        document.createElement(
          "div"
        );


      cardElement.className =
        "fish-card";


      const cardName =
        getFishCardName(
          card
        );


      cardElement.textContent =
        cardName;


      setCardColor(
        cardElement,
        cardName
      );


      goFishPlayerHand.appendChild(
        cardElement
      );

    }
  );


  goFishPlayerBooks.textContent =
    playerBooks;


  goFishComputerBooks.textContent =
    computerBooks;


  goFishComputerCount.textContent =
    goFishComputer.length;


  goFishDeckCount.textContent =
    goFishDeck.length;


  updateGoFishRankOptions();

}



function takeCardsOfRank(
  fromHand,
  toHand,
  value
) {

  const takenCards =
    [];


  for (
    let i =
      fromHand.length - 1;

    i >= 0;

    i--
  ) {

    if (
      fromHand[i].value ===
      value
    ) {

      takenCards.push(
        fromHand[i]
      );


      fromHand.splice(
        i,
        1
      );

    }

  }


  takenCards.forEach(
    function(card) {

      toHand.push(
        card
      );

    }
  );


  return takenCards.length;

}



function refillHandIfEmpty(
  hand
) {

  if (
    hand.length === 0 &&
    goFishDeck.length > 0
  ) {

    const card =
      drawFromGoFishDeck();


    if (card) {

      hand.push(
        card
      );

    }

  }

}



function checkGoFishGameOver() {

  if (
    goFishDeck.length === 0 &&
    (
      goFishPlayer.length === 0 ||
      goFishComputer.length === 0
    )
  ) {

    goFishGameOver =
      true;


    goFishResult.classList.remove(
      "go-fish-orange"
    );


    if (
      playerBooks >
      computerBooks
    ) {

      goFishResult.textContent =
        "Game over! You win! 🎉";

    }

    else if (
      computerBooks >
      playerBooks
    ) {

      goFishResult.textContent =
        "Game over! Computer wins!";

    }

    else {

      goFishResult.textContent =
        "Game over! It's a tie.";

    }


    return true;

  }


  return false;

}



function computerGoFishTurn() {

  if (
    goFishGameOver
  ) {

    return;

  }


  goFishResult.classList.remove(
    "go-fish-orange"
  );


  refillHandIfEmpty(
    goFishComputer
  );


  if (
    goFishComputer.length === 0
  ) {

    checkGoFishGameOver();

    return;

  }


  const randomCard =
    goFishComputer[
      Math.floor(
        Math.random() *
        goFishComputer.length
      )
    ];


  const requestedValue =
    randomCard.value;


  const cardsTaken =
    takeCardsOfRank(
      goFishPlayer,
      goFishComputer,
      requestedValue
    );


  if (
    cardsTaken > 0
  ) {

    goFishResult.textContent =
      "Computer asked for " +
      values[
        requestedValue
      ] +
      " and took " +
      cardsTaken +
      " card(s).";

  }

  else {

    const drawnCard =
      drawFromGoFishDeck();


    if (
      drawnCard
    ) {

      goFishComputer.push(
        drawnCard
      );


      goFishResult.textContent =
        "Computer asked for " +
        values[
          requestedValue
        ] +
        ". Go Fish!";

    }

  }


  removeBooks(
    goFishComputer,
    "computer"
  );


  refillHandIfEmpty(
    goFishPlayer
  );


  displayGoFish();


  checkGoFishGameOver();

}



goFishNewButton.addEventListener(
  "click",
  function() {

    goFishDeck =
      createGoFishDeck();


    shuffleDeck(
      goFishDeck
    );


    playerBooks = 0;

    computerBooks = 0;


    dealGoFishCards();


    removeBooks(
      goFishPlayer,
      "player"
    );


    removeBooks(
      goFishComputer,
      "computer"
    );


    goFishGameOver =
      false;


    goFishResult.classList.remove(
      "go-fish-orange"
    );


    goFishResult.textContent =
      "Choose a rank and ask the computer.";


    displayGoFish();

  }
);



goFishAskButton.addEventListener(
  "click",
  function() {

    if (
      goFishGameOver
    ) {

      return;

    }


    if (
      goFishPlayer.length === 0
    ) {

      return;

    }


    const requestedValue =
      Number(
        goFishRankSelect.value
      );


    const cardsTaken =
      takeCardsOfRank(
        goFishComputer,
        goFishPlayer,
        requestedValue
      );


    if (
      cardsTaken > 0
    ) {

      goFishResult.classList.remove(
        "go-fish-orange"
      );


      goFishResult.textContent =
        "Computer had " +
        cardsTaken +
        " " +
        values[
          requestedValue
        ] +
        "(s)!";

    }

    else {

      const drawnCard =
        drawFromGoFishDeck();


      if (
        drawnCard
      ) {

        goFishPlayer.push(
          drawnCard
        );


        goFishResult.classList.add(
          "go-fish-orange"
        );


        goFishResult.textContent =
          "Go Fish! You drew " +
          getFishCardName(
            drawnCard
          ) +
          ".";

      }

      else {

        goFishResult.classList.add(
          "go-fish-orange"
        );


        goFishResult.textContent =
          "Go Fish! But the deck is empty.";

      }

    }


    removeBooks(
      goFishPlayer,
      "player"
    );


    refillHandIfEmpty(
      goFishComputer
    );


    displayGoFish();


    if (
      checkGoFishGameOver()
    ) {

      return;

    }


    setTimeout(
      computerGoFishTurn,
      3000
    );

  }
);



// --------------------
// MEMORY
// --------------------

const memoryBoard =
  document.getElementById(
    "memory-board"
  );

const memoryMoves =
  document.getElementById(
    "memory-moves"
  );

const memoryMatches =
  document.getElementById(
    "memory-matches"
  );

const memoryNewButton =
  document.getElementById(
    "memory-new-button"
  );

const memoryResult =
  document.getElementById(
    "memory-result"
  );


let memoryCards = [];

let memoryFirstCard =
  null;

let memorySecondCard =
  null;

let memoryLockBoard =
  false;

let memoryMoveCount =
  0;

let memoryMatchCount =
  0;


const memorySymbols = [
  "A♠",
  "K♥",
  "Q♦",
  "J♣",
  "10♠",
  "9♥",
  "8♦",
  "7♣"
];



function createMemoryDeck() {

  let deck = [];


  memorySymbols.forEach(
    function(symbol) {

      deck.push(
        symbol
      );

      deck.push(
        symbol
      );

    }
  );


  return deck;

}



function shuffleMemoryDeck(
  deck
) {

  for (
    let i =
      deck.length - 1;

    i > 0;

    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    const temp =
      deck[i];


    deck[i] =
      deck[j];


    deck[j] =
      temp;

  }

}



function startMemoryGame() {

  memoryBoard.innerHTML =
    "";


  memoryFirstCard =
    null;

  memorySecondCard =
    null;

  memoryLockBoard =
    false;

  memoryMoveCount =
    0;

  memoryMatchCount =
    0;


  memoryMoves.textContent =
    0;


  memoryMatches.textContent =
    0;


  memoryResult.textContent =
    "Find all 8 matching pairs!";


  memoryCards =
    createMemoryDeck();


  shuffleMemoryDeck(
    memoryCards
  );


  memoryCards.forEach(
    function(symbol) {

      const card =
        document.createElement(
          "button"
        );


      card.className =
        "memory-card";


      card.dataset.symbol =
        symbol;


      card.textContent =
        "🂠";


      card.style.color =
        "white";


      card.addEventListener(
        "click",
        function() {

          flipMemoryCard(
            card
          );

        }
      );


      memoryBoard.appendChild(
        card
      );

    }
  );

}



function flipMemoryCard(
  card
) {

  if (
    memoryLockBoard
  ) {

    return;

  }


  if (
    card ===
    memoryFirstCard
  ) {

    return;

  }


  if (
    card.classList.contains(
      "matched"
    )
  ) {

    return;

  }


  card.classList.add(
    "flipped"
  );


  card.textContent =
    card.dataset.symbol;


  setCardColor(
    card,
    card.dataset.symbol
  );


  if (
    !memoryFirstCard
  ) {

    memoryFirstCard =
      card;

    return;

  }


  memorySecondCard =
    card;


  memoryMoveCount++;


  memoryMoves.textContent =
    memoryMoveCount;


  checkMemoryMatch();

}



function checkMemoryMatch() {

  const isMatch =
    memoryFirstCard
      .dataset
      .symbol ===
    memorySecondCard
      .dataset
      .symbol;


  if (
    isMatch
  ) {

    memoryFirstCard.classList.add(
      "matched"
    );


    memorySecondCard.classList.add(
      "matched"
    );


    memoryMatchCount++;


    memoryMatches.textContent =
      memoryMatchCount;


    memoryResult.textContent =
      "Match!";


    resetMemoryTurn();


    if (
      memoryMatchCount === 8
    ) {

      memoryResult.textContent =
        "You found all pairs in " +
        memoryMoveCount +
        " moves! 🎉";

    }

  }

  else {

    memoryLockBoard =
      true;


    memoryResult.textContent =
      "Not a match...";


    setTimeout(
      function() {

        memoryFirstCard
          .classList
          .remove(
            "flipped"
          );


        memorySecondCard
          .classList
          .remove(
            "flipped"
          );


        memoryFirstCard.textContent =
          "🂠";


        memorySecondCard.textContent =
          "🂠";


        memoryFirstCard.style.color =
          "white";


        memorySecondCard.style.color =
          "white";


        resetMemoryTurn();

      },

      1200
    );

  }

}



function resetMemoryTurn() {

  memoryFirstCard =
    null;

  memorySecondCard =
    null;

  memoryLockBoard =
    false;

}


memoryNewButton.addEventListener(
  "click",
  startMemoryGame
);