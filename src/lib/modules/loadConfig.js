import * as topojson from 'topojson-client';
import { geoBounds } from 'd3-geo';
import { rewindFeatureCollection, rewindFeature } from '@placemarkio/geojson-rewind';
/**
 *
 * @param {{
 * 	layers: Array<{
 * 		topodata: import('topojson-specification').Topology,
 * 		style: Record<string, any>
 * 	}>,
 * 	name: string?
 * }} config
 * @returns {{name: string?, bounds: [[number, number], [number, number]], layers: Array<{ geojson: import('geojson').FeatureCollection, style: Record<string, any> }>}}
 * }}
 */
export default function loadLayers(config) {
	const mapLayers = config.layers.map(({ topodata, style }) => {
		const topoLayerName = Object.keys(topodata.objects)[0];
		const geojson = topojson.feature(topodata, topodata.objects[topoLayerName]);

		/**
		 * @type {{
		 * 	geojson: import('geojson').FeatureCollection,
		 * 	style: import('$lib/types.js').MapStyleConfig
		 * }}
		 */
		return {
			geojson:
				geojson.type === 'FeatureCollection'
					? rewindFeatureCollection(geojson, 'd3')
					: rewindFeature(geojson, 'd3'),
			style
		};
	});

	/**
	 * @type {import('geojson').FeatureCollection}
	 */
	const combinedGeoJSON = {
		type: 'FeatureCollection',
		features: mapLayers.flatMap((layer) =>
			layer.geojson.type === 'FeatureCollection' ? layer.geojson.features : [layer.geojson]
		)
	};
	const fullBounds = geoBounds(combinedGeoJSON);

	return {
		name: config.name,
		bounds: fullBounds,
		layers: mapLayers
	};
}
