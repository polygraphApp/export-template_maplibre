import * as topojson from 'topojson-client';

/**
 * Adds a TopoJSON layer to a Mapbox map.
 * @param {import('maplibre-gl').Map} map - The Mapbox map instance.
 * @param {import('topojson-specification').Topology} topodata - The TopoJSON data to be added.
 * @param {Object} ids
 * @param {string} [ids.sourceId='topojson_source'] - The ID for the source.
 * @param {string} [ids.layerId='topojson_layer'] - The ID for the layer.
 * @param {string} [ids.topoLayerName='query_data'] - The specific layer within the TopoJSON data to be used.
 */
export default function addTopoJsonLayer(
	map,
	topodata,
	{ sourceId = 'topojson_source', layerId = 'topojson_layer', topoLayerName = 'query_data' } = {}
) {
	// Convert TopoJSON to GeoJSON
	const geojsonData = topojson.feature(topodata, topodata.objects[topoLayerName]);

	// Add the source to the map
	map.addSource(sourceId, {
		type: 'geojson',
		data: geojsonData
	});

	// Add the layer to the map
	map.addLayer({
		id: layerId,
		type: 'fill', // Can be changed to 'line' or 'symbol' based on needs
		source: sourceId,
		paint: {
			'fill-color': '#627BC1', // Default color
			'fill-opacity': 0.7, // Default opacity
			'fill-outline-color': '#000' // Default outline color
		}
	});

	return {
		geojson: geojsonData,
		// Helper function to update the layer style
		updateStyle: (/** @type {import('maplibre-gl').Style} */ style) => {
			Object.entries(style).forEach(([property, value]) => {
				map.setPaintProperty(layerId, property, value);
			});
		}

		// Helper function to update the source data
		// updateData: (
		// 	/** @type {import('topojson-specification').Topology} */ newTopoData,
		// 	/** @type {'string'} */ newSourceLayer
		// ) => {
		// const newGeoJSON = topojson.feature(newTopoData, newTopoData.objects[newSourceLayer]);
		// map.getSource(sourceId).setData(newGeoJSON);
		// }
	};
}
