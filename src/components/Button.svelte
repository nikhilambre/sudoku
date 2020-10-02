<script>
  export let type = "primary";
  export let flat = false;
  export let inverse = false;
</script>

<style>
  .primary {
    background-color: var(--primary-color);
    color: var(--contrast-text);
  }
  .secondary {
    background-color: var(--secondary-color);
    color: var(--contrast-text);
  }
  .inverse {
    background-color: transparent;
    border: 0.1em solid var(--primary-color);
  }
  .flat {
    box-shadow: none;
  }
</style>

<button class={type} class:flat class:inverse>
  <slot />
</button>
