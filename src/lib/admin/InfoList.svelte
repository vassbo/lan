<script lang="ts">
  import Icon from "$lib/components/Icon.svelte"

  export let data: any
</script>

<div class="main">
  {#each data.info as info}
    <div class="info">
      {#if info.icon}
        <Icon id={info.icon} />
      {/if}
      <h4 style="white-space: nowrap;">{info.name}</h4>
      {#if info.description}
        <p>{info.description}</p>
      {/if}
    </div>
  {/each}
  <button>Legg til ny</button>
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    gap: 5px;
    flex: 1;
  }

  .info {
    border: 3px solid rgb(255 255 255 / 0.3);
    background-color: rgb(0 0 0 / 0.8);
    width: 100%;
    padding: 5px 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 5;
    cursor: pointer;
  }

  .info:hover {
    background-color: rgb(255 255 255 / 0.1);
  }
</style>
