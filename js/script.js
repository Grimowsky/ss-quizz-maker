var buttonPosition = 0;

var handInfo = {
  player1: {
    nickname: 'Player1',
    stack: 0,
    betsize: 0,
    actionFlop: '',
    actionTurn: '',
    actionRiver: ''
  },
  player2: {
    nickname: 'Player2',
    stack: 0,
    betsize: 0,
    actionFlop: '',
    actionTurn: '',
    actionRiver: ''
  },
  hero: {
    cards: '',
    stack: 0,
    betsize: 0,
    actionFlop: '',
    actionTurn: '',
    actionRiver: ''
  },
  board: {
    flop: '',
    turn: '',
    river: ''
  },
  blinds: {
    smallBlind: '',
    bigBlind: ''
  }
}

function insertValues() {
  var stack1 = document.getElementById("stack1").value;
  document.getElementById("leftSeatStack").innerHTML = stack1;
  this.handInfo.player1.stack = stack1

  var stack2 = document.getElementById("stack2").value;
  document.getElementById("rightSeatStack").innerHTML = stack2;
  this.handInfo.player2.stack = stack2

  var stack3 = document.getElementById("stack3").value;
  document.getElementById("bottomSeatStack").innerHTML = stack3;
  this.handInfo.hero.stack = stack3
  howManyBets = 0
}

function hidePlayer() {
  var x = document.getElementById('leftSeat');
  if (x.style.visibility === 'hidden') {
    x.style.visibility = 'visible';
  } else {
    x.style.visibility = 'hidden';
  }
}

function hidePlayer2() {
  var x = document.getElementById('rightSeat');
  if (x.style.visibility === 'hidden') {
    x.style.visibility = 'visible';
  } else {
    x.style.visibility = 'hidden';
  }
}
function setHero() {
  var cards = document.getElementById('heroCard').value;
  var card1 = cards.substr(0, 2);
  var card2 = cards.substr(2, 2);
  if (cards) {
    document.getElementById("backCard1_hero").src = 'assets/cards/' + card1 + '.png';
    document.getElementById("backCard2_hero").src = 'assets/cards/' + card2 + '.png';
    this.handInfo.hero.cards = card1 + ' ' + card2;
  }

}

function setFlop() {
  var flopVisibility = document.getElementById('board');
  var flop = document.getElementById("flopInput").value;
  if (flop.length > 0) {
    flopVisibility.style.visibility = 'visible';
  } else {
    flopVisibility.style.visibility = 'hidden';
  }
  var flop_card_1 = flop.substr(0, 2)
  var flop_card_2 = flop.substr(2, 2)
  var flop_card_3 = flop.substr(4, 2)

  if (flop) {
    document.getElementById("flop_1").src = 'assets/cards/' + flop_card_1 + '.png';
    document.getElementById("flop_2").src = 'assets/cards/' + flop_card_2 + '.png';
    document.getElementById("flop_3").src = 'assets/cards/' + flop_card_3 + '.png';
  }
}

function setTurn() {
  var flop_card_4 = document.getElementById("flop_4_input").value;
  if (flop_card_4) {
    if (!document.getElementById('turn')) {
      var turn = document.createElement("img")
      turn.setAttribute("src", 'assets/cards/' + flop_card_4 + '.png')
      turn.setAttribute("id", 'turn')
      document.getElementById("board").appendChild(turn)
    } else {
      document.getElementById("turn").src = 'assets/cards/' + flop_card_4 + '.png';
    }
  }
  //else {
  //     var image = document.getElementById('turn')
  //     image.remove();
  // }
}

function setRiver() {
  var flop_card_5 = document.getElementById("flop_5_input").value;
  if (flop_card_5) {
    if (!document.getElementById('river')) {
      var river = document.createElement("img")
      river.setAttribute("src", 'assets/cards/' + flop_card_5 + '.png')
      river.setAttribute("id", 'river')
      document.getElementById("board").appendChild(river)
    } else {
      document.getElementById("river").src = 'assets/cards/' + flop_card_5 + '.png';
    }
  }
  //else  {
  //     var image = document.getElementById('river')
  //     image.remove();
  // }
}

var cbs = document.querySelectorAll('[name="check"]');
[].forEach.call(cbs, function(cb) {
  cb.addEventListener("click", function(cb) {
    for (var i = 0; i < cbs.length; i++) {
      if (cbs[i] != cb.target) {
        cbs[i].checked = false
      }
    }
    showButton(cb.target.checked, this.id)
    howManyBets = 0
  });
});

function setBlinds(sb, bb) {

  if (sb) {
    document.getElementById('smallBlindContainer').innerHTML = sb;
    var sb = document.createElement("img")
    sb.setAttribute("src", 'assets/chips/chipone.png')
    sb.setAttribute("id", 'sb')
    document.getElementById("smallBlindContainer").appendChild(sb)

  }
  if (bb) {
    document.getElementById('bigBlindContainer').innerHTML = bb;
    var bb = document.createElement("img")
    bb.setAttribute("src", 'assets/chips/chipone.png')
    bb.setAttribute("id", 'bb')
    document.getElementById("bigBlindContainer").appendChild(bb)

  }
}

