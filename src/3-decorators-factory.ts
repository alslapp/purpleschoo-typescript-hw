export { };

// Декораторы
// Фабрика декораторов

interface IUserService {
	users: number;
	getUsersInDataBase(): number;
}

// порядок:
// декоратор - функция - то изменения происходят в прототипе! функции (т.е. до инстанцирования класса), потом класс инстанцируется и может перезаписать начальными значениями все изменения, которые внес декоратор
// декоратор - конструктор - изменения выполняются после инстанцирования (в экземпляре) и выполняются снизу вверх
// декоратор - фабрика - функции обертки выполняются сверху вниз, а декораторы, которые возвращают эти функции соотв. снизу вверх, т.к. их уже запускает TS

// @nullUser
@setUsers(2)
@setUserAdvanced(4)
// @threeUserAdvanced
class UserService implements IUserService {
	users: number;

	getUsersInDataBase(): number {
		return this.users;
	}
}

// декоратор: получаем объект, что - то с ним делаем и его же возвращаем.
function nullUser(target: Function) {
	console.log('nullUser');
	target.prototype.users = 0;
}

function setUsers(users: number) {
	console.log('setUsers init');
	return (target: Function) => {
		console.log('setUsers run');
		target.prototype.users = users;
	};
}

function threeUserAdvanced<T extends { new(...args: any[]): {} }>(constructor: T) {
	console.log('threeUserAdvanced init');
	return class extends constructor {
		users = 3;
	};
}

function setUserAdvanced(users: number) {
	console.log('setUserAdvanced init');
	return <T extends { new(...args: any[]): {} }>(constructor: T) => {
		console.log('setUserAdvanced run');
		return class extends constructor {
			users = users;
		};
	};
}

console.log(new UserService().getUsersInDataBase());
