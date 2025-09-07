<script>
	import * as maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';

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
			center: [-95, 40.5],
			zoom: 3
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

			// Fit the map to the bounds
			map.fitBounds(config.bounds, {
				padding: 20,
				maxZoom: 12
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
