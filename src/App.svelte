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
    sudokuSolved,
    isSudokuNotSolved,
  } from "./utility";

  let values = [
    [7, "", 3, "", "", "", "", "", 6],
    ["", 1, "", "", "", 9, "", "", ""],
    ["", 9, 6, 1, "", "", "", 3, ""],
    [5, "", "", "", "", 7, 9, "", 4],
    ["", "", "", 8, 1, "", 2, "", ""],
    ["", "", "", 5, "", "", "", "", ""],
    ["", "", 2, 4, "", "", "", "", 8],
    ["", "", "", "", "", "", "", "", ""],
    [3, "", 4, "", "", "", "", 6, ""],
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
        } else {
          sudokuSolved();
        }
      } else {
        sudokuSolved();
      }
    } else {
      sudokuSolved();
    }
    console.log("res3", values, possibleValues);
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
    {selectedY} />
  <SudokuData on:click={solveSudoku} />
</Main>
<Footer />
