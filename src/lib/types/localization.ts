export interface LocalizationItem {
	name?: string;
	description?: string;
}

export default interface Localization {
	localization: Record<number, LocalizationItem>;
}
