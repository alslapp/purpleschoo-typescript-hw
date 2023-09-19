// Generics
// Домашнее задание - Generics

type TObj = Record<string, number>;

const obj: TObj = {
	a: 1,
	b: 2,
};

function swapKeysAndValues<T extends TObj>(obj: T) {
	const res: Record<number, string> = {};
	Object.entries(obj).forEach(([key, value]) => {
		res[value] = key
	})
	return res;
}

const res = swapKeysAndValues<TObj>(obj);

console.log(res);
