export { };
/*
Напишите Proxy, котора будет отправлять запросы через отдельный класс API на https://dummyjson.com/product/:id
если id продукта меньше 10 и возвращать ошибку, если больше.
*/

import { API, API_ERROR, PRODUCT_ID_MAX } from './constants';
import { MyFetch } from './my-fetch';
import { IProduct } from './types';

function isResHasProduct(res: IProduct): res is IProduct {
	return !!res && 'id' in res;
}

class DummyJsonApiProxy {
	private myFetch: MyFetch;

	constructor() {
		this.myFetch = new MyFetch();
	}

	async getProduct(id: number): Promise<IProduct> | never {
		if (id < PRODUCT_ID_MAX) {
			const res = await this.myFetch.url(`${API.PRODUCTS}/${id}`).get().exec().json();
			if (isResHasProduct(res)) {
				return res;
			} else {
				throw new Error(API_ERROR.BAD_REQUEST);
			}
		}
		throw new Error(API_ERROR.PRODUCT_ID_EXCEEDS);
	}
}
////////////////////////
const dummy = new DummyJsonApiProxy();

(async function () {
	const product = await dummy.getProduct(1);
	console.log('product', product);

	// ошибка
	await dummy.getProduct(10);
})();
