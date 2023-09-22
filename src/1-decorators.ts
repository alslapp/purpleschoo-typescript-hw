export { };
// Декораторы
// Паттерн декоратора

interface IUserService {
	users: number;
	getUsersInDataBase(): number;
}

class UserService implements IUserService {
	users: number = 1000;

	getUsersInDataBase(): number {
		return this.users;
	}
}

// декоратор: получаем объект, что-то с ним делаем и его же возвращаем.
function nullUser(obj: IUserService) {
	obj.users = 0;
	// ...
	return obj;
}

function logUsers(obj: IUserService) {
	console.log('users: ', obj.users);
	return obj;
}

console.log(new UserService().getUsersInDataBase());
console.log(nullUser(new UserService()).getUsersInDataBase());
console.log(logUsers(nullUser(new UserService())).getUsersInDataBase());
console.log(nullUser(logUsers(new UserService())).getUsersInDataBase());