function showButton(checked, id, buttonPosition) {
  var showButton = true;
  var sb = document.getElementById('smallBlind').value
  var bb = document.getElementById('bigBlind').value

  var smallBlind = document.getElementById('smallBlindContainer')
  var bigBlind = document.getElementById('bigBlindContainer')

  var vill1Bet = document.getElementById('villain1BetSize')
  var vill2Bet = document.getElementById('villain3BetSize')
  var vill3Bet = document.getElementById('heroBetSize')
  //setBlinds(sb, bb)
  blindsPotsize()

  if (checked === true && id === 'button1') {
    var x = document.getElementById('buttonImage')
    var y = document.getElementById('rightSeat')
    x.style.visibility = 'visible';
    x.style.left = '425px';
    x.style.top = '225px';
    this.buttonPosition = 1;
    if (y.style.visibility != 'hidden') {
      clearBets()
      villainBet2(sb, showButton)
      heroBet(bb, showButton)
      insertValues()
      document.getElementById('rightSeatStack').innerHTML = Number(document.getElementById('rightSeatStack').innerHTML) - Number(sb)
      document.getElementById('bottomSeatStack').innerHTML = Number(document.getElementById('bottomSeatStack').innerHTML) - Number(bb)
    } else {
      clearBets()
      villainBet1(sb, showButton)
      heroBet(bb, showButton)
      insertValues()
      document.getElementById('leftSeatStack').innerHTML = Number(document.getElementById('leftSeatStack').innerHTML) - Number(sb)
      document.getElementById('bottomSeatStack').innerHTML = Number(document.getElementById('bottomSeatStack').innerHTML) - Number(bb)
      howManyBets = 0
    }

  }
  if (checked === true && id === 'button2') {
    var x = document.getElementById('buttonImage');
    var y = document.getElementById('leftSeat')
    x.style.visibility = 'visible';
    x.style.left = '725px';
    x.style.top = '225px';
    this.buttonPosition = 2;
    if (y.style.visibility != 'hidden') {
      clearBets()
      heroBet(sb, showButton)
      villainBet1(bb, showButton)
      insertValues()
      document.getElementById('bottomSeatStack').innerHTML = Number(document.getElementById('bottomSeatStack').innerHTML) - Number(sb)
      document.getElementById('leftSeatStack').innerHTML = Number(document.getElementById('leftSeatStack').innerHTML) - Number(bb)
      howManyBets = 0
    } else {
      clearBets()
      heroBet(bb, showButton)
      villainBet2(sb, showButton)
      insertValues()
      document.getElementById('rightSeatStack').innerHTML = Number(document.getElementById('rightSeatStack').innerHTML) - Number(sb)
      document.getElementById('bottomSeatStack').innerHTML = Number(document.getElementById('bottomSeatStack').innerHTML) - Number(bb)
      howManyBets = 0
    }
  }
  if (checked === true && id === 'button3') {
    var x = document.getElementById('buttonImage')
    var y = document.getElementById('leftSeat')
    var z = document.getElementById('rightSeat')
    x.style.visibility = 'visible';
    x.style.left = '700px';
    x.style.top = '525px';
    this.buttonPosition = 3;
    if (y.style.visibility != 'hidden' && z.style.visibility != 'hidden') {
      clearBets()
      villainBet1(sb, showButton)
      villainBet2(bb, showButton)
      insertValues()
      document.getElementById('leftSeatStack').innerHTML = Number(document.getElementById('leftSeatStack').innerHTML) - Number(sb)
      document.getElementById('rightSeatStack').innerHTML = Number(document.getElementById('rightSeatStack').innerHTML) - Number(bb)
      howManyBets = 0
    } else if (y.style.visibility == 'hidden' && z.style.visibility != 'hidden') {
      clearBets()
      heroBet(sb, showButton)
      villainBet2(bb, showButton)
      insertValues()
      document.getElementById('bottomSeatStack').innerHTML = Number(document.getElementById('bottomSeatStack').innerHTML) - Number(sb)
      document.getElementById('rightSeatStack').innerHTML = Number(document.getElementById('rightSeatStack').innerHTML) - Number(bb)
      howManyBets = 0
    } else if (y.style.visibility != 'hidden' && z.style.visibility == 'hidden') {
      clearBets()
      heroBet(sb, showButton)
      villainBet1(bb, showButton)
      insertValues()
      document.getElementById('bottomSeatStack').innerHTML = Number(document.getElementById('bottomSeatStack').innerHTML) - Number(sb)
      document.getElementById('leftSeatStack').innerHTML = Number(document.getElementById('leftSeatStack').innerHTML) - Number(bb)
      howManyBets = 0
    }

  }
}

var leftSeat = document.getElementById('leftSeatName')
var rightSeat = document.getElementById('rightSeatName')
leftSeat.addEventListener('blur', parseSeat)
rightSeat.addEventListener('blur', parseSeat)

