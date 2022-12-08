const path = require('path');
const DayNew = require(path.join(__dirname, '..', '..', 'helpers', 'DayNew'));

// Solution below
// -------------------------------------------------------------------------------------


function isVisibleTop(iCur, jCur, matrix) {
    for (let i = 0; i < iCur; i++) {
        if (matrix[i][jCur] >= matrix[iCur][jCur]) {
            return false;
        }
    }
    return true;
}

function isVisibleBottom(iCur, jCur, matrix) {
    for (let i = matrix.length - 1; i > iCur; i--) {
        if (matrix[i][jCur] >= matrix[iCur][jCur]) {
            return false;
        }
    }
    return true;
}

function isVisibleLeft(iCur, jCur, matrix) {
    for (let j = 0; j < jCur; j++) {
        if (matrix[iCur][j] >= matrix[iCur][jCur]) {
            return false;
        }
    }
    return true;
}

function isVisibleRight(iCur, jCur, matrix) {
    for (let j = matrix[0].length - 1; j > jCur; j--) {
        if (matrix[iCur][j] >= matrix[iCur][jCur]) {
            return false;
        }
    }
    return true;
}

function task1(data) {
    const matrix = data.split('\r\n').map(line => line.split('').map(n => Number(n)));

    let visible = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (isVisibleTop(i, j, matrix) ||
                isVisibleBottom(i, j, matrix) ||
                isVisibleRight(i, j, matrix) ||
                isVisibleLeft(i, j, matrix)) {
                visible += 1;
            }
        }
    }
    return visible;
}

function task2(data) {
    const matrix = data.split('\r\n').map(line => line.split('').map(n => Number(n)));

    let topV = 0;
    let bottomV = 0;
    let leftV = 0;
    let rightV = 0;
    let viewScore = Number.MIN_SAFE_INTEGER;

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {

            //top
            topV = 0;
            for (let x = i - 1; x >= 0; x--) {
                topV += 1;
                if (matrix[x][j] >= matrix[i][j]) {
                    break;
                }
            }
            //bottom
            bottomV = 0;
            for (let x = i + 1; x < matrix.length; x++) {
                bottomV += 1;
                if (matrix[x][j] >= matrix[i][j]) {
                    break;
                }
            }
            //left
            leftV = 0;
            for (let y = j - 1; y >= 0; y--) {
                leftV += 1;
                if (matrix[i][y] >= matrix[i][j]) {
                    break;
                }
            }
            //right
            rightV = 0;
            for (let y = j + 1; y < matrix[0].length; y++) {
                rightV += 1;
                if (matrix[i][y] >= matrix[i][j]) {
                    break;
                }
            }

            viewScore = Math.max(viewScore, topV * bottomV * rightV * leftV);
        }
    }

    return viewScore;
}

new DayNew(2022, 8, task1, task2);
