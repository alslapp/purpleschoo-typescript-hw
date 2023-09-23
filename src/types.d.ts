declare module 'really-relaxed-json' {
	export function toJson(rjsonString: string, compact?: boolean): string;
	export function toRJson(jsonString: string, compact?: boolean): string;
	export function toJs(rjsonString: string, compact?: boolean): string;
}
