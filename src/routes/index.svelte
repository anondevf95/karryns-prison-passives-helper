<script lang="ts">
	import PassiveCard from '$lib/components/PassiveCard.svelte';
	import DropzoneOverlay from '$lib/components/DropzoneOverlay.svelte';
	import passivesData, { parsePassives } from '$lib/stores/passiveStore';
	import saveData, { parseSaveData } from '$lib/stores/saveStore';
	import passiveWithSaveData from '$lib/stores/passiveWithSaveData';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import debounce from '$lib/helpers/debounce';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { parseLocalization } from '$lib/stores/localizationStore';
	import InfoDialog from '$lib/components/InfoDialog.svelte';

	let nameFilter = '';
	let showObtained = true;

	function handleFile(file: File) {
		if (file.name.match(/\.rpgsave$/)) {
			parseSaveData(file);
		} else if (file.name.match(/Skills\.json$/)) {
			parsePassives(file);
		} else if (file.name.match(/RemDesc\_.*\.json$/)) {
			parseLocalization(file);
		}
	}

	const handleNameFilterChange = debounce((ev: InputEvent) => {
		nameFilter = ev.target!.value;
	}, 300);

	const handleShowObtainedChange = debounce((ev: InputEvent) => {
		showObtained = ev.target!.checked;
	}, 0);

	$: filteredPassives =
		$passiveWithSaveData?.filter((passive) => {
			let matches = true;
			matches = matches && ((showObtained && passive.obtained) || !passive.obtained);
			matches = matches && passive.name.toLowerCase().includes(nameFilter.toLowerCase());
			return matches;
		}) ?? [];

	$: obtainedPassivesCount =
		$passiveWithSaveData?.filter((passive) => passive.obtained).length ?? 0;
	$: totalPassivesCount = $passiveWithSaveData?.length ?? 0;

	const progressPercentage = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	$: if (totalPassivesCount > 0) {
		$progressPercentage = obtainedPassivesCount / totalPassivesCount;
	}
</script>

{#if $passiveWithSaveData?.length}
	<div class="m-4 mb-10">
		<div class="flex justify-between">
			<span class="font-bold text-xl mb-2">Progress</span>
			<span class="text-sm font-medium text-purple-700 dark:text-white"
				>{obtainedPassivesCount} / {totalPassivesCount}</span
			>
		</div>
		<div class="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
			<div
				class="bg-purple-600 h-4 text-xs font-medium text-white text-center p-0.5 leading-none rounded-full"
				style:width={`calc(100% * ${$progressPercentage})`}
			>
				{Math.round($progressPercentage * 100)}%
			</div>
		</div>
	</div>

	<div class="m-4 mb-10">
		<div class="font-bold text-xl mb-2">Filters</div>
		<div class="max-w-md">
			<label class="block text-gray-700 text-sm font-bold mb-2">
				Name
				<input
					value={nameFilter}
					on:input={handleNameFilterChange}
					class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</label>
		</div>
		<div class="max-w-sm">
			<label class="block text-gray-700 text-sm font-bold mb-2">
				<input
					type="checkbox"
					checked={showObtained}
					on:input={handleShowObtainedChange}
					class="w-6 h-6 mr-1 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
				/>
				Show obtained
			</label>
		</div>
	</div>

	<div class="font-bold text-xl ml-4">Passives</div>
	<div class="card-grid m-4">
		{#each filteredPassives as passive (passive.id)}
			<div transition:fade={{ duration: 200 }} animate:flip={{ delay: 200, duration: 1000 }}>
				<PassiveCard
					name={passive.name}
					description={passive.description}
					obtained={passive.obtained}
					obtainedOn={passive.obtainedOn}
				/>
			</div>
		{/each}
	</div>
{:else}
	<div class="flex flex-col grow items-center justify-center">
		<div>
			Please drag and drop the save file (www/save/file1.rpgsave) ...
			{#if $saveData?.passives}
				✔️
			{:else}
				❌
			{/if}
		</div>
		<div>
			Please drag and drop the passive definition file (www/data/Skills.json) ...
			{#if $passivesData?.length}
				✔️
			{:else}
				❌
			{/if}
		</div>
	</div>
{/if}

<InfoDialog />
<DropzoneOverlay on:upload={(ev) => handleFile(ev.detail.file)} />

<style>
	.card-grid {
		@apply grid gap-4 content-center;
		grid-template-columns: repeat(auto-fill, minmax(24rem, 1fr));
	}
</style>
