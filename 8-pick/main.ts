/*
написать и типизировать:
функция принимает объект и массивы ключей, 
по которому нужно вывести новый объект, 
в котором содержатся указанные ключи
*/

interface IUser {
	name: string,
	age: number,
	skills: string[],
}

type TFields<T> = Array<keyof T>;

type TUserPartial<T> = {
	[K in keyof T]?: T[K];
}

const user = {
	name: 'Вася',
	age: 8,
	skills: ['typescript', 'javascript'],
}

function pickObjectKeys<T extends IUser>(data: T, keys: TFields<T>): TUserPartial<T> {
	const res: TUserPartial<T> = {};
	keys.forEach(key => res[key] = data[key]);
	return res;
}

const res = pickObjectKeys(user, ['name', 'age']);

console.log(res);
