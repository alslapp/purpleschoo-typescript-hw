export { };

// 10-allow-func

// Декораторы
// Домашнее задание - Декораторы

/*
Написать декоратор, который при присвоении value property проверяет присваиваемое значение функцией.
Если она возвращает true - присваивание происходит, если false - то нет.
*/

class User {
	@allowFunc((a: number) => a > 0)
	age: number = 30;
}

function allowFunc(fn: Function) {
	return function (
		target: Object,
		propertyKey: string,
	) {
		let value: number;
		const setter = function (newVal: number) {
			if (fn) {
				const res = fn?.apply(target, [newVal]);
				if (res) {
					value = newVal;
				} else {
					console.log(`Результат работы декоратора: ${res}, поэтому не произошло присвоения нового value`);
				}
			} else {
				throw new Error('Не указан параметр декоратора: fn');
			}
		};
		const getter = function () {
			return value;
		};

		Object.defineProperty(target, propertyKey, {
			set: setter,
			get: getter,
		});
	};
}

const user = new User();
console.log('age 1', user.age);

user.age = 0;
console.log('age 2', user.age);

user.age = 20;
console.log('age 3', user.age);
