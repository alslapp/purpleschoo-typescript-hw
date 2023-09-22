import 'reflect-metadata';

export { };

const POSITIVE_METADATA_KEY = Symbol('POSITIVE_METADATA_KEY');

// Декораторы
// Декоратор параметра + Метаданные

interface IUserService {
	getUsersInDataBase(): number;
}

class UserService implements IUserService {
	users: number;

	getUsersInDataBase(): number {
		return this.users;
	}

	@Validate()
	setUsersInDataBase(@Positive() num: number): void {
		this.users = num;
	}
}

function Positive() {
	return function (
		target: Object, // объект, к которому относится метод, или this
		propertyKey: string | symbol, // имя свойства - setUsersInDataBase
		parameterIndex: number, // индекс параметра в ...args[],
	) {
		console.log(Reflect.getOwnMetadata('design:type', target, propertyKey));
		console.log(Reflect.getOwnMetadata('design:paramtypes', target, propertyKey));
		console.log(Reflect.getOwnMetadata('design:returntype', target, propertyKey));

		const existParams: number[] = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey) || []; // проверка на всякий случай, вдруг там есть уже параметры из каких то других декораторов
		existParams.push(parameterIndex);

		Reflect.defineMetadata(POSITIVE_METADATA_KEY, existParams, target, propertyKey);
	};
}

function Validate() {
	return function (target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<(...args: any[]) => any>) {
		const method = descriptor.value;
		descriptor.value = function (...args: any) {
			const positiveParams: number[] = Reflect.getOwnMetadata(POSITIVE_METADATA_KEY, target, propertyKey) || [];
			if (positiveParams) {
				for (const index of positiveParams) {
					if (args[index] < 0) {
						throw new Error('Число должно быть больше 0');
					}
				}
			}
			return method?.apply(this, args);
		};
	};
}

const userService = new UserService();

console.log(userService.setUsersInDataBase(10));
console.log(userService.setUsersInDataBase(-1));
