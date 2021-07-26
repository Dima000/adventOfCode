let isTest = true;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let general = require(path.join(__dirname, '..', '..', 'helpers', 'general'));
let _ = require('lodash');
let day = new Day(2020, 20, isTest);

/*
* -------------------------------------------------------------------------------------
* DAY20 PUZZLES - Solution below
* -------------------------------------------------------------------------------------
*/


class PuzzlePiece {
    id;
    image;

    top = null;
    bottom = null;
    left = null;
    right = null;

    constructor(data) {
        const lines = data.split('\r\n');
        this.id = parseInt(lines[0].match(/\d+/));

        this.image = [];
        for (let i = 1; i < lines.length; i++) {
            this.image.push(lines[i])
        }
    }

    get borderTop() {
        return this.image[0];
    }

    get borderRight() {
        return this.image
            .map(line => line[line.length - 1])
            .join('');
    }

    get borderBottom() {
        return this.image[this.image.length - 1];
    }

    get borderLeft() {
        return this.image
            .map(line => line[0])
            .join('');
    }
}


day.task1(data => {
    const puzzles = data
        .split('\r\n\r\n')
        .map(pieceData => new PuzzlePiece(pieceData));

    return '';
})

day.task2(data => {
    return '';
})

/*
1) DONE - Read data and add it in structures Puzzle piece
2) Write alg to take one piece and try to find all 4 corners of it
3) write function to compare 2 pieces and see if they match
4) write function to flip/rotate piece after matched is found
5) link pieces between themselves, save found pieces in a map

 */