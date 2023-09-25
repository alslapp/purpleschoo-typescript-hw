const API_BASE_URL = 'https://dummyjson.com/';

export const API = {
	PRODUCTS: API_BASE_URL + 'products',
};

export const PRODUCT_ID_MAX = 10;

export const API_ERROR = {
	PRODUCT_ID_EXCEEDS: `id продукта должен быть меньше ${PRODUCT_ID_MAX}`,
	BAD_REQUEST: 'BAD REQUEST',
};
