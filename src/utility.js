export const sudokuSolved = () => {
    console.log("-----------------SUDOKU SOLVED!--------------------------");
}

export const isSudokuNotSolved = (valueArr) => {
    for (let iV = 0; iV < 9; iV++) {
        for (let jV = 0; jV < 9; jV++) {
            if (valueArr[iV][jV] === "") {
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
                hasMatchingPair(possibleValues[i][j], possibleValues[i + 1][j]) &&
                isPairNakedInBox(i, j, possibleValues[i][j], 'rowY', possibleValues)) {

                let pair = [...possibleValues[i][j]];
                possibleValues = updatePossibleValuesForNakedPair(i, j, 'rowY', [...possibleValues[i][j]], possibleValues);
                possibleValues[i][j] = pair;
                possibleValues[i + 1][j] = pair;

                let up = updateValueArr([...valueArr], [...possibleValues]);
                valueArr = up.valueArr;
                possibleValues = up.possibleValues;
            }
        }
    }
    for (let j = 0; j < 8; j++) {
        if (j === 2 || j === 5) continue;
        for (let k = 0; k < 9; k++) {
            if (possibleValues[k][j].length === 2 &&
                possibleValues[k][j + 1].length === 2 &&
                hasMatchingPair(possibleValues[k][j], possibleValues[k][j + 1]) &&
                isPairNakedInBox(k, j, possibleValues[k][j], 'rowX', possibleValues)) {

                let pair = [...possibleValues[k][j]];
                possibleValues = updatePossibleValuesForNakedPair(k, j, 'rowX', [...possibleValues[k][j]], possibleValues);
                possibleValues[k][j] = pair;
                possibleValues[k][j + 1] = pair;

                let up = updateValueArr([...valueArr], [...possibleValues]);
                valueArr = up.valueArr;
                possibleValues = up.possibleValues;
            }
        }
    }
    return { "possibleValues": possibleValues, "values": valueArr };
}

