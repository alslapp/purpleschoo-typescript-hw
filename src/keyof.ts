export { }

// Манипуляция с типами
// урок keyof

interface IUser {
	name: string;
	age: number;
}

type TKeysOfUser = keyof IUser;

const key: TKeysOfUser = 'age';


function getValue<T extends IUser, K extends keyof T>(obj: T, key: K) {
	return obj[key];
}

const user: IUser = {
	name: 'Вася',
	age: 30,
};

const userName = getValue(user, 'age');
