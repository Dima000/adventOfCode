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
interface Side {
    key: string;
    counterKey: string;
    connection: Connection;
}

type Connection = Puzzle | null | 'BORDER';

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

    static getSide(key, connection: Connection): Side {
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
        const rotationAngle = ((matchDirIndex - puzzleDirIndex + 4) % 4) * 90;

        let lines: string[][] = match.lines.map(line => line.split(''));
        if (flip) {
            lines = Puzzle.flipMatrix(lines, puzzleDir === 'L' || puzzleDir === 'R');
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

    static flipMatrix(matrix: string[][], vertical: boolean): string[][] {
        return vertical
            ? matrix.reverse()
            : matrix.map(row => [...row].reverse());
    }

    static oppositeDir(dir: Dir): Dir {
        const oppositeIndex = (Puzzle.DIRECTIONS.indexOf(dir) + 2) % 4;
        return Puzzle.DIRECTIONS[oppositeIndex];
    }
}

function connectPuzzlePiece(puzzle: Puzzle, puzzleMap: Map<number, Puzzle>) {
    if (puzzle.checked) {
        return;
    }
    puzzle.checked = true;
    console.log();
    console.log('start', puzzle.id);

    Puzzle.DIRECTIONS
        .filter(dir => puzzle[dir].connection === null)
        .forEach(dir => {
            if (puzzle.id === 4) {
                debugger;
            }

            const matchObj = findMatch(puzzle, puzzleMap, dir);
            if (matchObj) {
                const oppositeDir = Puzzle.oppositeDir(dir);
                const newMatch = Puzzle.rotatePuzzle(oppositeDir, matchObj);
                puzzle[dir].connection = newMatch;
                newMatch[oppositeDir].connection = puzzle;
                puzzleMap.set(newMatch.id, newMatch);
                console.log('assign', newMatch.id, 'dir', dir);
            } else {
                puzzle[dir].connection = 'BORDER';
                console.log('assign BORDER dir', dir);
            }
        });

    Puzzle.DIRECTIONS
        .filter(dir => puzzle[dir].connection && puzzle[dir].connection !== 'BORDER')
        .forEach(dir => {
            connectPuzzlePiece(puzzle[dir].connection as Puzzle, puzzleMap);
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

function printPuzzle(puzzle: Puzzle) {
    const matrix = new GraphMatrix();
    const visited = new Set<number>();

    collectPuzzle(0, 0, puzzle, matrix, visited);
    matrix.print();
}

function collectPuzzle(x: number, y: number, puzzle: Puzzle | 'BORDER', matrix: typeof GraphMatrix, visited: Set<number>) {
    if (puzzle === 'BORDER') {
        matrix.set(x, y, '.');
        return;
    }

    if (visited.has(puzzle.id)) {
        return;
    }

    debugger;
    matrix.set(x, y, puzzle.id);
    visited.add(puzzle.id);
    collectPuzzle(x, y - 1, puzzle.T.connection, matrix, visited);
    collectPuzzle(x, y + 1, puzzle.B.connection, matrix, visited);
    collectPuzzle(x + 1, y, puzzle.R.connection, matrix, visited);
    collectPuzzle(x - 1, y, puzzle.L.connection, matrix, visited);
}

day.task1(data => {
    let firstPuzzle = null;
    const puzzleMap: Map<number, Puzzle> = data
        .split('\r\n\r\n')
        .map((pieceData, index) => {
            const lines = pieceData.split('\r\n');
            const id = index;
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

    printPuzzle(firstPuzzle);

    // return Array
    //     .from(puzzleMap.values())
    //     .filter(puzzle => {
    //         const borders = Puzzle.DIRECTIONS.reduce((acc, dir) => {
    //             return acc + (puzzle[dir].connection === 'BORDER' ? 1 : 0);
    //         }, 0)
    //
    //         return borders >= 2;
    //     })
    //     .map(p => p.id)
    // .reduce((acc, id) => acc * id, 1);
})

day.task2(data => {
    return '';
})