export const solveForPointOrClaimPair = (valueArr, possibleValues, type) => {
    // if (type === "claiming") {
    //     return { "possibleValues": possibleValues, "values": valueArr };
    // }

    for (let i = 0; i < 8; i++) {
        if (i === 2 || i === 5) continue;
        for (let j = 0; j < 9; j++) {
            if (possibleValues[i][j].length > 0 && possibleValues[i + 1][j].length > 0) {
                for (let rep = 0; rep < possibleValues[i][j].length; rep++) {   // Pairing need to be tested for each element
                    let elem = false;
                    if (type === "pointing") {
                        elem = isCandidatePointingInBox(i, j, hasPairCandidate(possibleValues[i][j][rep], possibleValues[i + 1][j]), 'rowY', possibleValues);
                    } else if (type === "claiming") {
                        elem = isCandidateClaimInRow(i, j, hasPairCandidate(possibleValues[i][j][rep], possibleValues[i + 1][j]), 'rowY', possibleValues);
                    }
                    if (elem) {
                        let pair1 = [...possibleValues[i][j]];
                        let pair2 = [...possibleValues[i + 1][j]];
                        if (type === "pointing") {
                            possibleValues = updatePossibleValuesForPointingCandidate(i, j, 'rowY', elem, possibleValues);
                        } else if (type === "claiming") {
                            possibleValues = updatePossibleValuesForClaimingCandidate(i, j, elem, possibleValues);
                        }
                        possibleValues[i][j] = pair1;
                        possibleValues[i + 1][j] = pair2;

                        let up = updateValueArr([...valueArr], [...possibleValues]);
                        valueArr = up.valueArr;
                        possibleValues = up.possibleValues;
                    }
                }
            }
        }
    }
    for (let j = 0; j < 8; j++) {
        if (j === 2 || j === 5) continue;
        for (let k = 0; k < 9; k++) {
            if (possibleValues[k][j].length > 0 && possibleValues[k][j + 1].length > 0) {
                for (let rep = 0; rep < possibleValues[k][j].length; rep++) {
                    let elem = false;
                    if (type === "pointing") {
                        elem = isCandidatePointingInBox(k, j, hasPairCandidate(possibleValues[k][j][rep], possibleValues[k][j + 1]), 'rowX', possibleValues);
                    } else if (type === "claiming") {
                        elem = isCandidateClaimInRow(k, j, hasPairCandidate(possibleValues[k][j][rep], possibleValues[k][j + 1]), 'rowX', possibleValues);
                    }
                    if (elem) {
                        let pair1 = [...possibleValues[k][j]];
                        let pair2 = [...possibleValues[k][j + 1]];
                        if (type === "pointing") {
                            possibleValues = updatePossibleValuesForPointingCandidate(k, j, 'rowX', elem, possibleValues);
                        } else if (type === "claiming") {
                            possibleValues = updatePossibleValuesForClaimingCandidate(k, j, elem, possibleValues);
                        }
                        possibleValues[k][j] = pair1;
                        possibleValues[k][j + 1] = pair2;

                        let up = updateValueArr([...valueArr], [...possibleValues]);
                        valueArr = up.valueArr;
                        possibleValues = up.possibleValues;
                    }
                }
            }
        }
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

export const updateValueArr = (valueArr, possibleValues) => {
    for (let iU = 0; iU < 9; iU++) {
        for (let jU = 0; jU < 9; jU++) {
            if (possibleValues[iU][jU].length === 0) continue;
            if (possibleValues[iU][jU].length === 1) {
                valueArr[iU][jU] = possibleValues[iU][jU][0];
                possibleValues[iU][jU] = [];
            } else continue;
        }
    }
    return { "possibleValues": possibleValues, "valueArr": valueArr }
}

export const hasPairCandidate = (element, arr) => {
    if (arr.includes(element)) return element;
    else return false;
}

export const isCandidateClaimInRow = (x, y, candidate, type, possibleValues) => {
    if (!candidate) return false;
    let start = getStart(x, y);
    if (type === "rowX") {
        for (let iD = 0; iD < 9; iD++) {
            if (possibleValues[x][iD].length < 1) continue;
            if (iD >= start.y && iD <= (start.y + 2)) continue;
            if (possibleValues[x][iD].includes(candidate)) return false;
        }
    }
    if (type === "rowY") {
        for (let iD = 0; iD < 9; iD++) {
            if (possibleValues[iD][y].length < 1) continue;
            if (iD >= start.x && iD <= (start.x + 2)) continue;
            if (possibleValues[iD][y].includes(candidate)) return false;
        }
    }
    return candidate;
}

export const isCandidatePointingInBox = (x, y, candidate, type, possibleValues) => {
    if (!candidate) return false;
    let start = getStart(x, y);
    for (let iC = start.x; iC < (start.x + 3); iC++) {
        for (let jC = start.y; jC < (start.y + 3); jC++) {
            if (possibleValues[iC][jC].length < 1) continue;
            if (type === "rowY" && y === jC) continue;
            if (type === "rowX" && x === iC) continue;
            if (possibleValues[iC][jC].includes(candidate)) return false;
        }
    }
    return candidate;
}

export const isPairNakedInBox = (x, y, pair, type, possibleValues) => {
    let start = getStart(x, y);
    for (let p = 0; p < pair.length; p++) {
        for (let i = start.x; i < (start.x + 3); i++) {
            for (let j = start.y; j < (start.y + 3); j++) {
                if (possibleValues[i][j].length === 0) continue;
                if (i === x && j === y) continue;
                if (type === "rowX")
                    if (i === x && j === (y + 1)) continue;
                if (type === "rowY")
                    if (i === (x + 1) && j === y) continue;
                if (possibleValues[i][j].includes(pair[p])) return false;
            }
        }
    }
    return true;
}

export const hasMatchingPair = (arr1, arr2) => {
    if (!arr1 || !arr2) return false;
    if (arr1.length != arr2.length) return false;

    let i = 0;
    if ((arr1[i] === arr2[i] && arr1[i + 1] === arr2[i + 1]) || (arr1[i] === arr2[i + 1] && arr1[i + 1] === arr2[i])) {
        return true;
    }
    return false;
}

export const updatePossibleValuesForPointingCandidate = (x, y, row, candidate, possibleValues) => {
    if (row === "rowX") {
        possibleValues = removeNumberFromRowX(x, y, candidate, possibleValues);
    } else if (row === "rowY") {
        possibleValues = removeNumberFromRowY(x, y, candidate, possibleValues);
    }
    return possibleValues;
}

export const updatePossibleValuesForClaimingCandidate = (x, y, candidate, possibleValues) => {
    let start = getStart(x, y);
    return removeNumberFromBox(start.x, start.y, candidate, possibleValues);
}

export const updatePossibleValuesForNakedPair = (x, y, row, pair, possibleValues) => {
    let start = getStart(x, y);
    for (let p = 0; p < pair.length; p++) {
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
    for (let iX = 0; iX < 9; iX++) {
        if (possibleValues[x][iX].length > 0) {
            for (let m = 0; m < possibleValues[x][iX].length; m++) {
                if (possibleValues[x][iX][m] === solvedNumb) {
                    possibleValues[x][iX].splice(m, 1);
                }
            }
        }
    }
    return possibleValues;
}

export const removeNumberFromRowY = (x, y, solvedNumb, possibleValues) => {
    for (let iY = 0; iY < 9; iY++) {
        if (possibleValues[iY][y].length > 0) {
            for (let m = 0; m < possibleValues[iY][y].length; m++) {
                if (possibleValues[iY][y][m] === solvedNumb) {
                    possibleValues[iY][y].splice(m, 1);
                }
            }
        }
    }
    return possibleValues;
}

export const getOthersPossibleValuesInBox = (x, y, valueArr, possibleValues) => {
    let start = getStart(x, y);
    let list = [];

    for (let i = start.x; i < (start.x + 3); i++) {
        for (let j = start.y; j < (start.y + 3); j++) {
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
    let start = getStart(x, y);
    for (let i = start.x; i < (start.x + 3); i++) {
        for (let j = start.y; j < (start.y + 3); j++) {
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