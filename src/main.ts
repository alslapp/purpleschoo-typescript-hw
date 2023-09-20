// Манипуляция с типами
// Упражнение - Пишем функцию группировки

/*
Необходимо написать функцию группировки, которая принимает массив объектов
и его ключ, производит группировку по указанному ключу и возвращает
сгруппированный объект.

пример:

const obj = [
	{ group: 1, name: 'c', },
	{ group: 1, name: 'r', },
	{ group: 2, name: 't', },
	{ group: 3, name: 'y', },
	{ group: 4, name: 'u', },
];

При группировке по group:

{
	'1': [ { group: 1, name: 'c', }, { group: 1, name: 'r', },],
	'2': [ { group: 2, name: 't', }, ],
	'3': [ { group: 3, name: 'y', }, ],
	'4': [ { group: 4, name: 'u', }, ],
}


*/

interface IData {
	group: string | number;
	name: string | number;
}

const obj1: IData[] = [
	{ group: 1, name: 'c', },
	{ group: 1, name: 'r', },
	{ group: 2, name: 'r', },
	{ group: 3, name: 'c', },
	{ group: 4, name: 'u', },
];


interface IGroup<T> {
	[k: string]: T[];
}

type TKey = string | number | symbol;

function group<T extends Record<TKey, any>>(array: T[], key: keyof T): IGroup<T> {
	return array.reduce<IGroup<T>>((map: IGroup<T>, item: T) => {
		const itemKey = item[key];
		let curEl = map[itemKey];
		if (Array.isArray(curEl)) {
			curEl.push(item);
		}
		else {
			curEl = [item];
		}
		map[itemKey] = curEl;
		return map;
	}, {});
}

console.log(group(obj1, 'group'));
console.log(group(obj1, 'name'));
