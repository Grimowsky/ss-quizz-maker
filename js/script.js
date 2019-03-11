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
    } else {
        var image = document.getElementById('turn')
        image.remove();
    }
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
    } else {
        var image = document.getElementById('river')
        image.remove();
    }
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
    });
});

function setBlinds() {
    smallBlind = document.getElementById('smallBlind').value
    bigBlind = document.getElementById('bigBlind').value

    if (smallBlind) {
        document.getElementById('smallBlindContainer').innerHTML = smallBlind;
        var sb = document.createElement("img")
        sb.setAttribute("src", 'assets/chips/chipone.png')
        sb.setAttribute("id", 'sb')
        document.getElementById("smallBlindContainer").appendChild(sb)
    }
    if (bigBlind) {
        document.getElementById('bigBlindContainer').innerHTML = bigBlind;
        var bb = document.createElement("img")
        bb.setAttribute("src", 'assets/chips/chipone.png')
        bb.setAttribute("id", 'bb')
        document.getElementById("bigBlindContainer").appendChild(bb)
    }
}

function showButton(checked, id, buttonPosition) {
    var smallBlind = document.getElementById('smallBlindContainer')
    var bigBlind = document.getElementById('bigBlindContainer')
    setBlinds()
    blindsPotsize()

    if (checked === true && id === 'button1') {
        var x = document.getElementById('buttonImage')
        x.style.visibility = 'visible';
        x.style.left = '425px';
        x.style.top = '225px';
        this.buttonPosition = 1;
        smallBlind.style.cssText = "left: 775px; top: 265px; visibility: visible"
        bigBlind.style.cssText = "left: 625px; top: 500px; visibility: visible "

    }
    if (checked === true && id === 'button2') {
        var x = document.getElementById('buttonImage');
        x.style.visibility = 'visible';
        x.style.left = '725px';
        x.style.top = '225px';
        this.buttonPosition = 2;
        smallBlind.style.left = '755px';
        smallBlind.style.cssText = "left: 625px; top: 500px; visibility: visible "
        bigBlind.style.cssText = "left: 375px; top: 265px; visibility: visible "
    }
    if (checked === true && id === 'button3') {
        var x = document.getElementById('buttonImage')
        x.style.visibility = 'visible';
        x.style.left = '700px';
        x.style.top = '525px';
        this.buttonPosition = 3;
        smallBlind.style.left = '755px';
        smallBlind.style.cssText = "left: 375px; top: 265px; visibility: visible "
        bigBlind.style.cssText = "left: 775px; top: 265px; visibility: visible"

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

function clearBets() {
    var toClear = document.querySelectorAll('#chip1, #chip2, #chip3')
    toClear.forEach(element => {
        element.style.visibility = 'hidden'
    })
    var betClear = document.querySelectorAll('#villain1BetSize, #villain2BetSize, #heroBetSize')
    betClear.forEach(bet => {
        bet.innerHTML = ''
    })

}

function villainBet1(bet) {

    var villainBet = bet
    var stack = document.getElementById("leftSeatStack").innerHTML;
    var pot = document.getElementById("leftSeatStack").innerHTML;
    if (villainBet) {
        document.getElementById("villainBet1").style.visibility = 'visible'
        document.getElementById("chip1").style.visibility = 'visible'
        document.getElementById("villain1BetSize").innerHTML = villainBet;
        document.getElementById("leftSeatStack").innerHTML = parseInt(stack) - parseInt(villainBet);
    }
    potSizeTotal(villainBet)
}

function villainBet2(bet) {
    var villainBet = bet
    var stack = document.getElementById("rightSeatStack").innerHTML;
    if (villainBet) {

        document.getElementById("villainBet2").style.visibility = 'visible'
        document.getElementById("chip2").style.visibility = 'visible'
        document.getElementById("villain2BetSize").innerHTML = villainBet;
        document.getElementById("rightSeatStack").innerHTML = parseInt(stack) - parseInt(villainBet);
        potSizeTotal(villainBet)
    }
}

function heroBet(bet) {
    var heroBet = bet
    var stack = document.getElementById("bottomSeatStack").innerHTML;
    if (heroBet) {
        document.getElementById("chip3").style.visibility = 'visible'
        document.getElementById("heroBet").style.visibility = 'visible'
        document.getElementById("heroBetSize").innerHTML = heroBet;
        document.getElementById("bottomSeatStack").innerHTML = parseInt(stack) - parseInt(heroBet);
        potSizeTotal(heroBet)
    }
}

function delayAction(action, func, delay) {
    setTimeout(function() {
        func(action)
    }, delay)
}

function delayFold(player, func, delay) {
    setTimeout(function() {
        func(player)
    }, delay)
}

function clearFoldedCars(player) {
    document.getElementById(player).style.visibility = 'hidden'
}

function actionSeq() {
    var actionSequence = [villainBet1, villainBet2, heroBet]
    if (this.buttonPosition == 2) {
        actionSequence = [villainBet2, heroBet, villainBet1]
    } else if (this.buttonPosition == 3) {
        actionSequence = [heroBet, villainBet1, villainBet2]
    }

    return actionSequence
}

var del = 2000;

function preflopBets() {
    var actionSequence = actionSeq()

    if (this.buttonPosition == 1) {
        var a = document.getElementById('player1Preflop').value.split(';')
        var b = document.getElementById('player2Preflop').value.split(';')
        var c = document.getElementById('player3Preflop').value.split(';')
        var objId = {
            a: 'leftVillainCards',
            b: 'rightVillainCards',
            c: 'heroCards'
        }
    } else if (this.buttonPosition == 2) {
        var a = document.getElementById('player2Preflop').value.split(';')
        var b = document.getElementById('player3Preflop').value.split(';')
        var c = document.getElementById('player1Preflop').value.split(';')
        var objId = {
            a: 'rightVillainCards',
            b: 'heroCards',
            c: 'leftVillainCards'
        }
    } else if (this.buttonPosition == 3) {
        var a = document.getElementById('player3Preflop').value.split(';')
        var b = document.getElementById('player1Preflop').value.split(';')
        var c = document.getElementById('player2Preflop').value.split(';')
        var objId = {
            a: 'heroCards',
            b: 'leftVillainCards',
            c: 'rightVillainCards'
        }
    }

    var folded = [false, false, false]
    var max = Math.max(a.length, b.length, c.length)

    for (var i = 0; i < max; i++) {

        if (a[i] == '-') {
            folded[0] = true
            delayFold(objId.a, clearFoldedCars, del)
        }
        if (i < a.length && !folded[0]) {
            delayAction(a[i], actionSequence[0], del)
        }
        del += 2000
        if (b[i] == '-') {
            folded[1] = true;
            delayFold(objId.b, clearFoldedCars, del)

        }
        if (i < b.length && !folded[1]) {
            delayAction(b[i], actionSequence[1], del)
        }
        del += 2000
        if (c[i] == '-') {
            folded[2] = true;
            delayFold(objId.c, clearFoldedCars, del)

        }
        if (i < c.length && !folded[2]) {
            delayAction(c[i], actionSequence[2], del)
        }
        del += 2000

    }
    setTimeout(function() {
        clearBets()
        setFlop()
    }, del)

}

function flopBets() {
    var actionSequence = actionSeq()
    del += 2000
    if (this.buttonPosition == 1) {
        var a = document.getElementById('player1Flop').value.split(';')
        var b = document.getElementById('player2Flop').value.split(';')
        var c = document.getElementById('player3Flop').value.split(';')
        var objId = {
            a: 'leftVillainCards',
            b: 'rightVillainCards',
            c: 'heroCards'
        }
    } else if (this.buttonPosition == 2) {
        var a = document.getElementById('player2Flop').value.split(';')
        var b = document.getElementById('player3Flop').value.split(';')
        var c = document.getElementById('player1Flop').value.split(';')
        var objId = {
            a: 'rightVillainCards',
            b: 'heroCards',
            c: 'leftVillainCards'
        }
    } else if (this.buttonPosition == 3) {
        var a = document.getElementById('player3Flop').value.split(';')
        var b = document.getElementById('player1Flop').value.split(';')
        var c = document.getElementById('player2Flop').value.split(';')
        var objId = {
            a: 'heroCards',
            b: 'leftVillainCards',
            c: 'rightVillainCards'
        }
    }

    var folded = [false, false, false]

    var max = Math.max(a.length, b.length, c.length)

    for (var i = 0; i < max; i++) {

        if (a[i] == '-') {
            folded[0] = true
            delayFold(objId.a, clearFoldedCars, del)
        }
        if (i < a.length && !folded[0]) {
            delayAction(a[i], actionSequence[0], del)
        }
        del += 2000
        if (b[i] == '-') {
            folded[1] = true;
            delayFold(objId.b, clearFoldedCars, del)

        }
        if (i < b.length && !folded[1]) {
            delayAction(b[i], actionSequence[1], del)
        }
        del += 2000
        if (c[i] == '-') {
            folded[2] = true;
            delayFold(objId.c, clearFoldedCars, del)

        }
        if (i < c.length && !folded[2]) {
            delayAction(c[i], actionSequence[2], del)
        }
        del += 2000

    }
    setTimeout(function() {
        clearBets()
        setTurn()
    }, del)

}

function turnBets() {
    var actionSequence = actionSeq()
    del += 2000
    if (this.buttonPosition == 1) {
        var a = document.getElementById('player1Turn').value.split(';')
        var b = document.getElementById('player2Turn').value.split(';')
        var c = document.getElementById('player3Turn').value.split(';')
        var objId = {
            a: 'leftVillainCards',
            b: 'rightVillainCards',
            c: 'heroCards'
        }
    } else if (this.buttonPosition == 2) {
        var a = document.getElementById('player2Turn').value.split(';')
        var b = document.getElementById('player3Turn').value.split(';')
        var c = document.getElementById('player1Turn').value.split(';')
        var objId = {
            a: 'rightVillainCards',
            b: 'heroCards',
            c: 'leftVillainCards'
        }
    } else if (this.buttonPosition == 3) {
        var a = document.getElementById('player3Turn').value.split(';')
        var b = document.getElementById('player1Turn').value.split(';')
        var c = document.getElementById('player2Turn').value.split(';')
        var objId = {
            a: 'heroCards',
            b: 'leftVillainCards',
            c: 'rightVillainCards'
        }
    }

    var folded = [false, false, false]
    var max = Math.max(a.length, b.length, c.length)

    for (var i = 0; i < max; i++) {

        if (a[i] == '-') {
            folded[0] = true
            delayFold(objId.a, clearFoldedCars, del)
        }
        if (i < a.length && !folded[0]) {
            delayAction(a[i], actionSequence[0], del)
        }
        del += 2000
        if (b[i] == '-') {
            folded[1] = true;
            delayFold(objId.b, clearFoldedCars, del)

        }
        if (i < b.length && !folded[1]) {
            delayAction(b[i], actionSequence[1], del)
        }
        del += 2000
        if (c[i] == '-') {
            folded[2] = true;
            delayFold(objId.c, clearFoldedCars, del)

        }
        if (i < c.length && !folded[2]) {
            delayAction(c[i], actionSequence[2], del)
        }
        del += 2000

    }
    setTimeout(function() {
        clearBets()
        setRiver()
    }, del)
}

function riverBets() {
    var actionSequence = actionSeq()
    del += 2000
    if (this.buttonPosition == 1) {
        var a = document.getElementById('player1River').value.split(';')
        var b = document.getElementById('player2River').value.split(';')
        var c = document.getElementById('player3River').value.split(';')
        var objId = {
            a: 'leftVillainCards',
            b: 'rightVillainCards',
            c: 'heroCards'
        }
    } else if (this.buttonPosition == 2) {
        var a = document.getElementById('player2River').value.split(';')
        var b = document.getElementById('player3River').value.split(';')
        var c = document.getElementById('player1River').value.split(';')
        var objId = {
            a: 'rightVillainCards',
            b: 'heroCards',
            c: 'leftVillainCards'
        }
    } else if (this.buttonPosition == 3) {
        var a = document.getElementById('player3River').value.split(';')
        var b = document.getElementById('player1River').value.split(';')
        var c = document.getElementById('player2River').value.split(';')
        var objId = {
            a: 'heroCards',
            b: 'leftVillainCards',
            c: 'rightVillainCards'
        }
    }

    var folded = [false, false, false]
    var max = Math.max(a.length, b.length, c.length)

    for (var i = 0; i < max; i++) {

        if (a[i] == '-') {
            folded[0] = true
            delayFold(objId.a, clearFoldedCars, del)
        }
        if (i < a.length && !folded[0]) {
            delayAction(a[i], actionSequence[0], del)
        }
        del += 2000
        if (b[i] == '-') {
            folded[1] = true;
            delayFold(objId.b, clearFoldedCars, del)

        }
        if (i < b.length && !folded[1]) {
            delayAction(b[i], actionSequence[1], del)
        }
        del += 2000
        if (c[i] == '-') {
            folded[2] = true;
            delayFold(objId.c, clearFoldedCars, del)

        }
        if (i < c.length && !folded[2]) {
            delayAction(c[i], actionSequence[2], del)
        }
        del += 2000

    }
    setTimeout(function() {
        clearBets()
    }, del)
}

function generate() {
    preflopBets()
    flopBets()
    turnBets()
    riverBets()
}

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
