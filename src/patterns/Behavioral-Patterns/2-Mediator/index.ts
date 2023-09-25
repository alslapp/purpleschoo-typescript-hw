export { };
// Структурные паттерны
// Mediator
// https://refactoring.guru/ru/design-patterns/mediator

interface IMediator {
	notify(sender: string, event: string): void;
}

abstract class Mediated {
	mediator: IMediator;

	setMediator(mediator: IMediator) {
		this.mediator = mediator;
	}
}

class Notifications {
	send() {
		console.log('Notifications, send: Отправляю уведомление');
	}
}

class Log {
	log(message: string) {
		console.log('Log, log, message: ' + message);
	}
}

class EventHandler extends Mediated {
	myEvent() {
		this.mediator.notify('EventHandler', 'myEvent');
	}
}

class NotificationMediator implements IMediator {
	constructor(
		public notifications: Notifications,
		public logger: Log,
		public eventHandler: EventHandler,
	) { }
	notify(sender: string, event: string): void {
		switch (event) {
			case 'myEvent':
				this.notifications.send();
				this.logger.log('Отправлено');
				break;
		}
	}
}

//////////

const handler = new EventHandler();
const logger = new Log();
const notifications = new Notifications();

const m = new NotificationMediator(notifications, logger, handler);

handler.setMediator(m);

handler.myEvent();
