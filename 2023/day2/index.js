const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------

function task1(data) {
    const games = data.split('\r\n').map(line => {
        const [idString, gameString] = line.split(':');
        const id = Number(idString.match(/\d+/));

        const rounds = gameString.split(';').map(round => {
            return round.split(',').reduce((acc, cubeStr) => {
                const [, nr, color] = cubeStr.trim().match(/(\d+) (green|red|blue)/);
                acc[color] = Number(nr);
                return acc;
            }, {});
        });

        return {
            id,
            rounds,
        }
    })

    let power = 0;
    games.forEach(game => {
        let redMax = 0;
        let greenMax = 0;
        let blueMax = 0;

        game.rounds.forEach(round => {
            redMax = Math.max(redMax, round.red || 0);
            greenMax = Math.max(greenMax, round.green || 0);
            blueMax = Math.max(blueMax, round.blue || 0);

        });

        power += redMax * greenMax * blueMax;
    });

    return power;
}

function task2(data) {
    return '';
}

new DayNew(2023, 2, task1, task2);
