export { };

// Декораторы
// TypeScript 5.0 - декораторы и const T

// "experimentalDecorators": true,
// "emitDecoratorMetadata": true, - для новых декораторов нужно закомментировать эти свойства
// старые и новые декораторы несовместимы.

// enum Role {
// 	Admin,
// 	User,
// }

// function testRole(role: Role) { }

// // можно обращаться только к индексам, которые реально есть в enum

// testRole(0);
// testRole(1);
// // testRole(11); // - ошибка

// ///////////////////////////////////////

// class Flight<const T> {
// 	// указать const для типа, который мы передаем в конструктор
// 	constructor(private dest: T[]) { }

// 	@Test
// 	fly(to: T): void {
// 		console.log('fly, to: ', to);
// 	}
// }

// const flight = new Flight(['RU', 'GB']);
// flight.fly('GB');

// ///////////////////////////////////////
// // декораторы

// function Test<This, Args extends any[], Return>(
// 	target: (this: This, ...args: Args) => Return,
// 	// или вместо (this: This, ...args: Args) => Return можно записать: typeof target
// 	context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>, // это параметры метода - имя, статик или нет и т.п.
// ) {
// 	// логика
// 	console.log('before');

// 	return function (this: This, ...args: Args) {
// 		// логика
// 		console.log('Начало');
// 		console.log('args', args);
// 		const res = target.call(this, ...args);

// 		console.log('Конец');
// 		// логика
// 		return res;
// 	};
// }
