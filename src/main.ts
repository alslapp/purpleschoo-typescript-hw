enum PaymentStatus {
	SUCCESS = 'success',
	FAILED = 'failed',
}

interface IPayment {
	sum: number;
	from: number;
	to: number;
}

interface IResponseData extends IPayment {
	databaseId: number;
}

interface IResponseSuccess {
	status: PaymentStatus.SUCCESS,
	data: IResponseData;
}

interface IResponseFailed {
	status: PaymentStatus.FAILED,
	data: {
		errorMessage: string,
		errorCode: number;
	}
}


const getServerData = async (payment: IPayment): Promise<IResponseSuccess | IResponseFailed> => {
	const res = await fetch(`/api/get/data`, {
		method: 'GET',
		body: JSON.stringify(payment),
	});
	return await res.json();
}


// Запрос в виде платежа
const payment: IPayment = {
	sum: 10000,
	from: 2,
	to: 4,
};

(async () => {
	const data = await getServerData(payment);
	console.log(`Ответ от сервера: `, data);
})();
