export { };
// Структурные паттерны
// Facade

class Notify {
	send(template: string, to: string) {
		console.log(`отправляю сообщение: ${template} to: ${to}`);
	}
}

class Log {
	log(message: string) {
		console.log('Log: ', message);
	}
}

class Template {
	private templates = [{ name: 'other', template: '<h1>Шаблон!</h1>' }];

	getByName(name: string) {
		return this.templates.find((t) => t.name === name);
	}
}

class NotificationFacad {
	private notify: Notify;
	private logger: Log;
	private template: Template;

	constructor() {
		this.notify = new Notify();
		this.logger = new Log();
		this.template = new Template();
	}

	send(to: string, templateName: string) {
		const data = this.template.getByName(templateName);
		if (!data) {
			this.logger.log(`Шаблон ${templateName} не найден!`);
			return;
		}
		this.notify.send(data.template, to);
		this.logger.log(`Сообщение отправлено`);
	}
}

//////////////
const s = new NotificationFacad();

s.send('test@test.ru', 'other');
s.send('test@test.ru', 'other1');
