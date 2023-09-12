// Основные типы - Never

// #1
// тут использовать void некорректно, т.к. эта функция никогда
// ничего не вернет, а void подразумевает, что может вернуться что угодно, 
// но будет проигнорировано
function generateError(message: string): never {
	throw new Error(message);
}

// #2
// функция никогда не остановится
function dumpError(): never {
	while (true) { }
}

// #3
// функция никогда не остановится
function rec(): never {
	return rec();
}

// #4
type paymentAction = 'refund' | 'checkout' | 'reject';

function processAction(action: paymentAction) {
	switch (action) {
		case 'refund':
			// ...
			break;
		case 'checkout':
			// ...
			break;
		// что тут происходит:
		// в compile time: сюда никогда не дейдет действие, поэтому тут action имеет тип never
		// но если вдруг, в run time добавиться новый action (например придет с api),
		// соотв. switch додет сюда и выдаст ошибку
		default:
			// const _: never = action;
			throw new Error(`Нет такого action`);
	}
}

// #5

// в рантайме реально может прийти что угодно, для этого
// делаем  Исчерпывающую проверку
function isString(x: string | number): boolean {
	if (typeof x === 'string') {
		return true;
	}
	else if (typeof x === 'number') {
		return false;
	}
	// т.е. если x явно не строка и не число и если функцию необходим прервать
	// это называется Исчерпывающая проверка, т.е. функция generateError
	// возвращает never, соотв. ошибки в compile time и в run time не будет.
	// обязательно функция generateError должна вернуть never, 
	// как будто бы функция isString дальше generateError() не пройдет
	// это нужно для типизации
	generateError('Тип переменной неопределен');
}
