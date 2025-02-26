/**
 * Merges two geographic bounding boxes into a single bounding box that encompasses both.
 *
 * @param {Array<number>|null|undefined} bounds1 - First bounding box in format [minX, minY, maxX, maxY]
 * @param {Array<number>|null|undefined} bounds2 - Second bounding box in format [minX, minY, maxX, maxY]
 * @returns {Array<number>} Merged bounding box in format [minX, minY, maxX, maxY]
 * @throws {Error} When both bounds are invalid
 */
export default function mergeBounds(bounds1, bounds2) {
	// Handle cases where one or both bounds are missing
	if (!bounds1 && !bounds2) {
		throw new Error('At least one valid bounds array is required');
	}
	if (!bounds1) return bounds2 || [0, 0, 0, 0]; // Default to [0, 0, 0, 0] if bounds2 is also null
	if (!bounds2) return bounds1;

	// Extract coordinates from both bounds
	const [minX1, minY1, maxX1, maxY1] = bounds1;
	const [minX2, minY2, maxX2, maxY2] = bounds2;

	// Create new bounds with min/max values from both
	return [
		Math.min(minX1, minX2), // minX
		Math.min(minY1, minY2), // minY
		Math.max(maxX1, maxX2), // maxX
		Math.max(maxY1, maxY2) // maxY
	];
}
