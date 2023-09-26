export { };
// Структурные паттерны
// strategy

// https://refactoring.guru/ru/design-patterns/strategy

class User {
	gutHubToken: string;
	jwtToken: string;
}

interface IAuthStrategy {
	auth(user: User): boolean;
}

class Auth {
	constructor(private strategy: IAuthStrategy) { }

	setStrategy(strategy: IAuthStrategy) {
		this.strategy = strategy;
	}

	public authUser(user: User): boolean {
		return this.strategy.auth(user);
	}
}

class JWTStrategy implements IAuthStrategy {
	auth(user: User): boolean {
		if (user.jwtToken) {
			return true;
		}
		return false;
	}
}

class GitHubStrategy implements IAuthStrategy {
	auth(user: User): boolean {
		if (user.gutHubToken) {
			return true;
		}
		return false;
	}
}

/////////////

const user = new User();
user.jwtToken = 'token';

const auth = new Auth(new JWTStrategy());
console.log('JWTStrategy', auth.authUser(user));

auth.setStrategy(new GitHubStrategy())
console.log('GitHubStrategy', auth.authUser(user));