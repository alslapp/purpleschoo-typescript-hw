
enum RequestMethod {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	PATH = 'PATCH',
	DELETE = 'DELETE',
}

type RequestHeaders = { [key: string]: string };

export class MyFetch {
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