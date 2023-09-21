export { }

// Манипуляция с типами
// урок Typeof

let strOrNumber: string | number = 5;

if (Math.random() > 0.5) {
	strOrNumber = 5;
}
else {
	strOrNumber = 'str';
}

// typeof js-сная часть
if (typeof strOrNumber === 'string') {
	console.log(strOrNumber);
}
else {
	console.log(strOrNumber);
}

// ts-сная часть
let strOrNumber2: typeof strOrNumber;

const user = {
	name: 'Вася',
};

// typeof - получить тип переменной user, keyof - получить ключи типа
type keyOfUser = keyof typeof user; // 'name'

enum Direction {
	Up,
	Down,
}

type d = keyof typeof Direction; // 'Up' | 'Down'