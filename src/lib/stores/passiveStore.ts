import type Passive from '$lib/types/passive';
import type Skill from '$lib/types/skill';
import type { Writable } from 'svelte/store';
import localStorageStore from './localStorageStore';

function createPassives(): Writable<Passive[] | null> {
	return localStorageStore('passives', null);
}

const store = createPassives();

export async function parsePassives(file: File) {
	const text = await file.text();
	const values = JSON.parse(text) as Partial<Skill>[];

	const passiveList = values
		.filter((value): value is Partial<Skill> => !!value)
		.filter((value): value is Partial<Passive> => value?.stypeId === 7)
		.filter(
			(value): value is Passive =>
				!!value.name &&
				!value.note?.toLowerCase().includes('unused') &&
				!value.name.toLowerCase().includes('♥')
		)
		.map(({ id, name }): Passive => ({ id, name, stypeId: 7 }));

	store.set(passiveList);
}

export default store;
