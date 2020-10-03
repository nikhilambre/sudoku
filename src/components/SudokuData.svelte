<script>
    import Button from "./Button.svelte";
</script>

<style>
    .sudoku-response {
        width: 45%;
        overflow-y: scroll;
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
    .sudoku-response::-webkit-scrollbar {
        display: none;
    }
    .intro {
        margin: 2em auto;
    }
</style>

<div class="sudoku-response">
    <section class="intro">
        <h2 class="intro-h2" tabindex="-1">What is Sudoku Solver</h2>
        <p class="intro-p" tabindex="-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            vel turpis ac dolor pretium ullamcorper non in tortor. Nulla id
            aliquet tortor. Curabitur ac leo egestas magna congue varius sed sed
            diam. Sed eros nisl, gravida eget lacus vel, auctor malesuada orci.
            Fusce maximus gravida suscipit.
        </p>
    </section>
    <section>
        <Button type="primary" flat={false} inverse={false} on:click>
            Solve Sudoku
        </Button>
    </section>
</div>
