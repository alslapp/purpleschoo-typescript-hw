export { };

// Декораторы
// Упражнение - Декоратор CreatedAt

interface IUserService {
	users: number;
	getUsersInDataBase(): number;
}

@CreatedAt
class UserService implements IUserService {
	users: number = 1000;

	getUsersInDataBase(): number {
		return this.users;
	}
}

function CreatedAt<T extends { new(...args: any[]): {} }>(constructor: T) {
	console.log('CreatedAt run');
	return class extends constructor {
		createdAt = new Date();
	};
}

interface TCreatedAt {
	createdAt: Date;
}

console.log((new UserService() as IUserService & TCreatedAt).createdAt);
