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

export const isNumberInRows = (numb, xRowNumb, yRowNumb, valueArr) => {
    for (let i = 0; i < 9; i++) {
        if (i === yRowNumb) continue;
        if (valueArr[xRowNumb][i] === numb) {
            return true;
        }
    }
    for (let i = 0; i < 9; i++) {
        if (i === xRowNumb) continue;
        if (valueArr[i][yRowNumb] === numb) {
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

export const nonNumberKey = (key) => {
    return (key < 49 || key > 57) ? true : false;
}

export const getAsciiCode = (evt) => {
    return evt.which ? evt.which : evt.keyCode;
}