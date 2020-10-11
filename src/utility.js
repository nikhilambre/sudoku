export const sudokuSolved = () => {
    console.log("-----------------SUDOKU SOLVED!--------------------------");
}

export const isSudokuNotSolved = (valueArr) => {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (valueArr[i][j] === "") {
                return true;
            }
        }
    }
    return false;
}

export const solveForPossibleValues = (valueArr, possibleValues) => {
    let reCheck = false;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (!!valueArr[i][j]) continue;
            possibleValues[i][j] = [...getPossibleValues(i, j, valueArr)];
            if (possibleValues[i][j].length === 1) {
                reCheck = true;
                valueArr[i][j] = possibleValues[i][j][0];
                possibleValues[i][j] = [];
                possibleValues[i][j] = [...updatePossibleValues(i, j, possibleValues[i][j][0], possibleValues)];
            }
        }
    }
    if (reCheck) {
        solveForPossibleValues(valueArr, possibleValues);
    }
    return { "possibleValues": possibleValues, "values": valueArr }
}

export const getPossibleValues = (x, y, valueArr) => {
    let list = [];
    for (let numb = 1; numb < 10; numb++) {
        //  Check x number can present at (x,y) by checking presence in vert/hori rows & in box
        if (!isNumberInBox(numb, x, y, valueArr)) {
            if (!isNumberInRows(numb, x, y, valueArr)) {
                list.push(numb);
            }
        }
    }
    return list;
}

export const solveForUniquePossibleValues = (type, valueArr, possibleValues) => {
    let reCheck = false;

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (valueArr[i][j] === "") {
                let othersPossibleValuesArr = [];

                if (type === "box") {
                    othersPossibleValuesArr = getOthersPossibleValuesInBox(i, j, valueArr, possibleValues);
                } else if (type === "rowX") {
                    othersPossibleValuesArr = getOthersPossibleValuesInRow(i, j, "x", valueArr, possibleValues);
                } else if (type === "rowY") {
                    othersPossibleValuesArr = getOthersPossibleValuesInRow(i, j, "y", valueArr, possibleValues);
                }

                let uniquePossibleValues = possibleValues[i][j].filter(e => othersPossibleValuesArr.indexOf(e) === -1);

                if (uniquePossibleValues.length === 1) {
                    reCheck = true;
                    valueArr[i][j] = uniquePossibleValues[0];
                    possibleValues[i][j] = [];
                    possibleValues[i][j] = [...updatePossibleValues(i, j, uniquePossibleValues[0], possibleValues)];
                }
                // console.log('uniquePossibleValues', type, possibleValues[i][j], othersPossibleValuesArr, uniquePossibleValues, i, j);
            }
        }
    }
    if (reCheck) {
        solveForUniquePossibleValues(type, valueArr, possibleValues);
    }
    return { "possibleValues": possibleValues, "values": valueArr };
}

export const solveForNakedPairs = (valueArr, possibleValues) => {
    for (let i = 0; i < 8; i++) {
        if (i === 2 || i === 5) continue;
        for (let j = 0; j < 9; j++) {
            if (possibleValues[i][j].length === 2 &&
                possibleValues[i + 1][j].length === 2 &&
                possibleValues[i][j].matchingPair(possibleValues[i + 1][j])) {
                let pair = [...possibleValues[i][j]];
                possibleValues = updatePossibleValuesForNakedPair(i, j, 'rowY', [...possibleValues[k][j]], possibleValues);

                possibleValues[i][j] = pair;
                possibleValues[i + 1][j] = pair;
            }
        }
    }
    for (let j = 0; j < 8; j++) {
        if (j === 2 || j === 5) continue;
        for (let k = 0; k < 9; k++) {
            if (possibleValues[k][j].length === 2 &&
                possibleValues[k][j + 1].length === 2 &&
                possibleValues[k][j].matchingPair(possibleValues[k][j + 1])) {

                let pair = [...possibleValues[k][j]];
                possibleValues = updatePossibleValuesForNakedPair(k, j, 'rowX', [...possibleValues[k][j]], possibleValues);
                possibleValues[k][j] = pair;
                possibleValues[k][j + 1] = pair;
            }
        }
    }
    return { "possibleValues": possibleValues, "values": valueArr };
}

