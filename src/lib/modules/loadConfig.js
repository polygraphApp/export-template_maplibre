import * as topojson from 'topojson-client';
import { geoBounds } from 'd3-geo';
import { rewindFeatureCollection, rewindFeature } from '@placemarkio/geojson-rewind';
/**
 *
 * @param {{
 * 	layers: Array<import('$lib/types.js').TopoLayerConfig>,
 * 	name: string
 * }} config
 * @returns {import('$lib/types.js').MapConfig}
 * }}
 */
export default function loadConfig(config) {
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
