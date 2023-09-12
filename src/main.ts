// Основные типы - Type Guard

// type guard - это просто функция для проверки типа переменной
interface IUser {
	name: string;
	email: string;
	login: string;
}

const user: IUser = {
	name: 'Вася',
	email: 'sdf@asdf.ru',
	login: 'vasya'
}

interface IAdmin {
	name: string;
	role: number;
}

function logId(id: string | number) {

	if (isString(id)) {
		console.log(id);
	}
	else {
		console.log(id);
	}
}

function isString(x: string | number): x is string {
	return typeof x === 'string';
}

/////////////////////////////////////////////////////

// type guard - т.е. запись: user is IAdmin говорит о том, что возвращаем bool true или false - пользователь админ или нет
// почему не возвращаем просто boolean - тогда ts не сужает тип user
function isAdmin(user: IUser | IAdmin): user is IAdmin {
	return 'role' in user; // user.hasOwnProperty('role');
}

// например в типе много вложенных свойств, можно кастануть и проверить наличие ключа
function isAdminAlternative(user: IUser | IAdmin): user is IAdmin {
	return (user as IAdmin).role !== undefined;
}

function setRole(user: IUser | IAdmin) {
	if (isAdmin(user)) {
		user.role = 0;
	}
	else {
		throw new Error('Пользователь не Admin');
	}
}


// сделать type guard на массив, в котором содержатся строки
const isStringArray = (arg: any): arg is string[] => {
	return Array.isArray(arg) && arg.every(item => typeof item === 'string')
}