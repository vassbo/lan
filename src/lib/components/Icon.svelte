<script lang="ts">
	import { icons } from '$lib/data/icons';

	export let id: string;
	export let color: null | string = null;
	export let size: number = 1;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	height="{24 * size}px"
	viewBox="0 0 24 24"
	width="{24 * size}px"
	style:fill={color}
>
	{@html icons[id]}
</svg>

<style>
	svg {
		fill: var(--text);
	}
</style>