function parseSeat() {
  var leftSeat = document.getElementById('leftSeatName').innerHTML
  var rightSeat = document.getElementById('rightSeatName').innerHTML
  if (leftSeat != 'Player1') {
    handInfo.player1.nickname = leftSeat
  }
  if (rightSeat != 'Player2') {
    handInfo.player2.nickname = rightSeat
  }

}

function blindsPotsize() {
  var sb = Number(document.getElementById("smallBlindContainer").innerHTML.split('<img')[0], 10)
  var bb = Number(document.getElementById("bigBlindContainer").innerHTML.split('<img')[0], 10)
  document.getElementById("totalStack").innerHTML = sb + bb
}
function potSizeTotal(bet) {
  var pot = Number(document.getElementById("totalStack").innerHTML, 10);

  document.getElementById("totalStack").innerHTML = pot + parseInt(bet)

}

function handleStreetPot(streetBet, previousBet){
  //var pot = Number(document.getElementById("street").innerHTML, 10);
    var pot = Number(document.getElementById("totalStack").innerHTML, 10);
  document.getElementById("street").innerHTML = pot;
    //pot + parseInt(streetBet) - parseInt(previousBet)
}

function clearBets() {
  var toClear = document.querySelectorAll('#chip1, #chip2, #chip3, #chip1raise, #chip2raise, #chip3raise');
  toClear.forEach(element => {
    element.style.visibility = 'hidden'
  })
  var betClear = document.querySelectorAll('#villain1BetSize, #villain2BetSize, #heroBetSize')
  betClear.forEach(bet => {
    bet.innerHTML = ''
  });
  //document.getElementById('street').innerText = '0'
  howManyBets = 0
}

function chipsHandler(howManyBets, playerChip){
  if(howManyBets === 0){
    document.getElementById(playerChip).src = "assets/chips/red-2.png"
  } else if (howManyBets === 1 ){
    document.getElementById(playerChip).src = "assets/chips/red-5.png"
  } else if (howManyBets > 1){
    document.getElementById(playerChip).src = "assets/chips/mix.png"
  }
}

function villainBet1(bet, showButton) {
  var villainBet = bet
  var previousBet = Number(document.getElementById("villain1BetSize").innerHTML);
  var previousVillainBet = Number(document.getElementById("heroBetSize").innerHTML);
  var stack = document.getElementById("leftSeatStack").innerHTML;
  var previousVillain1Bet = Number(document.getElementById("heroBetSize").innerHTML);
  var previousVillain2Bet = Number(document.getElementById("villain2BetSize").innerHTML);
  var maxBet = Math.max(previousVillain1Bet, previousVillain2Bet)
  if (villainBet && villainBet != '-') {

    if(villainBet > maxBet && !showButton){
            chipsHandler(howManyBets, 'chip1raise');
            document.getElementById("chip1raise").style.visibility = 'visible'

      howManyBets++
    } else{
      document.getElementById("chip1raise").style.visibility = 'hidden'
    }

    document.getElementById("villainBet1").style.visibility = 'visible'
    document.getElementById("chip1").style.visibility = 'visible'
    document.getElementById("villain1BetSize").innerHTML = villainBet;
    document.getElementById("leftSeatStack").innerHTML = parseInt(stack) - parseInt(villainBet) + previousBet;
    potSizeTotal(villainBet - previousBet);

    if(showButton){
      howManyBets = 0
    }
  }
}


function villainBet2(bet, showButton) {
  var villainBet = bet
  var previousBet = Number(document.getElementById("villain2BetSize").innerHTML);
  var stack = document.getElementById("rightSeatStack").innerHTML;
  var previousVillain1Bet = Number(document.getElementById("villain1BetSize").innerHTML);
  var previousVillain2Bet = Number(document.getElementById("villain2BetSize").innerHTML);
  var maxBet = Math.max(previousVillain1Bet, previousVillain2Bet)
  if (villainBet && villainBet != '-') {

    if(villainBet > maxBet && !showButton && document.getElementById("rightSeatStack")){

      chipsHandler(howManyBets, 'chip2raise');
      document.getElementById("chip2raise").style.visibility = 'visible'
      howManyBets++
    } else{
      document.getElementById("chip2raise").style.visibility = 'hidden'
    }
    document.getElementById("villainBet2").style.visibility = 'visible'
    document.getElementById("chip2").style.visibility = 'visible'
    document.getElementById("villain2BetSize").innerHTML = villainBet;
    document.getElementById("rightSeatStack").innerHTML = parseInt(stack) - parseInt(villainBet) + previousBet;
    potSizeTotal(villainBet - previousBet);

    if(showButton){
      howManyBets = 0
    }

  }
}

