export { };

// Декораторы
// Декоратор метода

interface IUserService {
	users: number;
	getUsersInDataBase(): number;
}

class UserService implements IUserService {
	users: number = 1000;

	@Log
	getUsersInDataBase(): number {
		throw new Error('Ошибка');
	}
}

function Log(
	target: Object, // объект, к которому относится метод
	propertyKey: string | symbol, // имя метода
	descriptor: TypedPropertyDescriptor<(...args: any[]) => any>, //
): TypedPropertyDescriptor<(...args: any[]) => any> | void {
	/*

	https://learn.javascript.ru/property-descriptors

	descriptor {
	
	value - сам метод или свойство,

	writable – если true, свойство можно изменить, иначе оно только для чтения.
	enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
	configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.
	}
	*/

	console.log('target', target);
	console.log('propertyKey', propertyKey);
	console.log('descriptor', descriptor);

	const oldValue = descriptor.value;

	descriptor.value = () => {
		console.log('no error'); // сделать что нужно
		if (oldValue) oldValue(); // потом можно вызвать старую функцию
	};
}

console.log(new UserService().getUsersInDataBase());
