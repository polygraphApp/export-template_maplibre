/**
 * @typedef {Object} MapConfig
 * @property {string} name - Name for the map
 * @property {[[number, number], [number, number]]} bounds - The bounds of the map as [[minLng, minLat], [maxLng, maxLat]]
 * @property {Array<GeoLayerConfig>} layers - Array of layers with geojson data and style configuration
 */

/**
 * @typedef {Object} GeoLayerConfig
 * @property {import('geojson').FeatureCollection} geojson - The GeoJSON data for the layer
 * @property {import('$lib/types.js').MapStyleConfig} style - The style configuration for the layer
 */

/**
 * @typedef {Object} TopoLayerConfig
 * @property {import('topojson-specification').Topology} topodata - The TopoJSON data for the layer
 * @property {import('$lib/types.js').MapStyleConfig} style - The style configuration for the layer
 */

/**
 * @typedef {SimplePolygonConfig | ChoroplethPolygonConfig | SimpleLineConfig | ChoroplethLineConfig | SimplePointConfig | ChoroplethPointConfig | SimpleDynamicPointConfig | ChoroplethDynamicPointConfig} MapStyleConfig
 */

/**
 * @typedef {Object} BaseStyleConfig
 * @property {'polygon'|'line'|'point'} type - The type of map feature to render.
 * @property {keyof typeof import('d3-geo')} projection - The D3 projection to use (e.g., 'geoMercator', 'geoAlbersUsa').
 * @property {'canvas'|'svg'} renderer - The renderer to use for the map.
 * @property {number} [fixedAspectRatio]
 */

/**
 * @typedef {BaseStyleConfig & { paint: SimplePolygon }} SimplePolygonConfig
 * @property {SimplePolygon} paint - The paint properties for the choropleth polygon style.
 */

/**
 * @typedef {BaseStyleConfig & {paint: ChoroplethPolygon}} ChoroplethPolygonConfig
 * @property {ChoroplethPolygon} paint - The paint properties for the choropleth polygon style.
 */

/**
 * @typedef {BaseStyleConfig & {paint: SimpleLine}} SimpleLineConfig
 * @property {SimpleLine} paint - The paint properties for the line style.
 */

/**
 * @typedef {BaseStyleConfig & {paint: ChoroplethLine}} ChoroplethLineConfig
 * @property {ChoroplethLine} paint - The paint properties for the choropleth line style.
 */

/**
 * @typedef {BaseStyleConfig & {paint: SimplePoint}} SimplePointConfig
 * @property {SimplePoint} paint - The paint properties for the point style.
 */

/**
 * @typedef {BaseStyleConfig & {paint: ChoroplethPoint}} ChoroplethPointConfig
 * @property {ChoroplethPoint} paint - The paint properties for the choropleth point style.
 */

/**
 * @typedef {BaseStyleConfig & {paint: SimpleDynamicPoint}} SimpleDynamicPointConfig
 * @property {SimpleDynamicPoint} paint - The paint properties for the dynamic point style.
 */

/**
 * @typedef {BaseStyleConfig & {paint: ChoroplethDynamicPoint}} ChoroplethDynamicPointConfig
 * @property {ChoroplethDynamicPoint} paint - The paint properties for the choropleth dynamic point style.
 */

/**
 * @typedef {Object} SimplePolygon
 * @property {string} fill - For single-color maps, the fill color
 * @property {number} [fillOpacity=1] - The opacity of the fill color.
 * @property {string} [stroke='#000'] - The stroke color for the map features.
 * @property {number} [strokeWidth=0.5] - The width of the stroke for the map features.
 * @property {number} [strokeOpacity=1] - The opacity of the stroke for the map features.
 */

/**
 * @typedef {Object} ChoroplethPolygon
 * @property {'continuous' | 'categorical'} type - The type of choropleth map
 * @property {string} fillKey - For choropleth maps, the field to color by
 * @property {Array<any>} fillDomain - The domain for the color scale.
 * @property {Array<any>} fillRange - The range for the color scale.
 * @property {number} [fillOpacity=1] - The opacity of the fill color.
 * @property {string} [stroke='#000'] - The stroke color for the map features.
 * @property {number} [strokeWidth=0.5] - The width of the stroke for the map features.
 * @property {number} [strokeOpacity=1] - The opacity of the stroke for the map features.
 */