function heroBet(bet, showButton) {

  var heroBet = bet
  var previousBet = Number(document.getElementById("heroBetSize").innerHTML);
  var stack = document.getElementById("bottomSeatStack").innerHTML;
  var previousVillain2Bet = Number(document.getElementById("villain2BetSize").innerHTML);
  var previousVillain1Bet = Number(document.getElementById("villain1BetSize").innerHTML);
  var maxBet = Math.max(previousVillain1Bet, previousVillain2Bet)
  if (heroBet && heroBet != '-') {
    if(heroBet > maxBet && !showButton){
      chipsHandler(howManyBets, 'chip3raise');
      document.getElementById("chip3raise").style.visibility = 'visible'
      howManyBets++
    }else{
      document.getElementById("chip3raise").style.visibility = 'hidden'
    }
    document.getElementById("chip3").style.visibility = 'visible'
    document.getElementById("heroBet").style.visibility = 'visible'
    document.getElementById("heroBetSize").innerHTML = heroBet;
    document.getElementById("bottomSeatStack").innerHTML = parseInt(stack) - parseInt(heroBet) + previousBet;
    potSizeTotal(heroBet - previousBet);

    if(showButton){
      howManyBets--
    }
  }
}

function delayAction(action, func, delay, seat) {
  setTimeout(function() {
      hightlightActionBet(seat);
    func(action)
  }, delay)
}

function hightlightActionBet(seat){
    if(document.getElementById(seat.split('Oval')[0]).style.visibility !== 'hidden') {
        document.getElementById(seat).style.visibility = 'visible';
        setTimeout(function () {
            document.getElementById(seat).style.visibility = 'hidden';
        }, 800)
    }
}

function delayFold(player, func, delay) {
  setTimeout(function() {
    func(player)
  }, delay)
}

function clearFoldedCars(player) {
  document.getElementById(player).style.visibility = 'hidden'
}

function actionSeq(postflop) {
  if (!postflop) {
    var actionSequence = [villainBet1, villainBet2, heroBet]
    if (this.buttonPosition == 2) {
      actionSequence = [villainBet2, heroBet, villainBet1]
    } else if (this.buttonPosition == 3) {
      actionSequence = [heroBet, villainBet1, villainBet2]
    }
  }
  if (postflop) {
    var actionSequence = [villainBet2, heroBet, villainBet1]
    if (this.buttonPosition == 2) {
      actionSequence = [heroBet, villainBet1, villainBet2]
    } else if (this.buttonPosition == 3) {
      actionSequence = [villainBet1, villainBet2, heroBet]
    }
  }
  return actionSequence
}

function clearSmallBlind() {
  var blinds = document.querySelectorAll('#smallBlindContainer');
  blinds.forEach(function(blind) {
    blind.style.visibility = 'hidden'
  })
}
function clearBigBlind() {
  var blinds = document.querySelectorAll('#bigBlindContainer');
  blinds.forEach(function(blind) {
    blind.style.visibility = 'hidden'
  })
}

function foldDesc(obj) {
  var stack = document.getElementById(obj).innerHTML;
  document.getElementById(obj).innerHTML = 'fold'
  setTimeout(function() {
    document.getElementById(obj).innerHTML = stack
  }, 1500)

}

function checkDesc(obj) {
  var stack = document.getElementById(obj).innerHTML;
  document.getElementById(obj).innerHTML = 'check'
  setTimeout(function() {
    document.getElementById(obj).innerHTML = stack
  }, 1500)

}

var del;
var delBetween;

function setDel() {
  del = parseInt(document.getElementById('delay').value * 1000)
  delBetween = parseInt(document.getElementById('delay2').value * 1000)
}

var howManyBets = 0;

function hightlightAction(seat){
    if(document.getElementById(seat.split('Oval')[0]).style.visibility !== 'hidden') {
        document.getElementById(seat).style.visibility = 'visible';
        setTimeout(function () {
            document.getElementById(seat).style.visibility = 'hidden';
        }, 1000)
    }
}

