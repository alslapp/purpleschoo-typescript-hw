// Generics
// Домашнее задание - Generics

// Нужно поменять местами ключи и значения в объекте

type TObj = Record<string, number>;
type TObjSwap = Record<number, string>;

const obj: TObj = {
	a: 1,
	b: 2,
};

function swapKeysAndValues<T extends TObj, S extends TObjSwap>(obj: T): S {
	const res = <S>{};
	Object.entries(obj).forEach(([key, value]) => {
		res[value] = key
	})
	return res;
}

const res = swapKeysAndValues(obj);

console.log(res);
