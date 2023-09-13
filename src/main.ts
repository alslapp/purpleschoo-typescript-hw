// Классы
// урок 2
// class User {
// 	name!: string; // ! - обозначить для ts, что я понимаю, что делаю, чтобы убрать ошибку, если strictPropertyInitialization стоит в true
// }

// const user = new User();
// user.name = 'Вася';
// console.log({
// 	user,
// });

//////////////////////////////////////
// урок 3 Конструктор
// перегрузка конструктора
// перегрузки нужно прописывать только для ide, чтобы подсвечивались эти самые перегрузки, в рантайме их нет

// class User {
// 	name: string;
// 	age: number;

// 	constructor();
// 	constructor(age: number);
// 	constructor(name: string);
// 	constructor(name: string, age: number);

// 	// последний конструктор должен удовлетворять всем перегрузкам
// 	constructor(ageOrname?: string | number, age?: number) {
// 		if (typeof ageOrname === 'string') {
// 			this.name = ageOrname;
// 		} else if (typeof ageOrname === 'number') {
// 			this.age = ageOrname;
// 		}

// 		if (typeof age === 'number') {
// 			this.age = age;
// 		}
// 	}
// }

// const user = new User('Вася');
// const user2 = new User();
// const user3 = new User(35);
// const user4 = new User('Вася', 35);
// console.log({
// 	user,
// 	user2,
// 	user3,
// 	user4,
// });

//////////////////////////////////////
// урок 4 Методы класса

// enum PaymentStatus {
// 	Holded, // деньги забронированы, но не списаны
// 	Processed, // деньги списаны
// 	Reversed, // Holded отменяем, т.е. деньги на счету разблокируются
// }

// class Payment {
// 	id: number;
// 	status: PaymentStatus = PaymentStatus.Holded;
// 	createdAt: Date = new Date();
// 	updatedAt: Date;

// 	constructor(id: number) {
// 		this.id = id;
// 	}

// 	getPaymentLifeTime(): number {
// 		return new Date().getTime() - this.createdAt.getTime();
// 	}

// 	unHoldPayment(): void {
// 		if (this.status == PaymentStatus.Processed) {
// 			throw new Error('Платёж не может быть возвращён');
// 		}
// 		this.status = PaymentStatus.Reversed;
// 		this.updatedAt = new Date();
// 	}
// }

// const payment = new Payment(1);

// payment.unHoldPayment();
// console.log(payment);

// const time = payment.getPaymentLifeTime();
// console.log(time);