function preflopBets() {
  var postflop = false
  var actionSequence = actionSeq(postflop);

  var inputs = document.querySelectorAll('#player1Preflop, #player2Preflop, #player3Preflop')
  var inputsLen = 0
  inputs.forEach(function(input) {
    inputsLen += input.value.length
  })
  if (inputsLen > 0) {
    if (this.buttonPosition == 1) {
      var a = document.getElementById('player1Preflop').value.split(';')
      var b = document.getElementById('player2Preflop').value.split(';')
      var c = document.getElementById('player3Preflop').value.split(';')
      var objId = {
        a: 'leftVillainCards',
        aStack: 'leftSeatStack',
        aInfo: 'leftSeatOval',
        b: 'rightVillainCards',
        bStack: 'rightSeatStack',
          bInfo: 'rightSeatOval',
        c: 'heroCards',
        cStack: 'bottomSeatStack',
          cInfo:'bottomSeatOval'
      }
    } else if (this.buttonPosition == 2) {
      var a = document.getElementById('player2Preflop').value.split(';')
      var b = document.getElementById('player3Preflop').value.split(';')
      var c = document.getElementById('player1Preflop').value.split(';')
      var objId = {
        a: 'rightVillainCards',
        aStack: 'rightSeatStack',
          aInfo: 'rightSeatOval',
        b: 'heroCards',
        bStack: 'bottomSeatStack',
          bInfo: 'bottomSeatOval',
        c: 'leftVillainCards',
        cStack: 'leftSeatStack',
          cInfo: 'leftSeatOval'
      }
    } else if (this.buttonPosition == 3) {
      var a = document.getElementById('player3Preflop').value.split(';')
      var b = document.getElementById('player1Preflop').value.split(';')
      var c = document.getElementById('player2Preflop').value.split(';')
      var objId = {
        a: 'heroCards',
        aStack: 'bottomSeatStack',
          aInfo: 'bottomSeatOval',
        b: 'leftVillainCards',
        bStack: 'leftSeatStack',
          bInfo: 'leftSeatOval',
        c: 'rightVillainCards',
        cStack: 'rightSeatStack',
          cInfo: 'rightSeatOval'
      }
    }

    var folded = [false, false, false]
    var max = Math.max(a.length, b.length, c.length)

    for (var i = 0; i < max; i++) {

      if (a[i] == '-') {
        folded[0] = true
        setTimeout(function() {
            hightlightAction(objId.aInfo)
            foldDesc(objId.aStack)
        }, del)
        delayFold(objId.a, clearFoldedCars, del)
      }
      if (a[i] == 'x') {
        setTimeout(function() {
          hightlightAction(objId.aInfo)
          checkDesc(objId.aStack)
        }, del)
      }
      if (i < a.length && !folded[0] && a[i] != 'x') {
           delayAction(a[i], actionSequence[0], del, objId.aInfo)
      }
      del += delBetween
      if (b[i] == '-') {
        folded[1] = true;
        setTimeout(function() {
            hightlightAction(objId.bInfo)
          foldDesc(objId.bStack),
          clearSmallBlind()
        }, del)
        delayFold(objId.b, clearFoldedCars, del)
      }
      if (b[i] == 'x') {
        setTimeout(function() {
            hightlightAction(objId.bInfo)
          checkDesc(objId.bStack)
        }, del)
      }
      if (i < b.length && !folded[1] && b[i] != 'x') {

        delayAction(b[i], actionSequence[1], del, objId.bInfo)
        setTimeout(function() {
          clearSmallBlind()
        }, del)
      }
      del += delBetween
      if (c[i] == '-') {
        folded[2] = true;
        setTimeout(function() {
            hightlightAction(objId.cInfo)
          foldDesc(objId.cStack)
        }, del)
        delayFold(objId.c, clearFoldedCars, del)
      }
      if (c[i] == 'x') {
        setTimeout(function() {
            hightlightAction(objId.cInfo)
          checkDesc(objId.cStack)
        }, del)
      }
      if (i < c.length && !folded[2] && c[i] != 'x') {
        delayAction(c[i], actionSequence[2], del, objId.cInfo);
        // delayAction(b[i], actionSequence[1], del)
        setTimeout(function() {
          clearBigBlind()
        }, del)
      }
      del += delBetween

    }
  }
  setTimeout(function() {
    clearBigBlind()
    clearSmallBlind()
    clearBets()
    setFlop()
      handleStreetPot()
  }, del)

}

