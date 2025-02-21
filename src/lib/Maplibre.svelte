<script>
	import { onMount } from 'svelte';
	import * as maplibregl from 'maplibre-gl';
	import 'maplibre-gl/dist/maplibre-gl.css';
	import { bbox } from '@turf/turf';

	import addTopoJsonLayer from '$lib/addTopoJsonLayer.js';

	/** @type {import('maplibre-gl').Map} */
	let map;
	let mapLayer;
	onMount(async () => {
		// Load the data
		const topodata = await fetch('/data/data.topojson').then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		});

		// Get the first object key from the TopoJSON if not known
		const topoLayerName = Object.keys(topodata.objects)[0];

		// Create the map
		map = new maplibregl.Map({
			container: 'map',
			style: 'https://tiles.openfreemap.org/styles/positron',
			center: [-74.5, 40],
			zoom: 7
		});

		// Wait for both map and data to be ready
		map.on('load', () => {
			mapLayer = addTopoJsonLayer(map, topodata, {
				sourceId: `${topoLayerName}_source`,
				layerId: topoLayerName,
				topoLayerName
			});

			map.fitBounds(bbox(mapLayer.geojson), {
				padding: 20,
				maxZoom: 12
			});
		});

		return () => {
			if (map?.remove) map.remove();
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
