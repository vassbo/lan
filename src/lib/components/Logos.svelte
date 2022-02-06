<script lang="ts">
  import { onMount } from "svelte"
  import { fade } from "svelte/transition"

  let logos = ["jærlan", "varden", "uf", "ukuf", "jærenkabelnett"]

  let duration: number = 15 * 1000
  let fadein: number = 5 * 1000
  let between: number = 60 * 1000

  let current: number = 0
  let active: boolean = false

  onMount(() => {
    const interval = setInterval(() => {
      current++
      if (current >= logos.length) current = 0
      active = true
      setTimeout(() => {
        active = false
      }, duration - fadein)
    }, between + duration)

    return () => {
      clearInterval(interval)
    }
  })
</script>

<div class="logo">
  {#if active}
    <img transition:fade={{ duration: fadein }} src="./src/lib/logos/{logos[current]}.png" alt="" />
  {/if}
</div>

<style>
  .logo {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.4;
  }

  img {
    width: 60%;
    height: 100%;
    object-fit: contain;
  }
</style>
