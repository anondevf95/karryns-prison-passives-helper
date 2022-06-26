import type Save from '$lib/types/save';
import type { Writable } from 'svelte/store';
import localStorageStore from './localStorageStore';
import LZString from 'lz-string';

function createSaveStore(): Writable<Save | null> {
	return localStorageStore('save', null);
}

const store = createSaveStore();

export async function parseSaveData(file: File) {
	const text = await file.text();
	const result = LZString.decompressFromBase64(text);
	const saveData = JSON.parse(result!);

	const characterId = saveData['@c'] as any;
	const actors = saveData['actors']?.['_data']?.['@a'] as any[];
	const passiveData = actors.find((actor) => actor?._actorId === characterId)?.[
		'_passivesObtainedOn_keySkillID_valueDate'
	]?.['@a'] as any[];

	store.set({
		passives: Object.fromEntries(passiveData.entries())
	});
}

export default store;
