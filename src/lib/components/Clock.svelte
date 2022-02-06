<script lang="ts">
  import { tweened } from "svelte/motion"
  import { linear } from "svelte/easing"
  import { addZero } from "$lib/scripts/timer"
  import Logos from "./Logos.svelte"

  export let time: Date

  $: hours = time.getHours()
  $: minutes = time.getMinutes()
  $: seconds = time.getSeconds()

  let sweep = tweened(parseInt(((Date.now() / 1000) % 60).toString()), {
    duration: 1000,
    easing: linear,
  })

  // for a smooth transition between 59 and 0 seconds
  let start: number = Date.now() / 1000 - ((Date.now() / 1000) % 60)

  $: if (seconds) sweep.set(parseInt((Date.now() / 1000 - start).toString()))

  const transform = (minute: number) => (Math.abs((minute / 5 - 6) * 6 * (minute / (minute / 5))) * Math.PI) / 180 / Math.PI
</script>

<main>
  <div class="flex">
    <Logos />
    <svg viewBox="-50 -50 100 100">
      <circle class="clock-face" r="48" />

      <!-- markers -->
      {#each [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as minute}
        {#if [15, 30, 45].includes(minute)}
          <g transform="rotate({(minute / 5 - 6) * 6 * (minute / (minute / 5))})">
            <text
              class="clock-text"
              transform="rotate({(minute / 5 - 6) * 6 * (minute / (minute / 5)) * -1},0,{41.3 + (1 - transform(minute))})"
              text-anchor="middle"
              y={47 + transform(minute) - 1}
            >
              {minute / 5}
            </text>
          </g>
        {:else if minute === 0}
          <g transform="rotate(-180)">
            <text class="clock-text" transform="rotate(180,0,31)" text-anchor="middle" y={26 + (Math.abs(180) * Math.PI) / 180 / Math.PI - 1}>12 </text>
          </g>
        {:else}
          <line class="major" y1="40" y2="45" transform="rotate({30 * minute})" />
        {/if}

        {#each [1, 2, 3, 4] as offset}
          <line class="minor" y1="42" y2="45" transform="rotate({6 * (minute + offset)})" />
        {/each}
      {/each}

      <!-- hour hand -->
      <line class="hour" y1="6" y2="-28" transform="rotate({30 * hours + minutes / 2})" />

      <!-- minute hand -->
      <line class="minute" y1="6" y2="-42" transform="rotate({6 * minutes + seconds / 10})" />

      <!-- second hand -->
      <!-- <g transform="rotate({6 * $sweep})">
				<line class="second" y1="10" y2="-36" />
				<line class="second-counterweight" y1="10" y2="4" />
			</g> -->

      <!-- pivot -->
      <circle class="point" r="1.25" />
    </svg>
  </div>
  <div class="digital">
    <span>
      {addZero(hours)}:{addZero(minutes)}
      <span style="font-size: 0.5em;">
        :{addZero(seconds)}
      </span>
    </span>
  </div>
</main>

<style>
  main,
  .flex {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 10px;
    height: 100%;
    width: 100%;
    --glow: 0 0 5px rgb(255 255 255 / 50%);
  }

  .digital {
    flex: 0;
    text-align: center;
    font-size: 2em;
    /* text-shadow: var(--glow); */
  }

  svg {
    height: 100%;
    z-index: 1;
  }

  .clock-face {
    fill: none;
  }

  .clock-text {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
    fill: var(--text);
    /* stroke: var(--text); */
    font-size: 0.7em;
    /* text-shadow: var(--glow); */
    opacity: 0.8;
  }

  .point {
    fill: var(--text);
    /* box-shadow: var(--glow); */
  }

  .minor {
    stroke: var(--text);
    opacity: 0.2;
    stroke-width: 0.2;
  }

  .major {
    stroke: var(--text);
    /* box-shadow: var(--glow); */
    stroke-width: 0.8;
    opacity: 0.3;
  }

  .hour {
    stroke: var(--text);
    /* box-shadow: var(--glow); */
    stroke-linecap: round;
    stroke-width: 1.5;
  }

  .minute {
    stroke: var(--text);
    /* box-shadow: var(--glow); */
    stroke-linecap: round;
    stroke-width: 1;
  }

  /* .second {
		stroke-width: 0.5;
		opacity: 0.2;
		stroke: var(--text);
	} */

  /* .second-counterweight {
		stroke: var(--text);
		stroke-width: 1.5;
	} */
</style>
