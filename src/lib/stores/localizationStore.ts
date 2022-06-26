import type { LocalizationItem } from '$lib/types/localization';
import type Localization from '$lib/types/localization';
import type { Writable } from 'svelte/store';
import localStorageStore from './localStorageStore';

function createLocalization(): Writable<Localization | null> {
	return localStorageStore('localization', null);
}

const store = createLocalization();

export async function parseLocalization(file: File) {
	const text = await file.text();
	const json = JSON.parse(text);

	const passiveLocalizations = Object.entries(json).filter(([key]) => key.startsWith('skill_')) as [
		string,
		string
	][];

	const passiveNames = passiveLocalizations
		.filter(([key]) => key.includes('name'))
		.map(([key, value]) => [key.split('_')[1], value?.text?.[0]]);

	const passiveDescs = Object.fromEntries(
		passiveLocalizations
			.filter(([key]) => key.includes('desc'))
			.map(([key, value]) => [key.split('_')[1], value?.text?.[0]])
	);

	const localizationPairs = passiveNames.map(([key, value]): [string, LocalizationItem] => {
		const desc = passiveDescs[key];
		return [
			key,
			{
				name: value?.replaceAll('\\}', '')?.replaceAll('\\{', ''),
				description: desc?.replaceAll('\\}', '')?.replaceAll('\\{', '')
			}
		];
	});

	const localization = Object.fromEntries(localizationPairs);
	store.set({
		localization
	});
}

export default store;
