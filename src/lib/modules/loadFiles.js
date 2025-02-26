/**
 * @module loadFiles
 * @description Loads files from a list of URLs and returns their contents as an array of objects.
 * @param {string[]} filepaths - An array of URLs to fetch.
 * @returns {Promise<any[]>} A promise that resolves to an array of objects, each containing the contents of a file.
 */
export default async function loadFiles(filepaths) {
	const fetchPromises = filepaths.map((filepath) =>
		fetch(filepath).then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status} for ${filepath}`);
			}
			return response.json();
		})
	);

	return Promise.all(fetchPromises);
}
