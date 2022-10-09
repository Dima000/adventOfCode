let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let GraphMatrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));
let _ = require('lodash');
let mathjs = require('mathjs');
let day = new Day(2020, 20, isTest);

/*
* -------------------------------------------------------------------------------------
* DAY20 PUZZLES - Solution below
* -------------------------------------------------------------------------------------
*/

type Dir = 'T' | 'R' | 'B' | 'L';

const DIRECTIONS: Dir[] = ['T', 'R', 'B', 'L'];

const OPPOSITE_DIR: Record<Dir, Dir> = {
    T: 'B',
    B: 'T',
    L: 'R',
    R: 'L',
};

const DIR_TO_KEY: Record<Dir, 'keyT' | 'keyB' | 'keyL' | 'keyR'> = {
    T: 'keyT',
    B: 'keyB',
    L: 'keyL',
    R: 'keyR',
};

const MONSTER_PATTER = [
    '..................#.',
    '#....##....##....###',
    '.#..#..#..#..#..#...',
];

class Puzzle {
    id: number;
    T?: Puzzle;
    R?: Puzzle;
    B?: Puzzle;
    L?: Puzzle;

    lines: string[];
    checked: boolean;
    width: number;
    height: number;

    keyT: string;
    keyB: string;
    keyL: string;
    keyR: string;

    constructor(id: number, lines: string[], checked?: boolean) {
        this.id = id;
        this.lines = lines;
        this.checked = !!checked;
        this.init(lines);
    }

    init(lines: string[]) {
        this.height = lines.length;
        this.width = lines[0].length;
        this.keyT = lines[0];
        this.keyB = lines[this.height - 1].split('').join('');
        this.keyR = lines.reduce((acc, line) => acc + line[this.width - 1], '');
        this.keyL = lines.reduce((acc, line) => acc + line[0], '');
    }

    rotate90CounterClockwise(): void {
        const linesArray: string[][] = this.lines.map(line => line.split(''));
        const cloneMatrix = _.cloneDeep(linesArray);
        const transposed = mathjs.transpose(cloneMatrix);
        const rotated = [...transposed].reverse();

        this.lines = rotated.map(lineArray => lineArray.join(''));
        this.init(this.lines);

        let aux = this.T;
        this.T = this.R;
        this.R = this.B;
        this.B = this.L;
        this.L = aux;
    }

    flipMatrix() {
        this.lines = this.lines.reverse();
        this.init(this.lines);

        const aux = this.T;
        this.T = this.B;
        this.B = aux;
    }
}

function puzzlesAreMatching(puzzle: Puzzle, searchPuzzle: Puzzle, dir: Dir): boolean {
    const puzzleKey = puzzle[DIR_TO_KEY[dir]];
    const searchPuzzleKey = searchPuzzle[DIR_TO_KEY[OPPOSITE_DIR[dir]]];
    return puzzleKey === searchPuzzleKey;
}

function searchFreePuzzle(puzzle: Puzzle, freePuzzle: Puzzle, dir: Dir): boolean {
    for (let i = 0; i < 4; i++) {
        if (puzzlesAreMatching(puzzle, freePuzzle, dir)) {
            return true;
        }
        freePuzzle.rotate90CounterClockwise();
    }

    freePuzzle.flipMatrix();
    for (let i = 0; i < 4; i++) {
        if (puzzlesAreMatching(puzzle, freePuzzle, dir)) {
            return true;
        }
        freePuzzle.rotate90CounterClockwise();
    }

    return false;
}

function connectPuzzle(puzzle: Puzzle, foundPuzzles: Map<number, Puzzle>, freePuzzles: Map<number, Puzzle>, dir: Dir): boolean {
    for (let foundPuzzle of Array.from(foundPuzzles.values())) {
        if (puzzle.id === foundPuzzle.id) {
            continue; // avoid comparing the same puzzle
        }
        if (puzzlesAreMatching(puzzle, foundPuzzle, dir)) {
            puzzle[dir] = foundPuzzle;
            foundPuzzle[OPPOSITE_DIR[dir]] = puzzle;
            return true; // 2 puzzles from found collection where connected
        }
    }

    for (let freePuzzle of Array.from(freePuzzles.values())) {
        if (searchFreePuzzle(puzzle, freePuzzle, dir)) {
            const newFoundPuzzle = _.cloneDeep(freePuzzle);
            foundPuzzles.set(newFoundPuzzle.id, newFoundPuzzle);

            puzzle[dir] = newFoundPuzzle;
            newFoundPuzzle[OPPOSITE_DIR[dir]] = puzzle;
            freePuzzles.delete(newFoundPuzzle.id);
            return true; // a new puzzle from free collection was connected and added to found collection
        }
    }

    return false;
}

