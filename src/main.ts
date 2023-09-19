// Generics
// Упражнение - Функция преобразования в строку

/*
Необходимо написать функцию toString, которая принимает любой тип 
и возвращает его строковое представление. Если не может, то возвращает undefined
*/


function toString<T>(a: T): string | undefined {

	console.log('type', typeof a);

	if (Array.isArray(a)) {
		return a.toString();
	}

	switch (typeof a) {
		case 'string':
			return a;

		case 'number':
		case 'symbol':
		case 'bigint':
		case 'boolean':
		case 'function':
			return a.toString();

		case 'object':
			return JSON.stringify(a);

		default:
			return undefined;
	}
}

console.log(toString('Привет'));
console.log(toString('1111'));
console.log(toString([1, 2, 'asdfasdf', { test: 'adfasdf' }]));
console.log(toString({ test: 'adfasdf' }));

console.log(toString(true));

console.log(toString(() => { }));

console.log(toString(function () { }));