let isTest = false;

let path = require('path');
let Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
let _ = require('lodash');
let mathjs = require('mathjs');
let day = new Day(2020, 20, isTest);

/*
* -------------------------------------------------------------------------------------
* DAY20 PUZZLES - Solution below
* -------------------------------------------------------------------------------------
*/
interface Side {
    key: string;
    counterKey: string;
    connection: Puzzle | null;
}

type Dir = 'T' | 'R' | 'B' | 'L';

interface Match {
    flip: boolean;
    dir: Dir;
    match: Puzzle;
}

class Puzzle {
    id: number;
    lines: string[];
    checked: boolean;

    T: Side;
    R: Side;
    B: Side;
    L: Side;

    static DIRECTIONS: Dir[] = ['T', 'R', 'B', 'L'];

    constructor(id: number, lines: string[], checked?: boolean) {
        this.id = id;
        this.lines = lines;
        this.checked = !!checked;

        const { keyT, keyB, keyL, keyR } = Puzzle.generateSideKeys(lines);
        this.T = Puzzle.getSide(keyT, null);
        this.R = Puzzle.getSide(keyR, null);
        this.B = Puzzle.getSide(keyB, null);
        this.L = Puzzle.getSide(keyL, null);
    }

    get keys() {
        return [this.T.key, this.R.key, this.B.key, this.L.key];
    }

    get counterKeys() {
        return [this.T.counterKey, this.R.counterKey, this.B.counterKey, this.L.counterKey];
    }

    get data() {
        const data = [];
        for (let i = 1; i < this.lines.length - 1; i++) {
            data.push(this.lines[i].substring(1, this.lines[i].length - 1));
        }
        return data;
    }

    setLines(lines: string[]) {
        const { keyT, keyB, keyL, keyR } = Puzzle.generateSideKeys(lines);
        this.T = Puzzle.getSide(keyT, this.T.connection);
        this.R = Puzzle.getSide(keyR, this.R.connection);
        this.B = Puzzle.getSide(keyB, this.B.connection);
        this.L = Puzzle.getSide(keyL, this.L.connection);
        this.lines = lines;
    }

    static getSide(key, connection: Puzzle | null): Side {
        return {
            key,
            counterKey: key.split('').reverse().join(''),
            connection,
        }
    }

    static generateSideKeys(lines: string[]) {
        const lineLength = lines[0].length - 1;
        const keyT = lines[0];
        const keyB = lines[lines.length - 1].split('').reverse().join('');
        const keyR = lines.reduce((acc, line) => acc + line[lineLength], '');
        const keyL = lines.reduce((acc, line) => [...acc, line[0]], []).reverse().join('');

        return { keyT, keyR, keyB, keyL };
    }

    static rotatePuzzle(puzzleDir: Dir, { match, dir, flip }: Match): Puzzle {
        const puzzleDirIndex = Puzzle.DIRECTIONS.indexOf(puzzleDir);
        const matchDirIndex = Puzzle.DIRECTIONS.indexOf(dir);
        const rotationAngle = ((matchDirIndex - puzzleDirIndex + 2 + 4) % 4) * 90;

        let lines: string[][] = match.lines.map(line => line.split(''));
        if (flip) {
            lines = Puzzle.flipMatrix(lines);
        }
        if (rotationAngle === 90) {
            lines = Puzzle.rotate90(lines);
        }
        if (rotationAngle === 180) {
            lines = Puzzle.rotate90(lines);
            lines = Puzzle.rotate90(lines);
        }
        if (rotationAngle === 270) {
            lines = Puzzle.rotate90(lines);
            lines = Puzzle.rotate90(lines);
            lines = Puzzle.rotate90(lines);
        }

        const stringLines = lines.map(line => line.join(''));
        match.setLines(stringLines);
        return match;
    }

    static rotate90(matrix: string[][]): string[][] {
        const cloneMatrix = matrix.map(row => [...row]);
        const reversed = cloneMatrix.map(row => row.reverse());
        return mathjs.transpose(reversed);
    }

    static flipMatrix(matrix: string[][]): string[][] {
        return matrix.map(row => [...row].reverse());
    }

    static oppositeDir(dir: Dir): string {
        const oppositeIndex = (Puzzle.DIRECTIONS.indexOf(dir) + 2) % 4;
        return Puzzle.DIRECTIONS[oppositeIndex];
    }
}

function connectPuzzlePiece(puzzle: Puzzle, puzzleMap: Map<number, Puzzle>) {
    if (puzzle.checked) {
        return;
    }
    puzzle.checked = true;

    Puzzle.DIRECTIONS.forEach(dir => {
        if (!puzzle[dir].connection) {
            const matchObj = findMatch(puzzle, puzzleMap, dir);
            if (matchObj) {
                const newMatch = Puzzle.rotatePuzzle(dir, matchObj);
                puzzle[dir].connection = newMatch;
                const matchDir = Puzzle.oppositeDir(dir);
                newMatch[matchDir].connection = puzzle;
                puzzleMap.set(newMatch.id, newMatch);
            }
        }
    });

    Puzzle.DIRECTIONS.forEach(dir => {
        if (puzzle[dir].connection) {
            connectPuzzlePiece(puzzle[dir].connection, puzzleMap);
        }
    })
}

function findMatch(puzzle: Puzzle, allPuzzles: Map<number, Puzzle>, dir: Dir): Match | null {
    for (let match of Array.from(allPuzzles.values())) {
        if (match.id === puzzle.id) {
            continue;
        }

        const index = match.counterKeys.indexOf(puzzle[dir].key);
        if (index !== -1) {
            return {
                flip: false,
                dir: Puzzle.DIRECTIONS[index],
                match,
            }
        }

        const flipIndex = match.keys.indexOf(puzzle[dir].key);
        if (flipIndex !== -1) {
            return {
                flip: true,
                dir: Puzzle.DIRECTIONS[flipIndex],
                match,
            }
        }
    }
}

day.task1(data => {
    let firstPuzzle = null;
    const puzzleMap: Map<number, Puzzle> = data
        .split('\r\n\r\n')
        .map(pieceData => {
            const lines = pieceData.split('\r\n');
            const id = parseInt(lines[0].match(/\d+/));
            lines.shift();
            const puzzle = new Puzzle(id, lines);
            firstPuzzle = firstPuzzle || puzzle;
            return puzzle;
        })
        .reduce((acc, puzzle) => {
            acc.set(puzzle.id, puzzle);
            return acc;
        }, new Map());

    connectPuzzlePiece(firstPuzzle, puzzleMap);
    return Array
        .from(puzzleMap.values())
        .filter(puzzle => {
            const connections = Puzzle.DIRECTIONS.reduce((acc, dir) => {
                return acc + (puzzle[dir].connection ? 1 : 0);
            }, 0)

            return connections === 2;
        })
        .map(p => p.id)
        .reduce((acc, id) => acc * id, 1);
})

day.task2(data => {
    return '';
})