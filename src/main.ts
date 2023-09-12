// Основные типы - Unknown

// unknow более строгий чем any
// хорошо его использовать тогда, когда неизвестно, что будет в переменной (вместо any)

let input: unknown;

input = 3;
input = ['dsd', 345];

// тут ошибка, т.к. нужно сузить тип
// let res: string = input;

// сужение типов для unknown не работает, нужно каждый раз проверять тип переменной
function run(i: unknown) {
	if (typeof i == 'number') {
		i++;
	}
	else {
		i // тут i снова unknown
	}
}


// пример использования unknown
async function getData() {
	try {
		await fetch('');
	}
	catch (error) {
		// тут error имеет type unknown, т.е. нужно явно проверять каждый раз тип
		if (error instanceof Error) {
			console.log(error.message);
		}

		// или можно кастануть к типу, но соотв. в error может прийти что угодно, например
		// строка и тогда код выдаст ошибку типа.
		const e = error as Error;
		console.log(e.message);

	}
}

// union с unknown

type U1 = unknown | number; // при юнион типах - U1 всегда будет unknown

type T1 = unknown & string; // при intersection T1 всегда будет тип, которым расширяем, т.е. тут: T1 будет string