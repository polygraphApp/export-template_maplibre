<script>
	import { onMount } from 'svelte';
	import * as maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { bbox } from '@turf/turf';

	import addTopoJsonLayer from '$lib/modules/addTopoJsonLayer.js';
	import loadFiles from '$lib/modules/loadFiles.js';
	import mergeBounds from '$lib/modules/mergeBounds.js';

	let { layers } = $props();
	/** @type {import('maplibre-gl').Map} */
	let map;

	onMount(async () => {
		try {
			// Prepare file paths
			const paths = {
				topo: layers.map((/** @type {string} layer */ layer) => `/topojson/${layer}.topojson`),
				style: layers.map((/** @type {string} layer */ layer) => `/style/${layer}.style.json`)
			};

			// Load all data in parallel
			const [topodatas, styledatas] = await Promise.all([
				loadFiles(paths.topo),
				loadFiles(paths.style)
			]);

			// Create the map
			map = new maplibregl.Map({
				container: 'map',
				style: 'https://tiles.openfreemap.org/styles/positron',
				center: [-95, 40.5],
				zoom: 3
			});

			// Wait for map to be ready
			map.on('load', () => {
				// Process each layer
				const mapLayers = topodatas.map((topodata, i) => {
					const topoLayerName = Object.keys(topodata.objects)[0];
					const id = `${topoLayerName}_source_${i}`;

					return addTopoJsonLayer(map, topodata, styledatas[i], {
						sourceId: id,
						layerId: id,
						topoLayerName
					});
				});

				// Calculate bounds
				const fullBounds = mapLayers.reduce((bounds, mapLayer, index) => {
					const layerBounds = bbox(mapLayer.geojson);
					return index === 0 ? layerBounds : mergeBounds(bounds, layerBounds);
				}, null);

				// Fit the map to the bounds
				map.fitBounds(fullBounds, {
					padding: 20,
					maxZoom: 12
				});
			});
		} catch (error) {
			console.error('Error initializing map:', error);
		}

		// Cleanup function
		return () => {
			if (map) map.remove();
		};
	});
</script>

<div id="map"></div>

<style>
	#map {
		width: 100%;
		height: 100vh;
	}
</style>
