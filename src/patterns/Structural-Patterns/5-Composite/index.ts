export { };
// Структурные паттерны
// Composite

abstract class DeliveryItem {
	items: DeliveryItem[] = [];

	addItem(item: DeliveryItem) {
		this.items.push(item);
	}

	getItemPrices(): number {
		return this.items.reduce((acc: number, item: DeliveryItem) => (acc += item.getPrice()), 0);
	}

	abstract getPrice(): number;
}

// в каждом классе от DeliveryItem может быть еще и своя какая то логика:
class DeliveryShop extends DeliveryItem {
	constructor(private deliveryFee: number) {
		super();
	}

	getPrice(): number {
		return this.getItemPrices() + this.deliveryFee;
	}
}

class Package extends DeliveryItem {
	getPrice(): number {
		return this.getItemPrices();
	}
}

class Product extends DeliveryItem {
	constructor(private price: number) {
		super();
	}

	getPrice(): number {
		return this.price;
	}
}

//////////////////////////

const shop = new DeliveryShop(100); // создаем заказ и добавляем цену доставки
shop.addItem(new Product(1000)); // добавляем в заказ товар

const pack1 = new Package(); // создаем упаковку 1
pack1.addItem(new Product(200)); // в упаковку 1 добавляем товар 1
pack1.addItem(new Product(300)); // в упаковку 1 добавляем товар 2
shop.addItem(pack1); // добавляем упаковку в заказ

const pack2 = new Package(); // добавляем упаковку 2
pack2.addItem(new Product(30)); // в упаковку 2 добавляем товар 1
shop.addItem(pack2); // добавляем упаковку в заказ

console.log(shop.getPrice());
