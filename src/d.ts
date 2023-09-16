interface IProduct {
	id: number;
	name: string;
	price: number;
}

interface IProductInCart extends IProduct {
	quantity: number;
}

enum DeliveryType {
	PVZ = 'PVZ',
	HOME = 'HOME',
}

interface IDelivery {
	date: Date;
}

interface IDeliveryPVZ extends IDelivery {
	type: DeliveryType.PVZ,
	pvzId: number;
}

interface IDeliveryHOME extends IDelivery {
	type: DeliveryType.HOME,
	address: string;
}

type TDelivery = IDeliveryPVZ | IDeliveryHOME;

interface ICart {
	products: IProductInCart[];
	delivery: TDelivery | null;

	addProduct(product: IProduct, quantity?: number): void;
	deleteProduct(id: number): void;

	addDelivery(delivery: TDelivery): void;
	deleteDelivery(): void;

	get totalPrice(): number;
	get checkout(): boolean;
}
