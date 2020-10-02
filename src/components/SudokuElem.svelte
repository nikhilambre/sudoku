<script>
  export let x = 0;
  export let y = 0;
  export let boxX = 0;
  export let boxY = 0;
  export let value = 0;
</script>

<style>
  .elem {
    width: 100%;
    height: 100%;
    font-size: 1.6em;
    text-align: center;
    line-height: 2.5em;
    box-sizing: border-box;
  }
</style>

<div class="elem" data-x={x} data-y={y} data-boxX={boxX} data-boxY={boxY}>
  {value}
</div>
