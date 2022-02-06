<script lang="ts">
  import Time from "$lib/components/Time.svelte"
  import Events from "$lib/components/Events.svelte"
  import { onMount } from "svelte"
  import InfoList from "./InfoList.svelte"

  let data: any = {}

  onMount(async () => {
    fetch("https://json.extendsclass.com/bin/c1f9f4b148a4")
      .then((response) => response.json())
      .then((d) => (data = d))
      .catch((error) => console.log(error))
  })
</script>

{#if Object.keys(data).length}
  <Time let:time>
    <div>
      <span style="flex: 1;">
        <Events {time} {data} max={-1} />
        <button>Legg til ny</button>
      </span>
      <InfoList {data} />
    </div>
  </Time>
{/if}

<style>
  div {
    display: flex;
    gap: 50px;
    padding: 50px;
  }

  div :global(button) {
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    padding: 10px 20px;
    border-radius: 8px;
    background: none;
    border: 3px solid rgb(255 255 255 / 0.2);
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    margin-top: 5px;
    transition: background-color 0.3s;
  }

  div :global(button):hover {
    background-color: rgb(255 255 255 / 0.1);
  }
</style>
