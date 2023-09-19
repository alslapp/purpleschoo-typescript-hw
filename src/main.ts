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


///////////////////////////////////////////////////////////////////////////////////////////////////////
// урок Пишем функцию с generic

function logMiddleware<T>(data: T): T {
	console.log(data);
	return data;
}

const res = logMiddleware<number>(10);

function getSplitedHalf<T>(data: Array<T>): Array<T> { // ограничить тип дженерика
	const l = data.length / 2;
	return data.splice(0, l);
}

getSplitedHalf<number>([1, 2, 3]);

const split: <T>(data: Array<T>) => Array<T> = getSplitedHalf; // типизация функции getSplitedHalf


///////////////////////////////////////////////////////////////////////////////////////////////////////
// урок Использование в типах

interface ILogLine<T> {
	timestamp: Date;
	data: T;
}

type TLogLine<T> = {
	timestamp: Date;
	data: T;
};



const logLine: TLogLine<{ a: number; }> = {
	timestamp: new Date(),
	data: { // data может быть произвольным объектом
		a: 1,
	}
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
// урок Ограничение generic

// можно определить интерфейсы и передавать их как дженерик
// interface Vehicle {
// 	run: number;
// }
// interface LCV extends Vehicle {
// 	capacity: number;
// }

// или сразу класс и использовать как тип
class Vehicle {
	run: number;
}

function kmToMiles<T extends Vehicle>(vehicle: T): T {
	vehicle.run = vehicle.run / 0.62;
	return vehicle;
}

class LCV extends Vehicle {
	capacity: number;
}

const vehicle = kmToMiles(new Vehicle());
const lcv = kmToMiles(new LCV());
kmToMiles({ run: 1 }); // не обязательно передать именно инстанс соотв. класса, можно передать любой подходящий под тип объкт.

function logId<T extends string | number, Y>(id: T, additionalData: Y): { id: T, data: Y } {
	console.log(id)
	console.log(additionalData);

	return {
		id,
		data: additionalData,
	};
}

console.log(logId('data', { test: 333 }));
