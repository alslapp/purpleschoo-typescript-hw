export { };
// Структурные паттерны
// Bridge

interface IProvider {
	sendMessage(message: string): void;
	connect(config: string): void;
	disconnect(): void;
}

// Провайдеры
class TelegramProvider implements IProvider {
	sendMessage(message: string): void {
		console.log('sendMessage TG');
	}
	connect(config: string): void {
		console.log('connect TG');
	}
	disconnect(): void {
		console.log('disconnect TG');
	}
}

class WhatsAppProvider implements IProvider {
	sendMessage(message: string): void {
		console.log('sendMessage WS');
	}
	connect(config: string): void {
		console.log('connect WS');
	}
	disconnect(): void {
		console.log('disconnect WS');
	}
}

////////
class NotificationSender {
	constructor(protected provider: IProvider) { }

	send() {
		this.provider.connect('конфиг коннекта');
		this.provider.sendMessage('сообщение кому-то');
		this.provider.disconnect();
	}
}

class DelayNotificationSender extends NotificationSender {
	constructor(provider: IProvider) {
		super(provider);
	}
	sendDelayed(delay: number) {
		setTimeout(() => {
			this.provider.connect('sendDelayed, конфиг коннекта');
			this.provider.sendMessage('sendDelayed, сообщение кому-то');
			this.provider.disconnect();
		}, delay);
	}
}

const senderTG = new NotificationSender(new TelegramProvider());
senderTG.send();

// const senderTGDelayed = new DelayNotificationSender(new TelegramProvider());
// senderTGDelayed.sendDelayed(1000);

const senderWS = new NotificationSender(new WhatsAppProvider());
senderWS.send();
