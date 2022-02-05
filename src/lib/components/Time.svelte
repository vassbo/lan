<script lang="ts">
	import { onMount } from 'svelte';

	export let debug: boolean = false;

	let time: Date = new Date();
	let duration: number = 1000;

	onMount(() => {
		const interval = setInterval(() => {
			if (debug) time = new Date(time.getTime() + duration);
			else time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	const changeDuration = (e) => (duration = e.target.value * 1000);
</script>

<slot {time} />

{#if debug}
	<div class="debug">
		<button on:click={() => (duration -= 1000)}>{'<-'}</button>
		<input type="text" on:change={changeDuration} value={duration / 1000} />
		<button on:click={() => (duration += 1000)}>{'->'}</button>
	</div>
{/if}

<style>
	.debug {
		position: absolute;
		top: 0;
	}
</style>
