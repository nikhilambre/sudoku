<script>
  export let type = "primary";
  export let flat = false;
  export let inverse = false;
</script>

<style>
  .button {
    color: var(--contrast-text);
    cursor: pointer;
    padding: 1em 1.5em;
    border-radius: 0.3em;
    border: none;
    text-transform: uppercase;
    box-shadow: 0 20px 20px -20px rgba(0, 0, 0, 0.3),
      0 0 15px rgba(0, 0, 0, 0.2);
  }
  .primary {
    background-color: var(--primary-color);
  }
  .secondary {
    background-color: var(--secondary-color);
  }
  .inverse {
    background-color: transparent;
    border: 0.1em solid var(--primary-color);
  }
  .flat {
    box-shadow: none;
  }
</style>

<button tabindex="0" class={'button ' + type} class:flat class:inverse on:click>
  <slot />
</button>
