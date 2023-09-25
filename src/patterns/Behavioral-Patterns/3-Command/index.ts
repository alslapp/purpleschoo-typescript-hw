export { };
// Структурные паттерны
// Command
// https://refactoring.guru/ru/design-patterns/command

class User {
	constructor(public userId: number) { }
}

class UserService {
	saveUser(user: User) {
		console.log(`Сохраняю пользователя с id ${user.userId}`);
	}

	deleteUser(user: User) {
		console.log(`Удаляю пользователя с id ${user.userId}`);
	}
}
