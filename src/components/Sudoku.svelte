<script>
  import { onMount } from "svelte";

  export let values;
  export let errorArr;
  export let selectedX;
  export let selectedY;
  export let possibleValues;

  onMount(() => {
    document.querySelector("#sudo00 input").focus();
  });
</script>

<style>
  .sudoku-wrap {
    width: 55%;
  }
  .sudoku {
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
    position: relative;
  }
  .sudoku-elem.active {
    border: 0.1em solid var(--primary-color);
    background-color: #fff;
  }
  .sudoku-elem.error {
    border: 0.1em solid #721c24;
    background-color: #f8d7da;
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
    position: absolute;
    left: 0;
    top: 0;
    padding: 0;
    line-height: 2.5em;
    text-align: center;
    caret-color: transparent;
    cursor: pointer;
  }
  .possible-values {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  .possible-values span {
    font-size: 0.5em;
    line-height: 1.2em;
    color: #666;
    font-weight: 100;
  }
</style>

<div class="sudoku-wrap">
  <div class="sudoku">
    {#each Array(9) as _, i}
      {#each Array(9) as _, j}
        <div
          on:click
          id={'sudo' + i + j}
          class={(selectedX === i && selectedY === j ? 'active ' : '') + (errorArr[i][j] === true ? 'error ' : '') + 'sudoku-elem sudo' + i + j + ' sudoBox' + Math.floor((i + 3) / 3) + Math.floor((j + 3) / 3) + ' x' + i + ' y' + j}
          data-x={i}
          data-y={j}
          data-boxX={Math.floor((i + 3) / 3)}
          data-boxY={Math.floor((j + 3) / 3)}
          data-value={values[i][j]}>
          <div class="possible-values">
            {#each possibleValues[i][j] as x}
              <span class="val-span">{x}</span>
            {/each}
          </div>
          <input
            class="elem-input"
            maxlength="1"
            on:keydown
            bind:value={values[i][j]} />
        </div>
      {/each}
    {/each}
  </div>
</div>
