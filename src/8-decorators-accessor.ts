export { };

// Декораторы
// Декоратор accessor

interface IUserService {
	getUsersInDataBase(): number;
}

class UserService implements IUserService {
	_users: number;

	// декоратор аксессора ставиться только на один аксессор - get или set - это неважно,
	// т.к. отработает и на get и на set
	@Log()
	set users(num: number) {
		this._users = num;
	}

	get users() {
		return this._users;
	}

	getUsersInDataBase(): number {
		throw new Error('Ошибка');
	}
}

function Log() {
	return function (
		target: Object, // объект, к которому относится метод, или this
		_: string | symbol, // имя свойства
		descriptor: PropertyDescriptor,
	) {
		const set = descriptor.set;
		descriptor.set = (...args: any) => {
			console.log(args);
			set?.apply(target, args);
		};
	};
}

const userService = new UserService();
userService.users = 1;
console.log(userService.users);
