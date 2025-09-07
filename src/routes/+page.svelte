<script>
	import Maplibre from '$lib/Maplibre.svelte';
	import loadConfig from '$lib/modules/loadConfig.js';

	import layer1Topojson from '../data/topojson/layer1.topo.json';
	import layer2Topojson from '../data/topojson/layer2.topo.json';
	import layer1Style from '../data/style/layer1.style.json';
	import layer2Style from '../data/style/layer2.style.json';

	const config = loadConfig({
		name: 'Layered map',
		layers: [
			{ topodata: layer1Topojson, style: layer1Style },
			{ topodata: layer2Topojson, style: layer2Style }
		]
	});
</script>

<Maplibre {config} />

<style>
	:global(body) {
		margin: 0;
		padding: 0;
	}
</style>
