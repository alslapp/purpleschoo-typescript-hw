export { };
// Структурные паттерны
// Домашнее задание - Поведенческие паттерны

/*
Реализовать паттерно Итератор для массива объектов вида 
{id: 1, date: "01-01-2023", title: "Тест"}
с возможностью обхода объекта как по дате, так и по id
*/

enum SortDirection {
	ASC = 'asc',
	DESC = 'desc',
}

interface ITask {
	id: number;
	date: string;
	title: string;
}

class Task implements ITask {
	constructor(public id: number, public date: string, public title: string) { }
}

class TaskList {
	private tasks: Task[] = [];

	public sort(field: keyof ITask, direction: SortDirection) {
		const k = direction === SortDirection.DESC ? -1 : 1;
		this.tasks = this.tasks.sort((a, b) => {
			let res = 0;

			let el1 = a[field];
			let el2 = b[field];

			if (field === 'date') {
				el1 = new Date(el1).getTime();
				el2 = new Date(el2).getTime();
			}

			if (el1 > el2) res = 1;
			else if (el1 === el2) res = 0;
			else res = -1;
			return res * k;
		});
	}

	public addTask(task: Task) {
		this.tasks.push(task);
	}

	public getTasks(): Task[] {
		return this.tasks;
	}

	public count(): number {
		return this.tasks.length;
	}

	public getIterator() {
		return new PriorityTaskIterator(this);
	}
}

interface IIterator<T> {
	current(): T | undefined;
	next(): T | undefined;
	prev(): T | undefined;
	index(): number;
}

class PriorityTaskIterator implements IIterator<Task> {
	private position: number = 0;
	public taskList: TaskList;

	constructor(taskList: TaskList) {
		// taskList.sort('id', SortDirection.ASC);
		this.taskList = taskList;
	}

	current(): Task | undefined {
		return this.taskList.getTasks()[this.position];
	}
	next(): Task | undefined {
		this.position++;
		return this.taskList.getTasks()[this.position];
	}
	prev(): Task | undefined {
		this.position--;
		return this.taskList.getTasks()[this.position];
	}
	index(): number {
		return this.position;
	}
}

const taskList = new TaskList();
taskList.addTask(new Task(4, '01-03-2023', 'Тест 4'));
taskList.addTask(new Task(2, '11-10-2023', 'Тест 2'));
taskList.addTask(new Task(1, '05-06-2021', 'Тест 1'));
taskList.addTask(new Task(3, '01-07-2023', 'Тест 3'));

const iterator = taskList.getIterator();
console.log('iterator.taskList: ', iterator.taskList);

iterator.taskList.sort('id', SortDirection.DESC);
console.log('sort id desc: ', iterator.taskList);

iterator.taskList.sort('id', SortDirection.ASC);
console.log('sort id asc: ', iterator.taskList);

iterator.taskList.sort('date', SortDirection.DESC);
console.log('sort date desc: ', iterator.taskList);

iterator.taskList.sort('date', SortDirection.ASC);
console.log('sort date asc: ', iterator.taskList);

console.log(iterator.current());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.prev());
console.log(iterator.index());
