export { };
// Структурные паттерны
// Chain of Command
// https://refactoring.guru/ru/design-patterns/chain-of-responsibility

interface IMiddleware {
	next(mid: IMiddleware): IMiddleware;
	handle(request: any): any;
}

abstract class AbstractMiddleware implements IMiddleware {
	private nextMiddleware: IMiddleware;

	next(mid: IMiddleware): IMiddleware {
		this.nextMiddleware = mid;
		return mid;
	}

	handle(request: any): any {
		if (this.nextMiddleware) {
			return this.nextMiddleware.handle(request);
		}
		return;
	}
}

/////////////////////

class AuthMiddleware extends AbstractMiddleware {
	override handle(request: any): any {
		console.log('AuthMiddleware');
		if (request.userId == 1) {
			return super.handle(request);
		}
		return { error: 'Вы не авторизованы' };
	}
}

class ValidateMiddleware extends AbstractMiddleware {
	override handle(request: any): any {
		console.log('ValidateMiddleware');
		if (request.body) {
			return super.handle(request);
		}
		return { error: 'Нет body' };
	}
}

class Controller extends AbstractMiddleware {
	override handle(request: any): any {
		console.log('Controller');
		return { success: request };
	}
}

////////////////////

const controller = new Controller();
const validate = new ValidateMiddleware();
const auth = new AuthMiddleware();

auth.next(validate).next(controller); // указываем последовательность вызовов, т.е. в next каждого экземпляра записываем, что выполнять после него.

// метод handle вызываем первым у того экземпляра, который должен идти первым и дальше методы сами вызывают друг друга по цепочке, передавая данные
console.log(auth.handle({ userId: 1, body: 'test body' }));
