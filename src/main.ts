// Продвинутые типы: Упражнение - Делаем typeguard ответа

interface IPayment {
	sum: number;
	from: number;
	to: number;
}

enum PaymentStatus {
	Success = 'success',
	Failed = 'failed',
}

interface IPaymentRequest extends IPayment { }

interface IDataSuccess extends IPayment {
	databaseId: number;
}

interface IDataFailed {
	errorMessage: string;
	errorCode: number;
}

interface IResponseSuccess {
	status: PaymentStatus.Success;
	data: IDataSuccess;
}

interface IResponseFailed {
	status: PaymentStatus.Failed;
	data: IDataFailed;
}

type TRes = IResponseSuccess | IResponseFailed;

type f = (res: TRes) => number;


// typeguard для проверки ответа на success
function isResponseSuccess(res: TRes): res is IResponseSuccess {
	return res.status === PaymentStatus.Success;
}


const getDatabaseId: f = (res: TRes): number => {
	if (isResponseSuccess(res)) {
		return res.data.databaseId;
	}
	else {
		throw new Error(res.data.errorMessage);
	}
}