function flopBets() {

  var postflop = true
  var actionSequence = actionSeq(postflop)
  var inputs = document.querySelectorAll('#player1Flop, #player2Flop, #player3Flop')
  var inputsLen = 0
  inputs.forEach(function(input) {
    inputsLen += input.value.length
  })
  del += delBetween
  if (inputsLen > 0) {
    if (this.buttonPosition == 1) {
      var a = document.getElementById('player2Flop').value.split(';')
      var b = document.getElementById('player3Flop').value.split(';')
      var c = document.getElementById('player1Flop').value.split(';')
      var objId = {
        a: 'rightVillainCards',
        aStack: 'rightSeatStack',
          aInfo: 'rightSeatOval',
        b: 'heroCards',
        bStack: 'bottomSeatStack',
          bInfo: 'bottomSeatOval',
          c: 'leftVillainCards',
        cStack: 'leftSeatStack',
          cInfo: 'leftSeatOval',
      }
    } else if (this.buttonPosition == 2) {
      var a = document.getElementById('player3Flop').value.split(';')
      var b = document.getElementById('player1Flop').value.split(';')
      var c = document.getElementById('player2Flop').value.split(';')
      var objId = {
        a: 'heroCards',
        aStack: 'bottomSeatStack',
          aInfo: 'bottomSeatOval',
        b: 'leftVillainCards',
        bStack: 'leftSeatStack',
          bInfo: 'leftSeatOval',
        c: 'rightVillainCards',
        cStack: 'rightSeatStack',
          cInfo: 'rightSeatOval',
      }
    } else if (this.buttonPosition == 3) {
      var a = document.getElementById('player1Flop').value.split(';')
      var b = document.getElementById('player2Flop').value.split(';')
      var c = document.getElementById('player3Flop').value.split(';')
      var objId = {
        a: 'leftVillainCards',
        aStack: 'leftSeatStack',
          aInfo: 'leftSeatOval',
        b: 'rightVillainCards',
        bStack: 'rightSeatStack',
          bInfo: 'rightSeatOval',
        c: 'heroCards',
        cStack: 'bottomSeatStack',
          cInfo: 'bottomSeatOval',
      }
    }

    var folded = [false, false, false]

    var max = Math.max(a.length, b.length, c.length)

    for (var i = 0; i < max; i++) {

      if (a[i] == '-') {
        folded[0] = true
        setTimeout(function() {
            hightlightAction(objId.aInfo)
          foldDesc(objId.aStack)
        }, del)
        delayFold(objId.a, clearFoldedCars, del)
      }
      if (a[i] == 'x') {
        setTimeout(function() {
            hightlightAction(objId.aInfo)
          checkDesc(objId.aStack)
        }, del)
      }

      if (i < a.length && !folded[0] && a[i] != 'x') {

        delayAction(a[i], actionSequence[0], del, objId.aInfo)
      }
      del += delBetween
      if (b[i] == '-') {
        folded[1] = true;
        setTimeout(function() {
            hightlightAction(objId.bInfo);
          foldDesc(objId.bStack)
        }, del)
        delayFold(objId.b, clearFoldedCars, del)
      }
      if (b[i] == 'x') {
        setTimeout(function() {
            hightlightAction(objId.bInfo);
            checkDesc(objId.bStack)
        }, del)
      }

      if (i < b.length && !folded[1] && b[i] != 'x') {
        delayAction(b[i], actionSequence[1], del,objId.bInfo)
      }
      del += delBetween
      if (c[i] == '-') {
        folded[2] = true;
        setTimeout(function() {
            hightlightAction(objId.cInfo);
          foldDesc(objId.cStack)
        }, del)
        delayFold(objId.c, clearFoldedCars, del)

      }
      if (c[i] == 'x') {
        setTimeout(function() {
            hightlightAction(objId.cInfo);
            checkDesc(objId.cStack)
        }, del)
      }
      if (i < c.length && !folded[2] && c[i] != 'x') {
        delayAction(c[i], actionSequence[2], del, objId.cInfo)
      }
      del += delBetween

    }
  }

  setTimeout(function() {
    clearBets()
    setTurn()
      handleStreetPot()
  }, del)

}

function turnBets() {
  var postflop = true
  var actionSequence = actionSeq(postflop)
  var inputs = document.querySelectorAll('#player1Turn, #player2Turn, #player3Turn')
  var inputsLen = 0
  inputs.forEach(function(input) {
    inputsLen += input.value.length
  })

  del += delBetween
  if (inputsLen > 0) {
    if (this.buttonPosition == 1) {
      var a = document.getElementById('player2Turn').value.split(';')
      var b = document.getElementById('player3Turn').value.split(';')
      var c = document.getElementById('player1Turn').value.split(';')
      var objId = {
        a: 'rightVillainCards',
        aStack: 'rightSeatStack',
          aInfo: 'rightSeatOval',
        b: 'heroCards',
        bStack: 'bottomSeatStack',
          bInfo: 'bottomSeatOval',
          c: 'leftVillainCards',
        cStack: 'leftSeatStack',
          cInfo: 'leftSeatOval',
      }
    } else if (this.buttonPosition == 2) {
      var a = document.getElementById('player3Turn').value.split(';')
      var b = document.getElementById('player1Turn').value.split(';')
      var c = document.getElementById('player2Turn').value.split(';')
      var objId = {
        a: 'heroCards',
        aStack: 'bottomSeatStack',
          aInfo: 'bottomSeatOval',
        b: 'leftVillainCards',
        bStack: 'leftSeatStack',
          bInfo: 'leftSeatOval',
        c: 'rightVillainCards',
        cStack: 'rightSeatStack',
          cInfo: 'rightSeatOval'
      }
    } else if (this.buttonPosition == 3) {
      var a = document.getElementById('player1Turn').value.split(';')
      var b = document.getElementById('player2Turn').value.split(';')
      var c = document.getElementById('player3Turn').value.split(';')
      var objId = {
        a: 'leftVillainCards',
        aStack: 'leftSeatStack',
          aInfo: 'leftSeatOval',
        b: 'rightVillainCards',
        bStack: 'rightSeatStack',
          bInfo: 'rightSeatOval',
          c: 'heroCards',
        cStack: 'bottomSeatStack',
          cInfo: 'bottomSeatOval'
      }
    }

    var folded = [false, false, false]

    var max = Math.max(a.length, b.length, c.length)

    for (var i = 0; i < max; i++) {

      if (a[i] == '-') {
        folded[0] = true
        setTimeout(function() {
            hightlightAction(objId.aInfo);
          foldDesc(objId.aStack)
        }, del)
        delayFold(objId.a, clearFoldedCars, del)
      }
      if (a[i] == 'x') {
        setTimeout(function() {
            hightlightAction(objId.aInfo);
            checkDesc(objId.aStack)
        }, del)
      }

      if (i < a.length && !folded[0] && a[i] != 'x') {

        delayAction(a[i], actionSequence[0], del, objId.aInfo)
      }
      del += delBetween
      if (b[i] == '-') {
        folded[1] = true;
        setTimeout(function() {
            hightlightAction(objId.bInfo);
          foldDesc(objId.bStack)
        }, del)
        delayFold(objId.b, clearFoldedCars, del)
      }
      if (b[i] == 'x') {
        setTimeout(function() {
            hightlightAction(objId.bInfo);
            checkDesc(objId.bStack)
        }, del)
      }

      if (i < b.length && !folded[1] && b[i] != 'x') {
        delayAction(b[i], actionSequence[1], del, objId.bInfo)
      }
      del += delBetween
      if (c[i] == '-') {
        folded[2] = true;
        setTimeout(function() {
            hightlightAction(objId.cInfo);
          foldDesc(objId.cStack)
        }, del)
        delayFold(objId.c, clearFoldedCars, del)

      }
      if (c[i] == 'x') {
        setTimeout(function() {
            hightlightAction(objId.cInfo);
            checkDesc(objId.cStack)
        }, del)
      }
      if (i < c.length && !folded[2] && c[i] != 'x') {
        delayAction(c[i], actionSequence[2], del, objId.cInfo)
      }
      del += delBetween

    }
  }
  setTimeout(function() {

    clearBets()
    setRiver()
      handleStreetPot()
  }, del)

}