export const updatePossibleValuesForNakedPair = (x, y, row, pair, possibleValues) => {
    for (let p = 0; p < pair.length; p++) {
        let start = getStart(x, y);
        possibleValues = removeNumberFromBox(start.x, start.y, pair[p], possibleValues);
        if (row === "rowX") {
            possibleValues = removeNumberFromRowX(x, y, pair[p], possibleValues);
        } else if (row === "rowY") {
            possibleValues = removeNumberFromRowY(x, y, pair[p], possibleValues);
        }
    };
    return possibleValues;
}

export const updatePossibleValues = (x, y, solvedNumb, possibleValues) => {
    let start = getStart(x, y);
    possibleValues = removeNumberFromBox(start.x, start.y, solvedNumb, possibleValues);
    possibleValues = removeNumberFromRowX(x, y, solvedNumb, possibleValues);
    possibleValues = removeNumberFromRowY(x, y, solvedNumb, possibleValues);
    return possibleValues[x][y];
}

export const removeNumberFromBox = (startX, startY, solvedNumb, possibleValues) => {
    for (let i = startX; i < (startX + 3); i++) {
        for (let j = startY; j < (startY + 3); j++) {
            if (possibleValues[i][j].length > 0) {
                for (let m = 0; m < possibleValues[i][j].length; m++) {
                    if (possibleValues[i][j][m] === solvedNumb) {
                        possibleValues[i][j].splice(m, 1);
                    }
                }
            }
        }
    }
    return possibleValues;
}

export const removeNumberFromRowX = (x, y, solvedNumb, possibleValues) => {
    for (let i = 0; i < 9; i++) {
        if (possibleValues[x][i].length > 0) {
            for (let m = 0; m < possibleValues[x][i].length; m++) {
                if (possibleValues[x][i][m] === solvedNumb) {
                    possibleValues[x][i].splice(m, 1);
                }
            }
        }
    }
    return possibleValues;
}

export const removeNumberFromRowY = (x, y, solvedNumb, possibleValues) => {
    for (let i = 0; i < 9; i++) {
        if (possibleValues[i][y].length > 0) {
            for (let m = 0; m < possibleValues[i][y].length; m++) {
                if (possibleValues[i][y][m] === solvedNumb) {
                    possibleValues[i][y].splice(m, 1);
                }
            }
        }
    }
    return possibleValues;
}

export const getOthersPossibleValuesInBox = (x, y, valueArr, possibleValues) => {
    let startX = Math.floor(x / 3) * 3;
    let startY = Math.floor(y / 3) * 3;
    let list = [];

    for (let i = startX; i < (startX + 3); i++) {
        for (let j = startY; j < (startY + 3); j++) {
            if (valueArr[i][j] === "" && !(x === i && y === j)) {
                list = [...new Set([...list, ...possibleValues[i][j]])];
            }
        }
    }
    return list;
}

export const getOthersPossibleValuesInRow = (x, y, type, valueArr, possibleValues) => {
    let list = [];
    for (let i = 0; i < 9; i++) {
        if (type === "x" && valueArr[x][i] === "" && y !== i) {
            list = [...new Set([...list, ...possibleValues[x][i]])];
        }
        if (type === "y" && valueArr[i][y] === "" && x !== i) {
            list = [...new Set([...list, ...possibleValues[i][y]])];
        }
    }
    return list;
}

export const isNumberInRows = (numb, x, y, valueArr) => {
    for (let i = 0; i < 9; i++) {
        if (i === y) continue;
        if (valueArr[x][i] === numb) {
            return true;
        }
    }
    for (let i = 0; i < 9; i++) {
        if (i === x) continue;
        if (valueArr[i][y] === numb) {
            return true;
        }
    }
    return false;
}

