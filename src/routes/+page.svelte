<script>
	import Maplibre from '$lib/Maplibre.svelte';
	import layers from './map-layers.js';
</script>

<Maplibre {layers} />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
