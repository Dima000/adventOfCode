var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var isTest = false;
var path = require('path');
var Day = require(path.join(__dirname, '..', '..', 'helpers', 'Day'));
var GraphMatrix = require(path.join(__dirname, '..', '..', 'helpers', 'GraphMatrix'));
var _ = require('lodash');
var mathjs = require('mathjs');
var day = new Day(2020, 20, isTest);
var Puzzle = /** @class */ (function () {
    function Puzzle(id, lines, checked) {
        this.id = id;
        this.lines = lines;
        this.checked = !!checked;
        var _a = Puzzle.generateSideKeys(lines), keyT = _a.keyT, keyB = _a.keyB, keyL = _a.keyL, keyR = _a.keyR;
        this.T = Puzzle.getSide(keyT, null);
        this.R = Puzzle.getSide(keyR, null);
        this.B = Puzzle.getSide(keyB, null);
        this.L = Puzzle.getSide(keyL, null);
    }
    Object.defineProperty(Puzzle.prototype, "keys", {
        get: function () {
            return [this.T.key, this.R.key, this.B.key, this.L.key];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Puzzle.prototype, "counterKeys", {
        get: function () {
            return [this.T.counterKey, this.R.counterKey, this.B.counterKey, this.L.counterKey];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Puzzle.prototype, "data", {
        get: function () {
            var data = [];
            for (var i = 1; i < this.lines.length - 1; i++) {
                data.push(this.lines[i].substring(1, this.lines[i].length - 1));
            }
            return data;
        },
        enumerable: false,
        configurable: true
    });
    Puzzle.prototype.setLines = function (lines) {
        var _a = Puzzle.generateSideKeys(lines), keyT = _a.keyT, keyB = _a.keyB, keyL = _a.keyL, keyR = _a.keyR;
        this.T = Puzzle.getSide(keyT, this.T.connection);
        this.R = Puzzle.getSide(keyR, this.R.connection);
        this.B = Puzzle.getSide(keyB, this.B.connection);
        this.L = Puzzle.getSide(keyL, this.L.connection);
        this.lines = lines;
    };
    Puzzle.getSide = function (key, connection) {
        return {
            key: key,
            counterKey: key.split('').reverse().join(''),
            connection: connection,
        };
    };
    Puzzle.generateSideKeys = function (lines) {
        var lineLength = lines[0].length - 1;
        var keyT = lines[0];
        var keyB = lines[lines.length - 1].split('').reverse().join('');
        var keyR = lines.reduce(function (acc, line) { return acc + line[lineLength]; }, '');
        var keyL = lines.reduce(function (acc, line) { return __spreadArray(__spreadArray([], acc), [line[0]]); }, []).reverse().join('');
        return { keyT: keyT, keyR: keyR, keyB: keyB, keyL: keyL };
    };
    Puzzle.rotatePuzzle = function (puzzleDir, _a) {
        var match = _a.match, dir = _a.dir, flip = _a.flip;
        var puzzleDirIndex = Puzzle.DIRECTIONS.indexOf(puzzleDir);
        var matchDirIndex = Puzzle.DIRECTIONS.indexOf(dir);
        var rotationAngle = ((matchDirIndex - puzzleDirIndex + 4) % 4) * 90;
        var lines = match.lines.map(function (line) { return line.split(''); });
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
        var stringLines = lines.map(function (line) { return line.join(''); });
        match.setLines(stringLines);
        return match;
    };
    Puzzle.rotate90 = function (matrix) {
        var cloneMatrix = matrix.map(function (row) { return __spreadArray([], row); });
        var reversed = cloneMatrix.map(function (row) { return row.reverse(); });
        return mathjs.transpose(reversed);
    };
    Puzzle.flipMatrix = function (matrix, vertical) {
        return vertical
            ? matrix.reverse()
            : matrix.map(function (row) { return __spreadArray([], row).reverse(); });
    };
    Puzzle.oppositeDir = function (dir) {
        var oppositeIndex = (Puzzle.DIRECTIONS.indexOf(dir) + 2) % 4;
        return Puzzle.DIRECTIONS[oppositeIndex];
    };
    Puzzle.DIRECTIONS = ['T', 'R', 'B', 'L'];
    return Puzzle;
}());
function connectPuzzlePiece(puzzle, puzzleMap) {
    if (puzzle.checked) {
        return;
    }
    puzzle.checked = true;
    console.log();
    console.log('start', puzzle.id);
    Puzzle.DIRECTIONS
        .filter(function (dir) { return puzzle[dir].connection === null; })
        .forEach(function (dir) {
        if (puzzle.id === 4) {
            debugger;
        }
        var matchObj = findMatch(puzzle, puzzleMap, dir);
        if (matchObj) {
            var oppositeDir = Puzzle.oppositeDir(dir);
            var newMatch = Puzzle.rotatePuzzle(oppositeDir, matchObj);
            puzzle[dir].connection = newMatch;
            newMatch[oppositeDir].connection = puzzle;
            puzzleMap.set(newMatch.id, newMatch);
            console.log('assign', newMatch.id, 'dir', dir);
        }
        else {
            puzzle[dir].connection = 'BORDER';
            console.log('assign BORDER dir', dir);
        }
    });
    Puzzle.DIRECTIONS
        .filter(function (dir) { return puzzle[dir].connection && puzzle[dir].connection !== 'BORDER'; })
        .forEach(function (dir) {
        connectPuzzlePiece(puzzle[dir].connection, puzzleMap);
    });
}
function findMatch(puzzle, allPuzzles, dir) {
    for (var _i = 0, _a = Array.from(allPuzzles.values()); _i < _a.length; _i++) {
        var match = _a[_i];
        if (match.id === puzzle.id) {
            continue;
        }
        var index = match.counterKeys.indexOf(puzzle[dir].key);
        if (index !== -1) {
            return {
                flip: false,
                dir: Puzzle.DIRECTIONS[index],
                match: match,
            };
        }
        var flipIndex = match.keys.indexOf(puzzle[dir].key);
        if (flipIndex !== -1) {
            return {
                flip: true,
                dir: Puzzle.DIRECTIONS[flipIndex],
                match: match,
            };
        }
    }
}
function printPuzzle(puzzle) {
    var matrix = new GraphMatrix();
    var visited = new Set();
    collectPuzzle(0, 0, puzzle, matrix, visited);
    matrix.print();
}
function collectPuzzle(x, y, puzzle, matrix, visited) {
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
day.task1(function (data) {
    var firstPuzzle = null;
    var puzzleMap = data
        .split('\r\n\r\n')
        .map(function (pieceData, index) {
        var lines = pieceData.split('\r\n');
        var id = index;
        lines.shift();
        var puzzle = new Puzzle(id, lines);
        firstPuzzle = firstPuzzle || puzzle;
        return puzzle;
    })
        .reduce(function (acc, puzzle) {
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
});
day.task2(function (data) {
    return '';
});