function riverBets() {
  var postflop = true
  var actionSequence = actionSeq(postflop)
  var inputs = document.querySelectorAll('#player1River, #player2River, #player3River')
  var inputsLen = 0
  inputs.forEach(function(input) {
    inputsLen += input.value.length
  })

  del += delBetween
  if (inputsLen > 0) {
    if (this.buttonPosition == 1) {
      var a = document.getElementById('player2River').value.split(';')
      var b = document.getElementById('player3River').value.split(';')
      var c = document.getElementById('player1River').value.split(';')
      var objId = {
        a: 'rightVillainCards',
        aStack: 'rightSeatStack',
          aInfo: 'rightSeatOval',
        b: 'heroCards',
        bStack: 'bottomSeatStack',
          bInfo: 'bottomSeatOval',
        c: 'leftVillainCards',
        cStack: 'leftSeatStack',
          cInfo: 'leftSeatOval',
      }
    } else if (this.buttonPosition == 2) {
      var a = document.getElementById('player3River').value.split(';')
      var b = document.getElementById('player1River').value.split(';')
      var c = document.getElementById('player2River').value.split(';')
      var objId = {
        a: 'heroCards',
        aStack: 'bottomSeatStack',
          aInfo: 'bottomSeatOval',
        b: 'leftVillainCards',
        bStack: 'leftSeatStack',
          bInfo: 'leftSeatOval',
          c: 'rightVillainCards',
        cStack: 'rightSeatStack',
        cInfo: 'rightSeatOval'
      }
    } else if (this.buttonPosition == 3) {
      var a = document.getElementById('player1River').value.split(';')
      var b = document.getElementById('player2River').value.split(';')
      var c = document.getElementById('player3River').value.split(';')
      var objId = {
        a: 'leftVillainCards',
        aStack: 'leftSeatStack',
          aInfo: 'leftSeatOval',
        b: 'rightVillainCards',
        bStack: 'rightSeatStack',
          bInfo: 'rightSeatOval',
          c: 'heroCards',
        cStack: 'bottomSeatStack',
          cInfo: 'bottomSeatOval',
      }
    }

    var folded = [false, false, false]

    var max = Math.max(a.length, b.length, c.length)

    for (var i = 0; i < max; i++) {

      if (a[i] == '-') {
        folded[0] = true
        setTimeout(function() {
            hightlightAction(objId.aInfo);
          foldDesc(objId.aStack)
        }, del)
        delayFold(objId.a, clearFoldedCars, del)
      }
      if (a[i] == 'x') {
        setTimeout(function() {
            hightlightAction(objId.aInfo);
            checkDesc(objId.aStack)
        }, del)
      }

      if (i < a.length && !folded[0] && a[i] != 'x') {

        delayAction(a[i], actionSequence[0], del, objId.aInfo)
      }
      del += delBetween
      if (b[i] == '-') {
        folded[1] = true;
        setTimeout(function() {
            hightlightAction(objId.bInfo);
          foldDesc(objId.bStack)
        }, del)
        delayFold(objId.b, clearFoldedCars, del)
      }
      if (b[i] == 'x') {
        setTimeout(function() {
            hightlightAction(objId.bInfo);
            checkDesc(objId.bStack)
        }, del)
      }

      if (i < b.length && !folded[1] && b[i] != 'x') {
        delayAction(b[i], actionSequence[1], del, objId.bInfo)
      }
      del += delBetween
      if (c[i] == '-') {
        folded[2] = true;
        setTimeout(function() {
            hightlightAction(objId.cInfo);
          foldDesc(objId.cStack)
        }, del)
        delayFold(objId.c, clearFoldedCars, del)

      }
      if (c[i] == 'x') {
        setTimeout(function() {
            hightlightAction(objId.cInfo);
            checkDesc(objId.cStack)
        }, del)
      }
      if (i < c.length && !folded[2] && c[i] != 'x') {
        delayAction(c[i], actionSequence[2], del, objId.cInfo)
      }
      del += delBetween

    }
  }
  setTimeout(function() {
    clearBets()
      handleStreetPot()
  }, del)

}

