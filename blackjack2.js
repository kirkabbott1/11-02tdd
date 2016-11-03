var dealerHand = []
var playerHand = []
var card = newDeck();

$(document).ready(function() {
  $('#deal-button').click(function() {
    deal(card, playerHand)
  });
  $('#hit-button').click(function() {
    $('#player-hand').append(imageUrl);
  })
});

function deal (card, hand) {
  var newCard = card.pop();
  hand.push(newCard);
  var imageUrl = getCardImageUrl(newCard);
  var cardUrl = '<img src="' + imageUrl + '"/>';
  if (hand === dealerHand) {
    $('#dealer-hand').append(cardUrl);
  }
    else
      $('#player-hand').append(cardUrl);
}
// deal(card, dealerHand);

function getCardImageUrl(hand) {
  var name = hand.point;
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
  return 'assets/' + name + '_of_' + hand.suit + '.png';
}

function calculatePoints(cards) {
  cards.sort(function(a,b) {
      return b.point - a.point;
  });

  var sum = 0;
  for(var i=0;i< cards.length; i++){
      if(cards[i].point == 1){
          if(sum > 10){
              sum += 1;
          }
          else{
              sum += 11;
          }
      }
      if(cards[i].point >=2 && cards[i].point <= 10){
          sum += cards[i].point;
      }
      if(cards[i].point ==11 || cards[i].point == 12 || cards[i].point == 13){
          sum += 10;
      }
  }
  return sum;
}

function newDeck() {
  var deck = [];
  for (var i = 1; i <= 13; i++) {
        deck.push({point: i, suit: "diamonds"});
        deck.push({point: i, suit: "hearts"});
        deck.push({point: i, suit: "spades"});
        deck.push({point: i, suit: "clubs"});
  }
  return deck;
}
