export { };
// Структурные паттерны
// Command
// https://refactoring.guru/ru/design-patterns/command

abstract class Command {
	public commandId: number;

	abstract execute(): void;

	constructor(public history: CommandHistory) {
		this.commandId = Math.random();
	}
}


class CommandHistory {
	public commands: Command[] = [];

	push(command: Command) {
		this.commands.push(command);
	}

	remove(commandId: number) {
		this.commands = this.commands.filter((c) => c.commandId !== commandId);
	}
}

class User {
	constructor(public userId: number) { }
}

class UserService {
	saveUser(user: User) {
		console.log(`Сохраняю пользователя с id ${user.userId}`);
	}

	deleteUser(user: User) {
		console.log(`Удаляю пользователя с id ${user.userId}`);
	}
}

class AddUserCommand extends Command {
	constructor(
		// prettier-ignore
		private user: User,
		private receiver: UserService,
		history: CommandHistory,
	) {
		super(history);
	}

	execute(): void {
		this.receiver.saveUser(this.user);
		this.history.push(this);
	}

	undo(): void {
		this.receiver.deleteUser(this.user);
		this.history.remove(this.commandId);
	}
}

class Controller {
	receiver: UserService;
	history: CommandHistory = new CommandHistory();

	addReceiver(receiver: UserService) {
		this.receiver = receiver;
	}

	run() {
		const addUserCommand = new AddUserCommand(new User(1), this.receiver, this.history);
		addUserCommand.execute();
		console.log(addUserCommand.history);
		addUserCommand.undo();
		console.log(addUserCommand.history);
	}
}

const controller = new Controller();
controller.addReceiver(new UserService());
controller.run();
