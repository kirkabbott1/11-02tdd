

// create Hand Constructor

function Hand() {
  this.cardArray = [];
}

 Hand.prototype.getPoints = function() {
   var length = this.cardArray.length;
   var counter = 0;
   var count_1 = false;

   var points = this.cardArray.reduce(function(totalPoints, card) {
     if (card.point > 10) {
       card.point = 10;
     }
     counter++;
     totalPoints += card.point;
     if (card.point === 1) {
       count_1 = true;
     }
     if (counter === length) {
       if (totalPoints <= 11 && count_1) {
         totalPoints += 10;
       }
     }
     console.log("total points: " + totalPoints);
     return totalPoints;
   }, 0);
   return points;
 };

 Hand.prototype.addCard = function(newCard) {
   this.cardArray.push({point: newCard.point, suit: newCard.suit});
 };
    // if (sum > 21) {
    //   $('#hit-button').prop('disabled', true);
    // }
    // if (sum === 21) {
    //   $('#hit-button').prop('disabled', true);
    //   $('#stand-button').prop('disabled', true);
    // }


function Deck() {
  this.deck = [];
}

Deck.prototype.newDeckGenerator = function() {
  for (var i = 1; i <= 13; i++) {
    this.deck.push(new Card(i, "diamonds"));
    this.deck.push(new Card(i, "spades"));
    this.deck.push(new Card(i, "clubs"));
    this.deck.push(new Card(i, "hearts"));
  }
  console.log("NEW DECK OF CARDS BEING GENERATED: ");
  console.log(this.deck);
  console.log("Length of newly gnerated deck: " + this.deck.length);
};

Deck.prototype.draw = function() {
  console.log("current deck before being drawing a card: ");
  console.log(this.deck);

  var newCard = this.deck.pop();
  console.log("Drawn card: ");
  console.log(newCard);
  return newCard;
};

Deck.prototype.shuffle = function() {
  var i = 0, j = 0, temp = null;

  for (i = this.deck.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this.deck[i];
    this.deck[i] = this.deck[j];
    this.deck[j] = temp;
  }
};
// Deck.prototype.shuffle = function() {
//   for (var i = this.deck.length -1; i > 0; i--) {
//     var index = Math.floor(Math.random() * i +1);
//     var temp = this.deck[i];
//     this.deck[i] = this.deck[index];
//     this.deck[index] = temp;
//   }
//   return this.deck;
// }

var myDeck = new Deck();
var dealerHand = new Hand();
var playerHand = new Hand();


$(document).ready(function() {

  $('#stand-button').prop('disabled', true);
  $('#hit-button').prop('disabled', true);
  // $('#Play-Again-button').prop('disabled', false);
  $('#deal-button').click(function() {
    $('#Play-Again-button').prop('disabled', true);
    myDeck.newDeckGenerator();
    myDeck.shuffle();
    console.log(myDeck.deck.length);
    deal(playerHand);
    deal(dealerHand);
    deal(playerHand);
    deal(dealerHand, 'hole');
    $('#deal-button').prop('disabled', true);
    $('#stand-button').prop('disabled', false);
    $('#hit-button').prop('disabled', false);
    // $('#dealer-points').text(dealerHand.getPoints());
    // $('#player-points').text(playerHand.getPoints());
    if (dealerHand.getPoints() === 21 && playerHand.getPoints() === 21) {
      $('#messages').text('BlackJack Push');
      $('#hit-button').prop('disabled', true);
      showDealer();
    } else if (dealerHand.getPoints() === 21) {
      $('#messages').text('Dealer BlackJack');
      $('#hit-button').prop('disabled', true);
      showDealer();
      $('#stand-button').prop('disabled', true);
      $('#Play-Again-button').prop('disabled', false);
    } else if (playerHand.getPoints() === 21) {
      $('#messages').text('You got BlackJack, click stand');
      $('#hit-button').prop('disabled', true);
      showDealer();
    }
  });
  $('#hit-button').click(function() {
    deal(playerHand);
    $('#player-points').text(playerHand.getPoints());

    console.log("Player points: " + playerHand.getPoints());
    if (playerHand.getPoints() > 21) {
      $('#messages').text('You busted!');
      $('#hit-button').prop('disabled', true);
      $('#stand-button').prop('disabled', true);
      $('#Play-Again-button').prop('disabled', false);
    }

  });
  $('#stand-button').click(function() {
    stand();
    $('#hit-button').prop('disabled', true);
    $('#dealer-points').text(dealerHand.getPoints());
  });
  $('#Play-Again-button').click(function() {
    playAgain();
  });
});

