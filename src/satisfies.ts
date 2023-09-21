export { }

// Манипуляция с типами
// урок TypeScript 4.9 

// satisfies

type ErrorData = {
	errorOrCode: number | string;
	payload?: Record<string, string | number | boolean>;
}

const errorData = {
	errorOrCode: 'TIMEOUTERROR',
	payload: {
		userId: 1,
	},
} satisfies ErrorData; // чтобы не делать сужение типов для проверок, можно указать satisfies - т.е. объект удовлетоворяет типу ErrorData


errorData.errorOrCode.toLowerCase();


// in - отделить один интерфейс от другого

// кейс, когда in помогает сузить типы
type A = {
	a: 1;
	b: 2;
}

type B = {
	a: 1;
	c: 3;
}

type C = A | B;

function myFn(c: C) {
	if ('c' in c) {
		return c.c;
	}
	else {
		return c.b;
	}
}


// кейс, когда in в старой версии TS не помогал
type externalData = unknown;

function getExternalData(data: externalData) {
	if (typeof data === 'object' && !!data && 'userId' in data) {
		data.userId // в старой версии ts тут была бы ошибка, что ключ userId не существует в объекте data, несмотря на проверку 'userId' in data
	}
}

// TS выдает ошибку: a !== NaN - т.е. это выражение всегда равно true

let a = 10;

if (!Number.isNaN(a)) { // правильная проверка на NaN

}