import { derived } from 'svelte/store';
import passives from '$lib/stores/passiveStore';
import saveData from '$lib/stores/saveStore';
import localization from '$lib/stores/localizationStore';
import type { PassiveWithSaveData } from '$lib/types/passive';

export default derived(
	[passives, saveData, localization],
	([$passives, $saveData, $localization]): PassiveWithSaveData[] | null => {
		if (!$passives || !$saveData) return null;

		return $passives.map((passive) => {
			const passiveData = $saveData.passives[passive.id];
			const localizationData = $localization?.localization[passive.id];

			return {
				...passive,
				...localizationData,
				obtained: !!passiveData,
				obtainedOn: passiveData
			};
		});
	}
);
