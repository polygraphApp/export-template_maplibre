<script>
	import Maplibre from '$lib/Maplibre.svelte';
	import loadConfig from '$lib/modules/loadConfig.js';

	/** imports **/

	const config = loadConfig(/** layers **/);
</script>

<Maplibre {config} />
