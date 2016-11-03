var dealerHand = []
var playerHand = []
var card = newDeck();

$(document).ready(function() {
  $('#deal-button').click(function() {
    deal(card, playerHand)
    deal(card, dealerHand)
    deal(card, playerHand)
    deal(card, dealerHand)
    dealt = true;
    $('#deal-button').prop('disabled', true);
    $('#dealer-points').text(calculatePoints(dealerHand));

  });
  $('#hit-button').click(function() {
    deal(card, playerHand);
    $('#player-points').text(calculatePoints(playerHand));
  })
});
var dealt = false;
function deal (card, hand) {
  var newCard = card.pop();
  hand.push(newCard);
  var imageUrl = getCardImageUrl(newCard);
  var cardUrl = '<img src="' + imageUrl + '"/>';
    if (hand === dealerHand) {
      $('#dealer-hand').append(cardUrl);

    }
      else{
        $('#player-hand').append(cardUrl);
  }
}

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

function calculatePoints(card) {
  card.sort(function(a,b) {
      return b.point - a.point;
  });

  var sum = 0;
  for(var i=0;i< card.length; i++){
      if(card[i].point == 1){
          if(sum > 10){
              sum += 1;
          }
          else{
              sum += 11;
          }
      }
      if(card[i].point >=2 && card[i].point <= 10){
          sum += card[i].point;
          }
      if(card[i].point ==11 || card[i].point == 12 || card[i].point == 13){
          sum += 10;
        }
      }
  if (sum >= 21) {
    $('#player-points').text('you busted, fuck you');

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
