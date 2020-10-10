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
    .intro-h2 {
        margin: 0.5em 0;
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
        <h2 class="intro-h2" tabindex="-1">What is Sudoku Solver!</h2>
        <p class="intro-p" tabindex="-1">
            Sudoku Solver is app build with Svelte. You can add your sudoku and
            click 'Solve Sudoku' and it will solve your sudoku. We are still
            working on it to solve maximum possible sudoku puzzles. Also working
            to adding trail of actions taken to solve puzzle after every action.
            <br /><br />
            We have added a sample puzzle to start.
        </p>
    </section>
    <section>
        <Button type="primary" flat={false} inverse={false} on:click>
            Solve Sudoku
        </Button>
    </section>
</div>
