// Классы
// урок Статические свойства

class UserService {

	// static name: string = 'name' //статическое свойство name нельзя определить, т.к. оно существует под капотом класса
	// можно определить только обычное свойство name

	static db: any;

	static getUser() {
		return this.db.findById(); // или вместо UserService. можно использовать this.
	}

	constructor(id: number) {

	}

	create() {
		UserService.db;
	}

	// это что то типа constructor только для статического выполнения
	// можно использовать только синхронные вызовы
	static {
		UserService.db = {
			findById: (): void => { }
		}
	}

}

UserService.db;

const inst = new UserService();
inst.create();