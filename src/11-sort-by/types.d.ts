declare module 'sort-by' {
	export default function sortBy<T extends {}>(...args: Array<keyof T | ((key: string, value: any) => any)>): (a: T, b: T) => number;
}
