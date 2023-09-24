export { };

// Порождающие паттерны
// домашнее задание
// написать класс генератора запроса, который будет использовать
// паттерн билдера с функциями добавления:
// - тип запроса: GET, POST и т.п.
// - Body
// - Заголовки
// - URL
// и финальный метод exec, который делает fetch запрос.

enum RequestMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATH = 'PATCH',
	DELETE = 'DELETE',
}

type RequestHeaders = { [key: string]: string };

class MyFetch {
	private _url: string = '';
	private _options: RequestInit = {};

	url(url: string) {
		this._url = url;
		return this;
	}

	get() {
		this._options['method'] = RequestMethod.GET;
		return this;
	}

	post() {
		this._options['method'] = RequestMethod.POST;
		return this;
	}

	/* ... остальные методы */

	headers(headers: RequestHeaders) {
		this._options['headers'] = headers;
		return this;
	}

	body(body: BodyInit) {
		this._options['body'] = body;
		return this;
	}

	exec() {
		if (!('method' in this._options)) this._options['method'] = RequestMethod.GET;
		if (this._url == '' || !this._url) throw new Error('Не установлен url');
		return this;
	}

	async json() {
		const response = await fetch(this._url, this._options);
		return await response.json();
	}
	async text() {
		const response = await fetch(this._url, this._options);
		return await response.text();
	}
}

////////////////////////

(async function () {
	const headers = {
		Authorization: 'Bearer ...',
	};

	const bodyString = JSON.stringify({
		test: 'test',
	});

	const formData = new FormData();
	formData.append('test', 'test');

	const myFetch = await new MyFetch()
		.url('https://dummyjson.com/users')
		.get()
		// .headers(headers)
		// .body(formData)
		.exec()
		.json();

	console.log(myFetch);
})();
