<script>
  import Button from "./components/Button.svelte";
  import Footer from "./components/Footer.svelte";
  import Header from "./components/Header.svelte";
  import Sudoku from "./components/Sudoku.svelte";
</script>

<style>
  .main {
    min-height: 700px;
  }
  .sudoku {
    width: 55%;
  }
  .sudoku-response {
    width: 45%;
    overflow-y: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .sudoku-response::-webkit-scrollbar {
    display: none;
  }
</style>

<Header />
<main class="main-wrap">
  <div class="container">
    <div class="main fx">
      <div class="sudoku">
        <Sudoku />
      </div>

      <div class="sudoku-response">
        <section class="intro">
          <h2 class="intro-h2">What is Sudoku Solver</h2>
          <p class="intro-p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
            vel turpis ac dolor pretium ullamcorper non in tortor. Nulla id
            aliquet tortor. Curabitur ac leo egestas magna congue varius sed sed
            diam. Sed eros nisl, gravida eget lacus vel, auctor malesuada orci.
            Fusce maximus gravida suscipit.
          </p>
        </section>
        <section>
          <Button type="primary" flat={true} inverse={false}>
            Solve Sudoku
          </Button>
        </section>
      </div>
    </div>
  </div>
</main>
<Footer />
