<script>
	import Maplibre from '$lib/Maplibre.svelte';

	const filepath = '/data/data.topojson';
</script>

<Maplibre {filepath} />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
