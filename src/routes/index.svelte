<script lang="ts">
  import Clock from "$lib/components/Clock.svelte"
  import Countdown from "$lib/components/Countdown.svelte"
  import Events from "$lib/components/Events.svelte"
  import Info from "$lib/components/Info.svelte"
  import Time from "$lib/components/Time.svelte"
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"

  let data: any = {}

  onMount(() => {
    async function fetchData() {
      // setting to no-store to prevent chrome only getting cashed version
      fetch("https://json.extendsclass.com/bin/c1f9f4b148a4", { cache: "no-store" })
        .then((response) => response.json())
        .then((d) => (data = d))
        .catch((error) => console.warn(error))
    }

    // update every 3 minutes
    const interval = setInterval(fetchData, 3 * 60000)
    fetchData()

    return () => clearInterval(interval)
  })
</script>

<main>
  <Time let:time>
    {#if Object.keys(data).length}
      <Info {data} />
      <!-- if less than 60 minutes to start -->
      {#if new Date(data.start).getTime() - time.getTime() < 60 * 60000 && new Date(data.start).getTime() - time.getTime() > 0}
        <div class="countdown" transition:fade>
          <Countdown {time} end={new Date(data.start)} transition />
        </div>
      {:else}
        <div class="grid" transition:fade>
          <Events {time} {data} />
          <Clock {time} />
        </div>
      {/if}
    {/if}
  </Time>
</main>

<style>
  :global(:root) {
    --primary: black;
    --text: white;
  }

  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  main {
    width: 100vw;
    height: 100vh;
    position: relative;
    background-color: var(--primary);
    color: var(--text);
    font-family: Roboto, "Segoe UI", Tahoma, sans-serif;
    font-size: 1.2em;
    overflow-y: auto;
  }

  .grid {
    display: flex;
    height: 100%;
    gap: 50px;
    padding: 50px;
  }
  .grid :global(main) {
    width: 50%;
    padding: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 1000px) {
    .grid {
      flex-direction: column;
      padding: 10px;
    }

    .grid :global(main) {
      width: 100%;
      padding: 0;
    }
  }

  .countdown {
    position: absolute;
    font-size: 20em;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
