<script lang="ts">
	import { addZero } from '$lib/scripts/timer';
	import { blur, fade } from 'svelte/transition';

	export let time: Date;
	export let end: Date;

	$: left = end.getTime() - time.getTime();

	$: days = Math.floor(left / (1000 * 60 * 60 * 24));
	$: hours = Math.floor((left / (1000 * 60 * 60)) % 24);
	$: minutes = Math.floor((left / 1000 / 60) % 60);
	$: seconds = Math.floor((left / 1000) % 60);

	$: times = [
		[days],
		addZero(hours).split(''),
		addZero(clip(minutes)).split(''),
		addZero(clip(seconds)).split('')
	];

	const clip = (a: number) => Math.max(0, Math.min(59, a));
</script>

<div class="main" style={$$props.style || ''}>
	<!-- display: inline-table; -->
	<div style="display: flex;">
		{#if left < 0}
			<span>00</span>
		{:else}
			{#each times as ti, i}
				{#if i > 1 || Number(ti[0]) + Number(ti[1] || 0) > 0}
					<div style="position: relative;display: flex;" transition:fade class:right={i === 0}>
						{#each ti as t}
							<div>
								{#key t}
									<span transition:blur={{ duration: 500 }} style="position: absolute;">
										{t}
									</span>
								{/key}
								<span style:opacity={0}>{t}</span>
							</div>
						{/each}
						{#if i === 0}d{:else if i < 3}<span>:</span>{/if}
					</div>
				{/if}
			{/each}
		{/if}
	</div>
</div>

<style>
	.main {
		display: flex;
		gap: 10px;
	}

	.right {
		margin-right: 10px;
	}
</style>
