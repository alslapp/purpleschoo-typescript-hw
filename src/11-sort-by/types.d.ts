declare module 'sort-by' {
	export default function sortBy<T extends {}>(...args: Array<keyof T>): any;
}
