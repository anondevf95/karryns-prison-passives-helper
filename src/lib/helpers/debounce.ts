export default function debounce<T extends (...args: any[]) => void>(handler: T, delay: number): T {
	let timer: any | null = null;
	const newHandler = (...args: Parameters<T>) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			handler(...args);
		}, delay);
	};

	return newHandler as any as T;
}
