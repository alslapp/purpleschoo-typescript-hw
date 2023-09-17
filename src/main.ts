// Классы
// Упражнение - Делаем абстрактный logger

abstract class LoggerAbstract {
	abstract log(message: string): void;

	printDate(date: Date): void {
		this.log(date.toString());
	}
}

class Logger extends LoggerAbstract {
	log(message: string): void {
		console.log(message);
	}
	logWithDate(message: any): void {
		this.printDate(new Date());
		this.log(message);
	}
}


const logger = new Logger();
logger.logWithDate('тестовое сообщение!');
