function getCardImageUrl(card) {
  var name = card.point;
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
  return 'images/' + name + '_of_' + card.suit + '.png';
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
