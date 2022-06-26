import { writable, type Updater } from 'svelte/store';
import { browser } from '$app/env';

export default function localStorageStore<T>(key: string, value: T) {
	const storageValue = browser ? localStorage.getItem(key) : null;
	// TODO: Fix type safety here?
	const actualValue = storageValue ? (JSON.parse(storageValue) as T) : value;

	const { update, set, subscribe } = writable(actualValue);

	return {
		update: (updater: Updater<T>) => {
			update((value: T) => {
				const newValue = updater(value);
				if (browser) {
					localStorage.setItem(key, JSON.stringify(newValue));
				}
				return newValue;
			});
		},
		set: (value: T) => {
			if (browser) {
				localStorage.setItem(key, JSON.stringify(value));
			}
			set(value);
		},
		subscribe
	};
}
