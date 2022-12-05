const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------


const moveToValueMap = {
    'Rock': 1,
    'Paper': 2,
    'Scissor': 3
}

const inputToMoveMap = {
    A: 'Rock',
    B: 'Paper',
    C: 'Scissor',
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissor',
}

function gameScore(you, me) {
    if (you === 'Rock') {
        if (me === 'Rock') {
            return 3;
        }
        if (me === 'Paper') {
            return 6;
        }
        return 0;
    }
    if (you === 'Paper') {
        if (me === 'Rock') {
            return 0;
        }
        if (me === 'Paper') {
            return 3;
        }
        return 6;
    }
    if (you === 'Scissor') {
        if (me === 'Rock') {
            return 6;
        }
        if (me === 'Paper') {
            return 0;
        }
        return 3;
    }
}

//X - lose
//Y - draw
//Z - win
function findMove(opponent, result) {
    if (opponent === 'Rock') {
        if (result === 'X') {
            return 'Scissor';
        }
        if (result === 'Y') {
            return 'Rock';
        }
        return 'Paper';
    }
    if (opponent === 'Paper') {
        if (result === 'X') {
            return 'Rock';
        }
        if (result === 'Y') {
            return 'Paper';
        }
        return 'Scissor';
    }
    if (opponent === 'Scissor') {
        if (result === 'X') {
            return 'Paper';
        }
        if (result === 'Y') {
            return 'Scissor';
        }
        return 'Rock';
    }
}

function task1(data) {
    const rounds = data.split('\r\n').map(s => s.split(' '));

    const scores = rounds.map(([you, me]) => {
        const score = gameScore(inputToMoveMap[you], inputToMoveMap[me]);
        return score + moveToValueMap[inputToMoveMap[me]];
    });
    return scores.reduce((sum, i) => sum + i, 0);
}

function task2(data) {
    const rounds = data.split('\r\n').map(s => s.split(' '));

    const scores = rounds.map(([opponent, result]) => {
        const me = findMove(inputToMoveMap[opponent], result);
        const score = gameScore(inputToMoveMap[opponent], me);
        return score + moveToValueMap[me];
    });
    return scores.reduce((sum, i) => sum + i, 0);
}

new DayNew(2022, 2, task1, task2);
