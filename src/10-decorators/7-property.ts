export { };

// Декораторы
// Декоратор свойства

interface IUserService {
	users: number;
	getUsersInDataBase(): number;
}

class UserService implements IUserService {
	@Max(100)
	users: number = 1000;

	getUsersInDataBase(): number {
		throw new Error('Ошибка');
	}
}

function Max(max: number) {
	return function (
		target: Object, // объект, к которому относится метод, или this
		propertyKey: string, // имя свойства
	) {
		let value: number;
		const setter = function (newVal: number) {
			if (newVal > max) {
				console.log(`Нельзя установить значение больше ${max}`);
			} else {
				value = newVal;
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

const userService = new UserService();
userService.users = 1;
console.log('1: ', userService.users);

userService.users = 1000;
console.log('2: ', userService.users);

userService.users = 50;
console.log('3: ', userService.users);
