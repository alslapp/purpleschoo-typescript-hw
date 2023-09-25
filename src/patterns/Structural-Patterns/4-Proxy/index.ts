export { };
// Структурные паттерны
// Proxy

interface IPaymentDetail {
	id: number;
	sum: number;
}

interface IPaymentAPI {
	getPaymentdetails(id: number): IPaymentDetail | undefined;
}

class PaymentAPI implements IPaymentAPI {
	private data = [{ id: 1, sum: 10000 }];
	getPaymentdetails(id: number): IPaymentDetail | undefined {
		return this.data.find((d) => d.id === id);
	}
}

// класс, который делает какие то проверки/действия и вызывает методы нужного класса

class PaymentAccessProxy implements IPaymentAPI {
	constructor(private api: PaymentAPI, private userId: number) { }

	getPaymentdetails(id: number): IPaymentDetail | undefined {
		if (this.userId === 1) {
			return this.api.getPaymentdetails(id);
		}
		console.log('Попытка получить данные платежа!!!');
		return undefined;
	}
}

const proxy = new PaymentAccessProxy(new PaymentAPI(), 1);
console.log(proxy.getPaymentdetails(1));

const proxy2 = new PaymentAccessProxy(new PaymentAPI(), 2);
console.log(proxy2.getPaymentdetails(1));
