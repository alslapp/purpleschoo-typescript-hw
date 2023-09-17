// Классы
// урок Работа с this

class Payment {
	private date: Date = new Date();

	getDate(this: Payment, test: string) { // this на первом месте - это фича TS - чтобы при потере контекста подсветить ошибку, в билде параметра this не будет

		console.log('getDate', test);

		return this.date;
	}

	getDateArrow = () => {
		// при таком определении метода ( именно через = "равно" !!! ) не нужно биндить контекст и передавать this в параметрах метода 
		// (если присваивать метод свойсту объекта например: user = { test: (new Payment().getDateArrow) } ),
		// т.к. такое создание метода не создает метод в прототипе, а создает его на лету, при инстанцировании класса, т.е. такая запись в райнтайме выглядите так:
		/*
			constructor() {
				this.getDateArrow = () => {
					console.log('getDateArrow');
					return this.date;
				};
			}
		*/
		console.log('getDateArrow');
		return this.date;
	}

}

const p = new Payment();

const user = {
	id: 1,
	paymentDate: p.getDate.bind(p),
	paymentDateArrow: p.getDateArrow
}

// console.log(p.getDate('1'));
// console.log(user.paymentDate('4'));
// console.log(user.paymentDateArrow());


class PaymentPersistent extends Payment {
	// save() {
	// 	return super.getDate('test');
	// }
	// saveThis() {
	// 	return this.getDate('test this');
	// }

	saveArrow() {
		return super.getDateArrow(); // super - так не работает, потому что super вызывает меторы из прототипа, 
		// а созданеие метода через = и стрелочную функцию не создают метод в прототипе, 
		// а создаю метод в конструкторе, при инстанцировании класса
	}

	saveArrowThis() {
		return this.getDateArrow(); // this - так работает
	}

}

const pp = new PaymentPersistent();
// console.log(pp.save());
// console.log(pp.saveArrow());
console.log(pp.saveArrowThis());