/**
 * @typedef {Object} SimpleLine
 * @property {string} [stroke='#000'] - The stroke color for the map features.
 * @property {number} [strokeWidth=2] - The width of the stroke for the map features.
 * @property {number} [strokeOpacity=1] - The opacity of the stroke.
 */

/**
 * @typedef {Object} ChoroplethLine
 * @property {'continuous' | 'categorical'} type - The type of choropleth map
 * @property {string} fillKey - For choropleth maps, the field to color by
 * @property {Array<any>} fillDomain - The domain for the color scale.
 * @property {Array<any>} fillRange - The range for the color scale.
 * @property {number} [strokeWidth=2] - The width of the stroke for the map features.
 * @property {number} [strokeOpacity=1] - The opacity of the stroke
 */

/**
 * @typedef {Object} SimplePoint
 * @property {string} fill - The fill color for the point features.
 * @property {number} [fillOpacity=1] - The opacity of the fill color.
 * @property {string} [stroke='#000'] - The stroke color for the point features.
 * @property {number} [strokeWidth=1] - The width of the stroke for the point features.
 * @property {number} [strokeOpacity=1] - The opacity of the stroke for the point features.
 * @property {number} [radius=5] - The radius for circle features.
 */

/**
 * @typedef {Object} ChoroplethPoint
 * @property {'continuous' | 'categorical'} type - The type of choropleth map
 * @property {string} fillKey - For choropleth maps, the field to color by
 * @property {Array<any>} fillDomain - The domain for the color scale.
 * @property {Array<any>} fillRange - The range for the color scale.
 * @property {number} [fillOpacity=1] - The opacity of the fill color.
 * @property {string} [stroke='#000'] - The stroke color for the point features.
 * @property {number} [strokeWidth=1] - The width of the stroke for the point features.
 * @property {number} [strokeOpacity=1] - The opacity of the stroke for the point features.
 * @property {number} [radius=5] - The radius for circle features.
 */

/**
 * @typedef {Object} SimpleDynamicPoint - a point with dynamic radius
 * @property {string} fill - The fill color for the point features.
 * @property {number} [fillOpacity=1] - The opacity of the fill color.
 * @property {string} [stroke='#000'] - The stroke color for the point features.
 * @property {number} [strokeWidth=1] - The width of the stroke for the point features.
 * @property {string} radiusKey - The key to use for the radius of the point features.
 * @property {Array<any>} radiusDomain - The domain for the color scale.
 * @property {Array<number>} radiusRange - The range for the color scale.
 */
/**
 * @typedef {Object} ChoroplethDynamicPoint - a point with dynamic radius
 * @property {'continuous' | 'categorical'} type - The type of choropleth map
 * @property {string} fillKey - For choropleth maps, the field to color by
 * @property {Array<any>} fillDomain - The domain for the color scale.
 * @property {Array<any>} fillRange - The range for the color scale.
 * @property {number} [fillOpacity=1] - The opacity of the fill color.
 * @property {string} [stroke='#000'] - The stroke color for the point features.
 * @property {number} [strokeWidth=1] - The width of the stroke for the point features.
 * @property {string} radiusKey - The key to use for the radius of the point features.
 * @property {Array<any>} radiusDomain - The domain for the color scale.
 * @property {Array<number>} radiusRange - The range for the color scale.
 */

/**
 * @typedef {{fixedAspectRatio: BaseStyleConfig['fixedAspectRatio'], projection: () => import('d3-geo').GeoProjection} & (SimplePolygon | ChoroplethPolygon)} PolygonConfig
 */

/**
 * @typedef {{fixedAspectRatio: BaseStyleConfig['fixedAspectRatio'], projection: () => import('d3-geo').GeoProjection} & (SimpleLine | ChoroplethLine)} LineConfig
 */
/**
 * @typedef {{fixedAspectRatio: BaseStyleConfig['fixedAspectRatio'], projection: () => import('d3-geo').GeoProjection} & (SimplePoint | ChoroplethPoint)} PointConfig
 */

export {};
