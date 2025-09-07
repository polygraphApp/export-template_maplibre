<script>
	import * as maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

	/**
	 * The map configuration
	 * @typedef {Object} Props
	 * @property {import('$lib/types.js').MapConfig} config - The map configuration
	 */

	/** @type {Props} */
	let { config } = $props();

	/**
	 * @param {HTMLElement} element
	 * @returns {() => void}
	 */
	function loadMap(element) {
		// Create the map
		const map = new maplibregl.Map({
			container: element,
			style: 'https://tiles.openfreemap.org/styles/positron',
			bounds: config.bounds,
			fitBoundsOptions: {
				padding: 20
			}
		});

		// Wait for map to be ready
		map.on('load', () => {
			// Process each layer
			config.layers.forEach(({ geojson, style }, i) => {
				map.addSource(`${config.name}-${i}`, {
					type: 'geojson',
					data: geojson
				});

				// Add the layer to the map
				map.addLayer({
					id: `${config.name}-${i}`,
					type: style.type,
					source: `${config.name}-${i}`,
					paint: style.paint
				});
			});
		});

		// Cleanup function
		return () => {
			if (map) map.remove();
		};
	}
</script>

<div id="map" {@attach loadMap}></div>

<style>
	#map {
		width: 100%;
		height: 100vh;
	}
</style>