function deal(hand, hole) {

  var newCard = myDeck.draw();

  console.log("DRAW NEW CARD: ");
  console.log(newCard);

  hand.addCard(newCard);
  var imageUrl = newCard.getImageUrl();
  var cardUrl = '<img class="card" src="' + imageUrl + '"/>';
    if (hand === dealerHand) {
      var text = "";
      if (hole) {
        cardUrl = '<img id="holeCard" class="card" src="assets/backCard.png"/>';
        text = '';
      } else {
        text = dealerHand.getPoints();
      }
      $('#dealer-hand').append(cardUrl);
      $('#dealer-points').text(text);
    }
      else{
        $('#player-hand').append(cardUrl);
        $('#player-points').text(playerHand.getPoints());
  }
}

function Card(point, suit) {
  this.point = point;
  this.suit = suit;
}

Card.prototype.getImageUrl = function() {
  var name = this.point;
  if (name  === 11){
    name = 'jack';
  }
  else if(name === 12){
    name = 'queen';
  }
  else if(name === 13){
    name = 'king';
  }
  else if(name === 1){
      name = 'ace';
  }
  return 'assets/' + name + '_of_' + this.suit + '.png';
};

function checkWin() {
  //
  // console.log("DEALER POINTS: " + dealerHand.getPoints());
  // console.log("PLAYER POINTS: " + playerHand.getPoints());

  if (playerHand.getPoints() === dealerHand.getPoints()) {
    $('#messages').text("It's a push :/");
  }
  else if (dealerHand.getPoints() > 21) {
    $('#messages').text('Dealer busts :)');
    console.log(dealerHand.getPoints());
  }
  else if (playerHand.getPoints() > 21 || dealerHand.getPoints() === 21 || (dealerHand.getPoints() > playerHand.getPoints())) {
    $('#messages').text('you lost :(');
  }
  else if (playerHand.getPoints() === 21) {
    $('#messages').text('You Win with 21! :)');
  }

  else if (playerHand.getPoints() > dealerHand.getPoints()) {
    $('#messages').text('You win :)');
  }
  $('#Play-Again-button').prop('disabled', false);
  console.log(dealerHand.getPoints());
}
function showDealer() {
  $("#holeCard").remove();

  // create a new instance of card
  var card = new Card(dealerHand.cardArray[1].point, dealerHand.cardArray[1].suit);

  // add the hole card facing up
  $("#dealer-hand").append('<img class="card" src="' + card.getImageUrl() + '"/>');
}
function stand() {
  showDealer();

  console.log("enters stand");
  if (dealerHand.getPoints() < 17) {
    while (dealerHand.getPoints() < 17) {
      deal(dealerHand);
    }
  }
  checkWin();
  $('#stand-button').prop('disabled', true);
  $('#hit-button').prop('disabled', true);
}

function playAgain() {
  myDeck.deck = [];
  console.log('Deck length play again:' + myDeck.deck.length);
  $('#player-hand').empty();
  $('#dealer-hand').empty();
  $('#messages').empty();
  $('#dealer-points').empty();
  $('#player-points').empty();
  dealerHand.cardArray = [];
  playerHand.cardArray = [];
  $('#deal-button').prop('disabled', false);
}
