// Generics
// Домашнее задание - Generics

// Нужно поменять местами ключи и значения в объекте

type TKey = string | number | symbol;
type TObj = Record<TKey, any>;

const obj: TObj = {
	a: 1,
	b: 2,
};

function swapKeysAndValues(obj: TObj): TObj {
	const res: TObj = {};
	Object.entries(obj).forEach(([key, value]) => {
		res[value] = key
	});
	return res;
}

const res = swapKeysAndValues(obj);

console.log(obj);
console.log(res);
