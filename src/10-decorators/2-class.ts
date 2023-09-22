export { };

// Декораторы
// Декоратор класса

interface IUserService {
	users: number;
	getUsersInDataBase(): number;
}

// тут порядок не важен, т.к. nullUser записывает значение в прототип, а он инициализируется до инстанцирования класса
@nullUser
@threeUserAdvanced
class UserService implements IUserService {
	users: number;

	getUsersInDataBase(): number {
		return this.users;
	}
}

// декоратор: получаем объект, что-то с ним делаем и его же возвращаем.
function nullUser(target: Function) {
	target.prototype.users = 0;
}

function threeUserAdvanced<T extends { new(...args: any[]): {} }>(constructor: T) {
	return class extends constructor {
		users = 3;
	};
}

console.log(new UserService().getUsersInDataBase());
