export { };

// Декораторы
// Упражнение - Декоратор перехвата ошибок

interface IUserService {
	users: number;
	getUsersInDataBase(): number;
}

class UserService implements IUserService {
	users: number = 1000;

	// по причине того, что не показываются типы аргументов, лучше сделать параметры в виде объекта
	@Catch({ rethrow: false })
	getUsersInDataBase(): number {
		throw new Error('Ошибка 403');
	}
}

// reThrow - проброс ошибки выше
function Catch({ rethrow }: { rethrow: boolean } = { rethrow: true }) {
	console.log(1);

	return function (
		target: Object, // экземпляр, к которому относится метод, т.е. это this
		_: string | symbol, // propertyKey - имя метода, в ts есил использовать _ то он не будет ругаться на неиспользуемую переменную
		descriptor: TypedPropertyDescriptor<(...args: any[]) => any>, //
	): TypedPropertyDescriptor<(...args: any[]) => any> | void {
		const method = descriptor.value;

		descriptor.value = async (...args: any[]) => {
			// async - из за этого будет возврат промиса, лучше делать Catch и CatchAsync, чтобы не ломались типы
			if (method) {
				try {
					return await method(target, args);
				} catch (error) {
					if (error instanceof Error) {
						console.log('Новая ошибка: ', error.message);
						if (rethrow) throw error;
					}
				}
			}
		};
	};
}

console.log(new UserService().getUsersInDataBase());
