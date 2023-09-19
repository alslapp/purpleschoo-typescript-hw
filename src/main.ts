// Generics
// урок Пример встроенных generic

const num: Array<number> = [1, 2, 3];


async function test() {
	const a = await new Promise<number>((resolve, reject) => { // в дженерике промиса указываем возвращаемый тип данных
		resolve(1)
	});
}


const check: Record<string, boolean> = { // указываем тип ключа и значения
	drive: true,
	kpp: false,
}


function logMiddleware<T>(data: T): T {
	console.log(data);
	return data;
}

const res = logMiddleware<number>(10);




function getSplitedHalf<T>(data: Array<T>): Array<T> { // ограничить тип дженерика
	const l = data.length / 2;
	return data.splice(0, l);
}