function restartHand() {
    document.getElementById('street').innerHTML = '0';
  if (document.getElementById('leftSeat').style.visibility != 'hidden') {
    var x = document.getElementById('leftVillainCards');
    if (x.style.visibility === 'hidden') {
      x.style.visibility = 'visible';
    }
  }
  if (document.getElementById('rightSeat').style.visibility != 'hidden') {
    var x = document.getElementById('rightVillainCards');
    if (x.style.visibility === 'hidden') {
      x.style.visibility = 'visible';
    }
  }
  var x = document.getElementById('heroCards');
  if (x.style.visibility === 'hidden') {
    x.style.visibility = 'visible';
  }
  var board = document.getElementById('board')
  board.style.visibility = 'hidden'
  var images = ['flop_1', 'flop_2', 'flop_3']
  for (var i = 0; i < images.length; i++) {

    document.getElementById(images[i]).src = ''
  }

  insertValues()
  var cbs2 = document.querySelectorAll('[name="check"]')
  for (var i = 0; i < cbs2.length; i++) {
    if (cbs2[i].checked) {
      var id = cbs2[i].id
      showButton(true, id, buttonPosition)
    }
  }
  if (document.getElementById('turn')) {
    document.getElementById("turn").remove();
  }
  if (document.getElementById('river')) {
    document.getElementById("river").remove();
  }

}

function resetIntervals() {
  var max = setTimeout(function() {/* Empty function */
  }, 1);
  for (var i = 1; i <= max; i++) {
    window.clearInterval(i);
    window.clearTimeout(i);
    if (window.mozCancelAnimationFrame) 
      window.mozCancelAnimationFrame(i); // Firefox
    }
  restartHand()
}
function generate() {
  setDel()
  preflopBets()
  flopBets()
  turnBets()
  riverBets()
  setTimeout(function() {
    restartHand()
  }, del + 10000)
}

// flopBets()
// turnBets()
// riverBets()

let hhTemplate = `PokerStars Hand #196297268516: Tournament #2521792044, $28.20+$1.80 USD Hold'em No Limit - Level I ([INPUT_BLINDS]) - 2019/01/27 14:01:37 ET <br>
Table '2521792044 1' 3-max Seat #1 is the button <br>
Seat 1: Player1 ([INPUT_STACK] in chips) <br>
Seat 2: Player2 ([INPUT_STACK] in chips) <br>
Seat 3: Player3 ([INPUT_STACK] in chips) <br>
[INPUT_PLAYER]: posts small blind 10 <br>
[INPUT_PLAYER]: posts big blind 20 <br>
*** HOLE CARDS *** <br>
Dealt to [INPUT_PLAYER] [INPUT_CARDS] <br>
[INPUT_PLAYER]: raises [INPUT_SMALLBLIND] to [INPUT_RAISE] <br>
[INPUT_PLAYER]: calls 30 <br>
[INPUT_PLAYER]: folds <br>
*** FLOP *** [INPUT_FLOP] <br>
[INPUT_PLAYER]: checks <br>
[INPUT_PLAYER]: checks <br>
[INPUT_PLAYER]: checks <br>
*** TURN *** [INPUT_FLOP] [INPUT_TURN] <br>
[INPUT_PLAYER]: checks <br>
[INPUT_PLAYER]: checks <br>
[INPUT_PLAYER]: checks <br>
*** RIVER *** [INPUT_FLOP_TURN] [INPUT_RIVER] <br>
[INPUT_PLAYER]: checks <br>
[INPUT_PLAYER]: checks <br>
[INPUT_PLAYER]: checks <br>`

function insertHHs(handInfo) {
  var rawHH = hhTemplate.split('<br>')

  rawHH[2] = rawHH[2].replace('[INPUT_STACK]', this.handInfo.player1.stack)
  rawHH[3] = rawHH[3].replace('[INPUT_STACK]', this.handInfo.player2.stack)
  rawHH[4] = rawHH[4].replace('[INPUT_STACK]', this.handInfo.hero.stack)
  rawHH[8] = rawHH[8].replace('[INPUT_PLAYER]', 'Hero').replace('[INPUT_CARDS]', this.handInfo.hero.cards)
  document.getElementById("hhsOutput").innerHTML = rawHH;
}
