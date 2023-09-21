export {};

/*
 написать и типизировать:
 функция принимает объект и массивы ключей,
 по которому нужно вывести новый объект,
 в котором содержатся указанные ключи
 */

interface IUser {
	name: string;
	age: number;
	skills: string[];
}

type TUserPartial<T> = {
	[K in keyof T]?: T[K];
};

const user = {
	name: 'Вася',
	age: 8,
	skills: ['typescript', 'javascript'],
};

function pickObjectKeys<T extends IUser, K extends keyof T>(data: T, keys: Array<K>): TUserPartial<T> {
	const res: TUserPartial<T> = {};
	keys.forEach((key) => (res[key] = data[key]));
	return res;
}

const res = pickObjectKeys(user, ['name', 'age']);
console.log(res);

// решение от наставника
function pickObjectKeys2<T extends {}, K extends keyof T>(obj: T, keys: Array<K>): { [key in (typeof keys)[number]]: T[key] } {
	const res = {} as { [key in (typeof keys)[number]]: T[key] };
	for (const key of keys) {
		res[key] = obj[key];
	}
	return res;
}

const res2 = pickObjectKeys2(user, ['name', 'age']);
console.log(res2);