export const isNumberInXRow = (numb, xRowNumb, yRowNumb, valueArr) => {
    for (let i = 0; i < 9; i++) {
        if (i === yRowNumb) continue;
        if (valueArr[xRowNumb][i] === numb) {
            return true;
        }
    }
    return false;
}

export const isNumberInYRow = (numb, xRowNumb, yRowNumb, valueArr) => {
    for (let i = 0; i < 9; i++) {
        if (i === xRowNumb) continue;
        if (valueArr[i][yRowNumb] === numb) {
            return true;
        }
    }
    return false;
}

export const isNumberInBox = (numb, x, y, valueArr) => {
    let startX = Math.floor(x / 3) * 3;
    let startY = Math.floor(y / 3) * 3;

    for (let i = startX; i < (startX + 3); i++) {
        for (let j = startY; j < (startY + 3); j++) {
            if (i === x && j === y) continue;
            if (valueArr[i][j] === numb) {
                return true;
            }
        }
    }
    return false;
}

/**
 * 
 * @param {event} evt 
 * @param {number} X 
 * @param {number} Y 
 * @param {Array[]} values 
 * @description verify a key entered is a number or position modifier or a invalid entry
 */
export const getValidatedKey = (evt, X, Y, values, errors) => {
    let data = { val: null, x: X, y: Y, err: errors[X][Y] };
    let ASCIICode = getAsciiCode(evt);

    if (isTabKey(ASCIICode)) {
        if (Y === 8) {
            data.x = X + 1;
            data.y = 0;
        } else {
            data.y = Y + 1;
        }
        data.val = values[data.x][data.y];
    } else if (isLeftArrowKey(ASCIICode)) {
        if (Y !== 0) {
            data.y = Y - 1;
        }
        data.val = values[data.x][data.y];
    } else if (isUpArrowKey(ASCIICode)) {
        if (X !== 0) {
            data.x = X - 1;
        }
        data.val = values[data.x][data.y];
    } else if (isRightArrowKey(ASCIICode)) {
        if (Y !== 8) {
            data.y = Y + 1;
        }
        data.val = values[data.x][data.y];
    } else if (isDownArrowKey(ASCIICode)) {
        if (X !== 8) {
            data.x = X + 1;
        }
        data.val = values[data.x][data.y];
    } else if (isBackSpaceKey(ASCIICode)) {
        data.err = false;
    } else if (nonNumberKey(ASCIICode)) {
        data.val = 1;
    } else {
        if (isNumberInRows(+evt.key, X, Y, values) || isNumberInBox(+evt.key, X, Y, values)) {
            data.x = X;
            data.y = Y;
            data.err = true;
            data.val = +evt.key;
        } else {
            data.val = +evt.key;
            data.err = false;
        }
    }
    return data;
}

export const isTabKey = (key) => {
    return key === 9 ? true : false;
}

export const isLeftArrowKey = (key) => {
    return key === 37 ? true : false;
}

export const isUpArrowKey = (key) => {
    return key === 38 ? true : false;
}

export const isRightArrowKey = (key) => {
    return key === 39 ? true : false;
}

export const isDownArrowKey = (key) => {
    return key === 40 ? true : false;
}

export const isBackSpaceKey = (key) => {
    return key === 8 ? true : false;
}

export const nonNumberKey = (key) => {
    return (key < 49 || key > 57) ? true : false;
}

export const getAsciiCode = (evt) => {
    return evt.which ? evt.which : evt.keyCode;
}

export const getStart = (x, y) => {
    let startX = Math.floor(x / 3) * 3;
    let startY = Math.floor(y / 3) * 3;
    return { "x": startX, "y": startY }
}

Array.prototype.matchingPair = function (array) {
    if (!array) return false;
    if (this.length != array.length) return false;

    let i = 0;
    if ((this[i] === array[i] && this[i + 1] === array[i + 1]) || (this[i] === array[i + 1] && this[i + 1] === array[i])) {
        return true;
    }
    return false;
}