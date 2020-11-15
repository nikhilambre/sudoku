<script>
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import Main from "./components/Main.svelte";
  import Sudoku from "./components/Sudoku.svelte";
  import SudokuData from "./components/SudokuData.svelte";
  import {
    getAsciiCode,
    getValidatedKey,
    solveForPossibleValues,
    solveForUniquePossibleValues,
    solveForNakedPairs,
    solveForPointOrClaimPair,
    sudokuSolved,
    isSudokuNotSolved,
  } from "./utility";

  let values = [
    ["", "", "", "", "", 7, "", "", 6],
    ["", "", 6, "", "", "", 8, "", ""],
    ["", "", 1, 2, "", 5, 4, "", ""],
    ["", "", "", 1, "", "", "", "", ""],
    ["", 6, "", "", "", 9, "", "", ""],
    [5, 3, 8, "", "", "", 2, "", ""],
    ["", "", "", 4, "", "", "", 6, ""],
    ["", 5, "", "", 3, 8, "", 9, ""],
    ["", "", 7, "", "", "", "", "", 2],
  ];
  let possibleValues = [
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], []],
  ];
  let errorArr = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  let selectedX = 0;
  let selectedY = 0;
  let attempt = 2;

  const elementSelectHandler = (e) => {
    selectedX = +e.target.parentNode.getAttribute("data-x");
    selectedY = +e.target.parentNode.getAttribute("data-y");
  };

  const keyDownHandler = (evt) => {
    //  Escape for ALT key
    if (getAsciiCode(evt) === 18) return;

    //  Validate key entered
    let data = getValidatedKey(evt, selectedX, selectedY, values, errorArr);
    errorArr[selectedX][selectedY] = data.err;
    selectedX = data.x;
    selectedY = data.y;

    //  Update values entered
    document.querySelector(`#sudo${selectedX}${selectedY} input`).focus();
    values[selectedX][selectedY] = !!data.val ? Number(data.val) : "";
  };

  const solveSudoku = () => {
    let s1 = solveForPossibleValues(values, possibleValues);
    values = s1.values;
    possibleValues = s1.possibleValues;

    if (isSudokuNotSolved(values)) {
      let s2 = solveForUniquePossibleValues("box", values, possibleValues);
      values = s2.values;
      possibleValues = s2.possibleValues;

      if (isSudokuNotSolved(values)) {
        let s3 = solveForUniquePossibleValues("rowX", values, possibleValues);
        values = s3.values;
        possibleValues = s3.possibleValues;

        if (isSudokuNotSolved(values)) {
          let s4 = solveForUniquePossibleValues("rowY", values, possibleValues);
          values = s4.values;
          possibleValues = s4.possibleValues;

          if (isSudokuNotSolved(values)) {
            let s5 = solveForNakedPairs(values, possibleValues);
            values = s5.values;
            possibleValues = s5.possibleValues;

            if (isSudokuNotSolved(values)) {
              let s6 = solveForPointOrClaimPair(
                values,
                possibleValues,
                "pointing"
              );
              values = s6.values;
              possibleValues = s6.possibleValues;

              if (isSudokuNotSolved(values)) {
                let s7 = solveForPointOrClaimPair(
                  values,
                  possibleValues,
                  "claiming"
                );
                values = s7.values;
                possibleValues = s7.possibleValues;
              } else {
                sudokuSolved();
              }
            } else {
              sudokuSolved();
            }
          } else {
            sudokuSolved();
          }
        } else {
          sudokuSolved();
        }
      } else {
        sudokuSolved();
      }
    } else {
      sudokuSolved();
    }

    if (isSudokuNotSolved(values) && attempt > 0) {
      solveSudoku(attempt--);
    }
    console.log("final", possibleValues);
  };
</script>

<Header />
<Main>
  <Sudoku
    on:click={elementSelectHandler}
    on:keydown={keyDownHandler}
    {values}
    {errorArr}
    {selectedX}
    {selectedY}
    {possibleValues} />
  <SudokuData on:click={solveSudoku} />
</Main>
<Footer />
