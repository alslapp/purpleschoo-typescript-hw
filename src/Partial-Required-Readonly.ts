export {};

// Служебные типы
// урок Partial, Required, Readonly

// ReturnType, Parameters, ConstructorParameters

class User {
	constructor(public id: number, public name: string) {}
}

function getData(id: number): User {
	return new User(id, 'Вася');
}

type RT = ReturnType<typeof getData>; // получаем тип, который возвращает функция

type PT = Parameters<typeof getData>; // получаем кортеж типов параметров функции
type first = PT[0]; // так можно получить тип первого параметра и последующих параметров, меняя индекс
type PTI = Parameters<typeof getData>[0]; // или сразу так получить тип первого параметра

type RT1 = ReturnType<() => void>; // void
type RT2 = ReturnType<<T>() => T>; //unknown - т.е. неизвестно, что будет передано в T
type RT3 = ReturnType<<T extends string>() => T>; // string - т.к. сузили тип

type CP = ConstructorParameters<typeof User>; // получили типы, которые нужно передать в конструктор класса User
type IT = InstanceType<typeof User>; // получает тип инстанса класса, т.е. это будет сам класс в виде типа

// Awaited

type A = Awaited<Promise<string>>; // получает тип, который возвращает промис

type A2 = Awaited<Promise<Promise<string>>>; // получает тип, который возвращает промис

/////////////////////////////////

interface IMenu {
	name: string;
	url: string;
}

async function getMenu(): Promise<IMenu[]> {
	return [{ name: 'Аналитика', url: 'analytics' }];
}

type R = Awaited<ReturnType<typeof getMenu>>;

/////////////////////////////////

async function getArray<T>(x: T): Promise<Awaited<T>[]> {
	return [await x];
}
