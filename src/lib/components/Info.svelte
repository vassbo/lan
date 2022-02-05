<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"
  import Icon from "./Icon.svelte"

  interface Info {
    disabled?: boolean
    name: string
    description?: string
    icon?: string
  }

  export let data: any
  let info: Info[] = data.info

  let current: number = 0

  onMount(() => {
    const interval = setInterval(() => {
      do {
        current++
        if (current >= info.length) current = 0
      } while (info[current].disabled)
    }, 5000)

    return () => {
      clearInterval(interval)
    }
  })
</script>

{#key current}
  <div class="info" transition:fade>
    {#if info[current].icon}
      <Icon id={info[current].icon} />
    {/if}
    <h4 style="white-space: nowrap;">{info[current].name}</h4>
    {#if info[current].description}
      <p>{info[current].description}</p>
    {/if}
  </div>
{/key}

<style>
  .info {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    border: 3px solid rgb(255 255 255 / 0.3);
    background-color: rgb(0 0 0 / 0.8);
    max-width: 95%;
    padding: 5px 10px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 5;
  }
</style>
