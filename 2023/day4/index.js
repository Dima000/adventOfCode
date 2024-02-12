const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------

function cardPoints(card) {
    const winning = new Set(card.winning);
    const power = card.mine.filter(nr => winning.has(nr)).length;
    return power === 0 ? 0 : Math.pow(2, power - 1);
}

function winningCards(card) {
    const winning = new Set(card.winning);
    return card.mine.filter(nr => winning.has(nr)).length;
}

function task1(data) {
    const cards = data.split('\r\n').map(line => {
        const [id, winning, mine] = line.split(/[:|]/g);

        return {
            id: id.match(/\d+/)[0],
            winning: winning.match(/\d+/g).map(n => +n),
            mine: mine.match(/\d+/g).map(n => +n),
        }
    })

    return cards.reduce((sum, card) => {
        return sum + cardPoints(card);
    }, 0);
}

function task2(data) {
    const cards = data.split('\r\n').map(line => {
        const [id, winning, mine] = line.split(/[:|]/g);

        return {
            id: id.match(/\d+/)[0],
            winning: winning.match(/\d+/g).map(n => +n),
            mine: mine.match(/\d+/g).map(n => +n),
        }
    });

    let queue = {};
    cards.forEach((card, index) => {
        queue[index + 1] = 1;
    });

    let id = 1;
    while (id <= cards.length) {
        const times = queue[id];
        const card = cards[id - 1];
        const winningCount = winningCards(card);

        for (let t = 1; t <= times; t++) {
            for (let i = 1; i <= winningCount; i++) {
                queue[id + i] += 1;
            }
        }

        id += 1;
    }


    return Object.values(queue).reduce((sum, n) => sum + n, 0);
}

new DayNew(2023, 4, task1, task2);
