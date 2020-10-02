<script>
  import { isRowHasNumber } from "./../utility";
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

  let selectedX = 0;
  let selectedY = 0;
  let errorX = null;
  let errorY = null;

  const elementSelectHandler = (e) => {
    console.log("eee", e.target.parentNode);

    selectedX = e.target.parentNode.getAttribute("data-x");
    selectedY = e.target.parentNode.getAttribute("data-y");
  };

  const keyDownHandler = (evt) => {
    console.log("e", evt, selectedX, selectedY);

    let ASCIICode = evt.which ? evt.which : evt.keyCode;
    if (ASCIICode === 9) {
    } else if (ASCIICode < 49 || ASCIICode > 57) {
      values[selectedX][selectedY] = " ";
    } else {
      values[selectedX][selectedY] = +evt.key;
      if (isRowHasNumber(+evt.key, selectedX, selectedY)) {
        errorX = selectedX;
        errorY = selectedX;
      }
    }
  };
</script>

<style>
  .sudoku-wrap {
    width: 33em;
    height: 33em;
    padding: 0;
    margin: 2em auto;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    border: 0.1em solid #444;
  }
  .sudoku-elem {
    width: calc(100% / 9);
    height: calc(100% / 9);
    display: inline-block;
    border: 0.01em solid #ddd;
    box-sizing: border-box;
    text-align: center;
    font-size: 1.6em;
    line-height: 2.5em;
  }
  .sudoku-elem.active {
    border: 0.1em solid var(--primary-color);
    background-color: #fff;
  }
  .sudoBox11,
  .sudoBox13,
  .sudoBox22,
  .sudoBox31,
  .sudoBox33 {
    background-color: #f6f6f6;
  }
  .sudoBox12,
  .sudoBox21,
  .sudoBox23,
  .sudoBox32 {
    background-color: #fff;
  }
  .x2,
  .x5 {
    border-bottom: 0.01em solid #444;
  }
  .y2,
  .y5 {
    border-right: 0.01em solid #444;
  }
  .elem-input {
    background: transparent;
    outline: none;
    border: none;
    font-size: 1.2em;
    width: 100%;
    height: 100%;
    padding: 0;
    line-height: 2.5em;
    text-align: center;
    caret-color: transparent;
    cursor: pointer;
  }
</style>

<div class="sudoku-wrap">
  {#each Array(9) as _, i}
    {#each Array(9) as _, j}
      <div
        on:click={elementSelectHandler}
        class={(selectedX == i && selectedY == j ? 'active ' : '') + (errorX == i && errorY == j ? 'error ' : '') + 'sudoku-elem sudo' + i + j + ' sudoBox' + Math.floor((i + 3) / 3) + Math.floor((j + 3) / 3) + ' x' + i + ' y' + j}
        data-x={i}
        data-y={j}
        data-boxX={Math.floor((i + 3) / 3)}
        data-boxY={Math.floor((j + 3) / 3)}
        data-value={values[i][j]}>
        <input
          class="elem-input"
          maxlength="1"
          on:keydown={keyDownHandler}
          bind:value={values[i][j]} />
      </div>
    {/each}
  {/each}
</div>
