
function Hand() {
  this.cardArray = []
  this.points = 0
};

Hand.prototype.addCard = function(card) {
  this.cardArray.push({point: card.point, suit: card.suit});
};

Hand.prototype.getPoints = function() {
  var sum = this.cardArray.reduce(function (currSum, addCurrVal) {
    var add = addCurrVal.point;
    if (add > 10) {
      add = 10;
    } else if (add === 1) {
      if (add >= 10){
        add = 1;
      } else {
        add += 10;
      }
    };
    return currSum + add;
  }, 0)
    // if (sum > 21) {
    //   $('#hit-button').prop('disabled', true);
    // }
    // if (sum === 21) {
    //   $('#hit-button').prop('disabled', true);
    //   $('#stand-button').prop('disabled', true);
    // }
  return sum;
};

function Deck() {
  this.deck = [];
};

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
}

Deck.prototype.draw = function() {
  console.log("current deck before being drawing a card: ");
  console.log(this.deck);

  var newCard = this.deck.pop();
  console.log("Drawn card: ");
  console.log(newCard);
  return newCard;
}

Deck.prototype.shuffle = function() {
  var i = 0, j = 0, temp = null;

  for (i = this.deck.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1));
    temp = this.deck[i];
    this.deck[i] = this.deck[j];
    this.deck[j] = temp;
  }
}
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
  $('#deal-button').click(function() {
    myDeck.newDeckGenerator();
    myDeck.shuffle();
    deal(playerHand)
    deal(dealerHand)
    deal(playerHand)
    deal(dealerHand)
    $('#deal-button').prop('disabled', true);
    $('#stand-button').prop('disabled', false);
    $('#hit-button').prop('disabled', false);
    $('#dealer-points').text(dealerHand.getPoints());
    $('#player-points').text(playerHand.getPoints());
    if (dealerHand.getPoints() === 21) {
      $('#messages').text('Dealer BlackJack');
    }
  });
  $('#hit-button').click(function() {
    deal(playerHand);
    $('#player-points').text(playerHand.getPoints());

    console.log("Player points: " + playerHand.getPoints());
    if (playerHand.getPoints() > 21) {
      console.log("I am greater than 21!!");
      $('#messages').text('You busted!');
      $('#hit-button').prop('disabled', true);
      $('#stand-button').prop('disabled', true);
    }

  });
  $('#stand-button').click(function() {
    stand();
    $('#hit-button').prop('disabled', true);
    $('#dealer-points').text(dealerHand.getPoints());
  })
  $('#Play-Again-button').click(function() {
    playAgain();
  })
});

function deal (hand) {

  var newCard = myDeck.draw();

  hand.addCard(newCard);
  var imageUrl = newCard.getImageUrl();
  var cardUrl = '<img class="card" src="' + imageUrl + '"/>';
    if (hand === dealerHand) {
      $('#dealer-hand').append(cardUrl);
      $('#dealer-points').text(dealerHand.getPoints());
    }
      else{
        $('#player-hand').append(cardUrl);
        $('#player-points').text(playerHand.getPoints());
  }
};

function Card(point, suit) {
  this.point = point;
  this.suit = suit;
};

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

  console.log("DEALER POINTS: " + dealerHand.getPoints());
  console.log("PLAYER POINTS: " + playerHand.getPoints());

  if (playerHand.getPoints() === dealerHand.getPoints()) {
    $('#messages').text("It's a push!");
  } else if (playerHand.getPoints() > 21 || dealerHand.getPoints() ===21) {
    $('#messages').text('you lost');
  }
  else if (playerHand.getPoints() === 21) {
    $('#messages').text('BLACKJACK!!!!');
  }
  else if (dealerHand.getPoints() > 21) {
    $('#messages').text('Dealer busts');
    console.log(dealerHand.getPoints());
  }
  else if (playerHand.getPoints() > dealerHand.getPoints()) {
    $('#messages').text('You win')
  }

  console.log(dealerHand.getPoints());
};

function stand() {
  console.log("enters stand");
  if (dealerHand.getPoints() < 17) {
    while (dealerHand.getPoints() < 17) {
      deal(dealerHand);
    }
  }
  checkWin();
  $('#stand-button').prop('disabled', true);
};

function playAgain() {
  console.log("playagain");
  $('#player-hand').empty();
  $('#dealer-hand').empty();
  $('#messages').empty();
  $('#dealer-points').empty();
  $('#player-points').empty();
  dealerHand.cardArray = [];
  playerHand.cardArray = [];
  $('#deal-button').prop('disabled', false)

};
