/**
 * @typedef {Object} MapConfig
 * @property {string} name - Name for the map
 * @property {[[number, number], [number, number]]} bounds - The bounds of the map as [[minLng, minLat], [maxLng, maxLat]]
 * @property {Array<GeoLayerConfig>} layers - Array of layers with geojson data and style configuration
 */

/**
 * @typedef {Object} GeoLayerConfig
 * @property {import('geojson').FeatureCollection} geojson - The GeoJSON data for the layer
 * @property {MapStyleConfig} style - The style configuration for the layer
 */

/**
 * @typedef {Object} TopoLayerConfig
 * @property {import('topojson-specification').Topology} topodata - The TopoJSON data for the layer
 * @property {MapStyleConfig} style - The style configuration for the layer
 */

/**
 * @typedef {Object} MapStyleConfig
 * @property {'fill' | 'line' | 'symbol' | 'circle' | 'fill-extrusion' | 'raster' | 'background' | 'heatmap' | 'hillshade'} type - The type of map feature to render.
 * @property {Record<string, any>} paint - The paint configuration for the layer
 */

export {};
