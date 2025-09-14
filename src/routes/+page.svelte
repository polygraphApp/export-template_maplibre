<script>
	import Maplibre from '$lib/Maplibre.svelte';
	import loadConfig from '$lib/modules/loadConfig.js';

	import layer1TopojsonRaw from '../data/topojson/layer1.topo.json';
	import layer2TopojsonRaw from '../data/topojson/layer2.topo.json';
	import layer1StyleRaw from '../data/style/layer1.style.json';
	import layer2StyleRaw from '../data/style/layer2.style.json';

	/** @type {import('topojson-specification').Topology} */
	const layer1Topojson = layer1TopojsonRaw;
	/** @type {import('topojson-specification').Topology} */
	const layer2Topojson = layer2TopojsonRaw;

	/** @type {import('$lib/types.js').MapStyleConfig} */
	const layer1Style = layer1StyleRaw;
	/** @type {import('$lib/types.js').MapStyleConfig} */
	const layer2Style = layer2StyleRaw;

	const config = loadConfig({
		name: 'Layered map',
		layers: [
			{ topodata: layer1Topojson, style: layer1Style },
			{ topodata: layer2Topojson, style: layer2Style }
		]
	});
</script>

<Maplibre {config} />
