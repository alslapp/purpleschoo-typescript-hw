export enum DeliveryType {
	PVZ = 'PVZ',
	HOME = 'HOME',
}

export interface IProduct {
	id: number;
	name: string;
	price: number;
}

export interface IProductInCart extends IProduct {
	quantity: number;
}

export interface IDelivery {
	date: Date;
}

export interface IDeliveryPVZ extends IDelivery {
	type: DeliveryType.PVZ,
	pvzId: number;
}

export interface IDeliveryHOME extends IDelivery {
	type: DeliveryType.HOME,
	address: string;
}

export type TDelivery = IDeliveryPVZ | IDeliveryHOME;

export interface ICart {
	products: IProductInCart[];
	delivery: TDelivery | null;

	addProduct(product: IProduct, quantity?: number): void;
	deleteProduct(id: number): void;

	addDelivery(delivery: TDelivery): void;
	deleteDelivery(): void;

	get totalPrice(): number;
	get checkout(): boolean;
}
