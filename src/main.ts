// Классы
// урок Типизация this

class UserBuilder {
	name: string;

	setName(name: string): this {
		this.name = name;
		return this;
	}

	isAdmin(): this is AdminBuilder {
		return this instanceof AdminBuilder;
	}

}

class AdminBuilder extends UserBuilder {
	roles: string[] = ['user', 'admin']; // если у классов не будет разных методов или свойств, то в рантайме невозможно будет отличить UserBuilder от AdminBuilder и type guard определит тип как: let user: UserBuilder | AdminBuilder;
}

const res = new UserBuilder().setName('вася');
const res2 = new AdminBuilder().setName('вася');

let user: UserBuilder | AdminBuilder = new UserBuilder();

if (user.isAdmin()) {
	console.log(user);
}
else {
	console.log(user);
}