function recursiveMatchPuzzles(puzzle: Puzzle, foundPuzzles: Map<number, Puzzle>, freePuzzles: Map<number, Puzzle>) {
    DIRECTIONS.forEach(dir => {
        if (!puzzle[dir]) {
            const connected = connectPuzzle(puzzle, foundPuzzles, freePuzzles, dir);
            if (connected) {
                recursiveMatchPuzzles(puzzle[dir], foundPuzzles, freePuzzles);
            }
        }
    });
}

function markMonstersOnMap(puzzleMatrix: string[][], monsterMatrix: string[][]): boolean {
    let foundMonsters = false;

    for (let i = 0; i < puzzleMatrix.length - 3; i += 1) {
        for (let j = 0; j < puzzleMatrix[i].length - 20; j += 1) {
            const line0 = puzzleMatrix[i].slice(j, j + 20).join('');
            const line1 = puzzleMatrix[i + 1].slice(j, j + 20).join('');
            const line2 = puzzleMatrix[i + 2].slice(j, j + 20).join('');

            const isMatch = new RegExp(MONSTER_PATTER[0]).test(line0) &&
                new RegExp(MONSTER_PATTER[1]).test(line1) &&
                new RegExp(MONSTER_PATTER[2]).test(line2);

            if (isMatch) {
                // overwrite monster matrix with monster characters in the correct position
                for (let ii = 0; ii < 3; ii++) {
                    for (let jj = 0; jj < 20; jj++) {
                        if (MONSTER_PATTER[ii][jj] === '#') {
                            monsterMatrix[ii + i][jj + j] = 'O';
                        }
                    }
                }

                foundMonsters = true;
            }
        }
    }

    return foundMonsters;
}

day.task1(data => {
    const freePuzzles: Map<number, Puzzle> = data
        .split('\r\n\r\n')
        .map((pieceData) => {
            const lines = pieceData.split('\r\n');
            const idLine = lines.shift();
            const id = +idLine.match(/\d+/);
            return new Puzzle(id, lines);
        })
        .reduce((acc, puzzle) => {
            acc.set(puzzle.id, puzzle);
            return acc;
        }, new Map());


    // CONNECT PUZZLE PIECES
    const foundPuzzles = new Map<number, Puzzle>();
    const puzzle = Array.from(freePuzzles.values())[0];
    foundPuzzles.set(puzzle.id, puzzle);
    freePuzzles.delete(puzzle.id);
    recursiveMatchPuzzles(puzzle, foundPuzzles, freePuzzles);

    // COLLECT PUZZLE PICTURE INTO A MATRIX
    const topLeftCorner = Array.from(foundPuzzles.values()).find(puzzle => !puzzle.T && !puzzle.L);

    let currentRowPuzzle = topLeftCorner;
    const puzzleMatrix = [];
    while (currentRowPuzzle) {
        let fullLinesRow: string[] = new Array(currentRowPuzzle.lines.length - 2).fill('');
        let currentLinePuzzle = currentRowPuzzle;
        while (currentLinePuzzle) {
            currentLinePuzzle.lines.slice(1, currentRowPuzzle.lines.length - 1).forEach((line, index) => {
                fullLinesRow[index] += line.substring(1, line.length - 1);
            });

            currentLinePuzzle = currentLinePuzzle.R;
        }

        puzzleMatrix.push(...fullLinesRow);
        currentRowPuzzle = currentRowPuzzle.B;
    }

    // WRITE ALGORITHMS TO SEARCH ARRAY PICTURE FOR MONSTER PATTERS
    let puzzleMatrixArray = puzzleMatrix.map(line => line.split(''));
    let monsterMatrixArray;

    for (let i = 0; i < 8; i++) {
        if (i === 4) {
            puzzleMatrixArray = puzzleMatrixArray.reverse(); //flip matrix
        }

        monsterMatrixArray = _.cloneDeep(puzzleMatrixArray);
        const foundMonsters = markMonstersOnMap(puzzleMatrixArray, monsterMatrixArray);
        if (foundMonsters) {
            break;
        }

        puzzleMatrixArray = mathjs.transpose(_.cloneDeep(puzzleMatrixArray)).reverse(); // rotate90 matrix
    }

    monsterMatrixArray.forEach(line => {
        console.log(line.join(''));
    })

    return monsterMatrixArray.reduce((sum, line) => {
        line.forEach(char => {
            if (char === '#') {
                sum += 1;
            }
        });

        return sum;
    }, 0);
})
