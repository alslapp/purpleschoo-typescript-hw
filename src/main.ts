// Generics
// урок Generic классы
class Resp<D, E>{
	data?: D;
	error?: E;

	constructor(data?: D, error?: E) {
		if (data) this.data = data;
		if (error) this.error = error;
	}

}

const resp = new Resp<string, number>('data', 0); // лучше явно передавать типы через дженерики типы, т.к. иначе может в типе переменноый выдаваться unknown
resp.error;


class HTTPResp<D, E, F> extends Resp<D, E> { // чтобы расширить класс, нужно соотв. передать дженерики в оба определения + можно добавить типов
	// или можно сделать так:

	// class HTTPResp extends Resp<string, number> { // передать явные типы

	code: F;

	setCode(code: F) {
		this.code = code;
	}
}

const resp2 = new HTTPResp<string, number, number>();
resp2.data;