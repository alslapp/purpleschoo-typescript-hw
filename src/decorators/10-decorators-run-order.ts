import 'reflect-metadata';

export { };

// Декораторы
// Декоратор Порядок декораторов

function Uni(name: string): any {
	console.log(`Инициализация: ${name}`);
	return function () {
		console.log(`Вызов: ${name}`);
	};
}
@Uni('Класс')
class MyClass {
	@Uni('Свойство 3')
	prop2?: any;

	@Uni('Свойство 1')
	prop?: any;

	@Uni('Свойство static')
	static prop2?: any;

	@Uni('Метод')
	method(@Uni('Параметр метода') _: any) { }

	@Uni('Метод static')
	static method2(@Uni('Параметр метода static') _: any) { }

	constructor(@Uni('Параметр конструктора') _: any) { }
}
