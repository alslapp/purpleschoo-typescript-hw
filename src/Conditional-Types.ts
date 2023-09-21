export { }

// Манипуляция с типами
// урок Conditional Types

const a1: number = Math.random() > 0.5 ? 1 : 0;

// грубый вариант:
// T: string | Error
// V: string | number
// и явно передавать каждый раз через дженерик нужные типы, например const resp: HTTPResponse<string | Error, string | number> = {...}
// interface HTTPResponse<T, V> {
// 	code: number;
// 	data: T;
// 	additionalData: V;
// }

// другое решение

interface HTTPResponse<T extends 'success' | 'faild'> {
	code: number;
	data: T extends 'success' ? string : Error;
	additionalData: T extends 'success' ? string : number;
}

const suc: HTTPResponse<'success'> = {
	code: 200,
	data: 'done', // type string
	additionalData: 'add done', // type string
};

const err: HTTPResponse<'faild'> = {
	code: 403,
	data: new Error(''), // type Error
	additionalData: 403, // type number
};


class User {
	id: number;
	name: string;
}

class UserPersistend extends User {
	dbId: string;
}


// без использования Conditional Types
function getUser(id: number): User
function getUser(dbId: string): UserPersistend
function getUser(dbIdOrId: string | number): User | UserPersistend {
	if (typeof dbIdOrId === 'number') {
		return new User();
	}
	else {
		return new UserPersistend();
	}
}

const user1 = getUser(1);
const user2 = getUser('1');

console.log(user1);
console.log(user2);

// с использованием Conditional Types

type UserOrUserPersistend<T extends string | number> = T extends number ? User : UserPersistend;

function getUser2<T extends string | number>(id: T): UserOrUserPersistend<T> {
	if (typeof id === 'number') {
		return new User() as UserOrUserPersistend<T>; // если использовать Conditional Types, то придется кастовать к нужному типу, иначе сломается типизация
	}
	else {
		return new UserPersistend() as UserOrUserPersistend<T>;
	}
}

const user3 = getUser2(1);
const user4 = getUser2('1');

console.log(user3);
console.log(user4);