declare module 'sort-by' {
	export default function sortBy<T>(
		...args: Array<keyof T | ((key: string, value: any) => any)>
	): (a: T, b: T) => number;
}
