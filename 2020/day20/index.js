let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');
let day = new Day(2020, 20, isTest);

/*
* -------------------------------------------------------------------------------------
* DAY20 PUZZLES - Solution below
* -------------------------------------------------------------------------------------
*/


class PuzzlePiece {
    id;
    tPiece = null;
    bPiece = null;
    lPiece = null;
    rPiece = null;

    constructor(data) {
        const lines = data.split('\r\n');
        this.id = parseInt(lines[0].match(/\d+/));
        lines.shift();

        this.t = lines[0];
        this.b = lines[lines.length - 1];
        this.l = this.getVerticalLine(lines, 0);
        this.r = this.getVerticalLine(lines, lines[0].length - 1);
        this.ft = this.reverseString(this.t);
        this.fb = this.reverseString(this.b);
        this.fl = this.reverseString(this.l);
        this.fr = this.reverseString(this.r);
    }

    get vertices() {
        return [this.t, this.b, this.l, this.r, this.ft, this.fb, this.fl, this.fr];
    }

    getVerticalLine(lines, index) {
        let s = '';
        for (const line of lines) {
            s += line[index];
        }
        return s;
    }

    reverseString(s) {
        return s.split('').reverse().join('');
    }

    setMatch({ t, b, r, l }) {
        this.tPiece = this.tPiece || t;
        this.bPiece = this.bPiece || b;
        this.lPiece = this.lPiece || l;
        this.rPiece = this.rPiece || r;
    }

    getMatchedCount() {
        return [this.tPiece, this.bPiece, this.lPiece, this.rPiece]
            .filter(matched => matched)
            .length;
    }
}


day.task1(data => {
    const puzzles = data
        .split('\r\n\r\n')
        .map(pieceData => new PuzzlePiece(pieceData));

    matchPuzzles(puzzles);

    const corners = puzzles.filter(p => p.getMatchedCount() === 2);
    return corners.reduce((acc, piece) => acc * piece.id, 1);
})

day.task2(data => {
    return '';
})

/**
 * Iterate all puzzle pieces and assign match to the 4 vertices
 */
function matchPuzzles(puzzlePieces) {
    for (let i = 0; i < puzzlePieces.length; i++) {
        const piece = puzzlePieces[i];

        for (let k = 0; k < puzzlePieces.length; k++) {
            if (i === k) {
                continue;
            }

            const match = findMatch(piece, puzzlePieces[k]);
            piece.setMatch(match);
        }
    }
}


function findMatch(piece, matchPiece) {
    let directions = matchPiece.vertices;

    const t = directions.includes(piece.t);
    const b = directions.includes(piece.b);
    const l = directions.includes(piece.l);
    const r = directions.includes(piece.r);

    return {
        t: t ? matchPiece.id : null,
        b: b ? matchPiece.id : null,
        l: l ? matchPiece.id : null,
        r: r ? matchPiece.id : null,
    }
}