export {};
// Порождающие паттерны
// Prototype - клонирование объекта

interface Prototype<T> {
	clone(): T;
}

class UserHistory implements Prototype<UserHistory> {
	createdAt: Date;

	constructor(public email: string, public name: string) {
		this.createdAt = new Date();
	}

	clone(): UserHistory {
		const target = new UserHistory(this.email, this.name);
		target.createdAt = new Date();
		return target;
	}
}

////////// Пример

const user = new UserHistory('test@test.ru', 'Алексей');
console.log(user);

const userClone = user.clone();
console.log(userClone);
