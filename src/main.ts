// Классы
// Упражнение - Делаем корзину товаров

import { ERROR_CART_CHECKOUT } from './constants';
import { IProduct, ICart, IProductInCart, DeliveryType, TDelivery, ICheckoutSuccess } from './types';

class Product implements IProduct {

	constructor(
		public id: number,
		public name: string,
		public price: number,
	) { }

}


class Cart implements ICart {
	private products: IProductInCart[] = [];
	private delivery: TDelivery | null = null;

	addProduct({ id, ...product }: IProduct, quantity = 1): void {

		const index = this.products.findIndex(p => p.id === id);

		// почему в строках ниже this.products[index] выдает ошибку: Object is possibly 'undefined'
		// if (this.products[index]) {
		// 	const prod = this.products[index];	
		// 	// if (prod) this.products[index].quantity = quantity; // -  ошибка
		// 	// if (this.products[index]) this.products[index].quantity = quantity; // - ошибка
		// 	if (prod) prod.quantity = quantity; // - так работает
		// }

		// что я делаю не так?

		if (index !== -1) {
			// т.е. почему то нужно обязательно this.products[index] присвоить в отдельную переменную
			const prod = this.products[index];
			if (prod) prod.quantity += quantity;
		}
		else {
			this.products.push({
				id,
				...product,
				quantity,
			});
		}
	}

	deleteProduct(id: number): void {
		if (typeof id !== 'number' || id < 1) return;
		this.products = this.products.filter(p => p.id !== id);
	}

	addDelivery(delivery: TDelivery): void {
		this.delivery = delivery;
	}

	addDeliveryPvz(pvzId: number, date: Date): void {
		this.delivery = {
			type: DeliveryType.PVZ,
			date,
			pvzId,
		};
	}

	addDeliveryHome(address: string): void {
		this.delivery = {
			type: DeliveryType.HOME,
			address,
			date: new Date(),
		};
	}

	deleteDelivery(): void {
		this.delivery = null;
	}

	checkOut(): never | ICheckoutSuccess {
		if (this.products.length === 0) {
			throw new Error(ERROR_CART_CHECKOUT.PRODUCTS);
		}
		else if (!!this.delivery) {
			throw new Error(ERROR_CART_CHECKOUT.DELIVERY);
		}
		return {
			success: true,
		}
	}

	get totalPrice(): number {
		return this.products
			.map((p: IProductInCart) => (p.price * p.quantity))
			.reduce((sum: number, priceProd: number) => (sum + priceProd));
	}



}

const cart = new Cart();

const product1 = new Product(1, 'Телефон', 15000);
const product2 = new Product(2, 'Наушники', 3500);
const product3 = new Product(3, 'Часы', 11500);

cart.addProduct(product1);
cart.addProduct(product1);
cart.addProduct(product1);
cart.addProduct(product1);

cart.addProduct(product2, 2);
cart.addProduct(product2);

cart.addProduct(product3, 5);

console.log(cart);

cart.deleteProduct(product3.id);



console.log(cart);
console.log('totalPrice', cart.totalPrice);
console.log('checkout 1', cart.checkout);



cart.addDeliveryPvz(1, new Date())



console.log(cart);
console.log('checkout 2', cart.checkout);

cart.deleteDelivery();

console.log('checkout 3', cart.checkout);

cart.addDeliveryHome('Москва')

console.log('checkout 4', cart.checkout);

console.log(cart);
