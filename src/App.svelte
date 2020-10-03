<script>
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import Main from "./components/Main.svelte";
  import Sudoku from "./components/Sudoku.svelte";
  import SudokuData from "./components/SudokuData.svelte";
  import { getAsciiCode, getValidatedKey } from "./utility";

  let values = [
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", ""],
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
    if (getAsciiCode(evt) === 18) return;
    let data = getValidatedKey(evt, selectedX, selectedY, values, errorArr);

    errorArr[selectedX][selectedY] = data.err;
    selectedX = data.x;
    selectedY = data.y;
    document.querySelector(`#sudo${selectedX}${selectedY} input`).focus();

    values[selectedX][selectedY] = !!data.val ? Number(data.val) : "";
  };

  const solveSudoku = () => {
    console.log("start solving sudoku");
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
