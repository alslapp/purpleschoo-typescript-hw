// Классы
// Упражнение - Делаем корзину товаров

import { ERROR_CART_CHECKOUT } from './constants';

class Delivery {
	constructor(
		public date: Date,
	) { }
}

class DeliveryShop extends Delivery {
	constructor(
		public shopId: number,
	) {
		super(new Date());
	}
}

class DeliveryHome extends Delivery {
	constructor(
		public address: string,
		date: Date,
	) {
		super(date);
	}
}

export type TDelivery = DeliveryShop | DeliveryHome;

export interface ICheckoutSuccess {
	success: boolean;
};

class Product {

	constructor(
		public id: number,
		public name: string,
		public price: number,
		public quantity: number = 1,
	) { }

}

class Cart {
	private products: Product[] = [];
	private delivery: TDelivery;

	addProduct({ id, ...product }: Product, quantity = 1): void {
		const index = this.products.findIndex(p => p.id === id);
		if (index !== -1) {
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
		this.products = this.products.filter((p: Product) => p.id !== id);
	}

	addDelivery(delivery: TDelivery): void {
		this.delivery = delivery;
	}

	checkOut(): never | ICheckoutSuccess {

		if (this.products.length === 0) {
			throw new Error(ERROR_CART_CHECKOUT.PRODUCTS);
		}
		else if (!!!this.delivery) {
			throw new Error(ERROR_CART_CHECKOUT.DELIVERY);
		}
		return {
			success: true,
		}
	}

	get totalPrice(): number {
		return this.products
			.map((p: Product) => (p.price * p.quantity))
			.reduce((sum: number, priceProd: number) => (sum + priceProd));
	}

}





////////////////////////////////////////////////

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

cart.addDelivery(new DeliveryShop(1));

console.log(cart);
console.log('checkout 2', cart.checkOut());

cart.addDelivery(new DeliveryHome('Москва', new Date()));

console.log('checkout 4', cart.checkOut());

console.log(cart);
