export { };
// сделать типизацию пакета https://www.npmjs.com/package/sort-by
import sortBy from 'sort-by';
import type { IUser } from './app-types';

const users: IUser[] = [
	{
		id: 7,
		name: 'Foo',
		age: '34',
		email: { primary: 'foo@email.com' },
	},
	{
		id: 3,
		name: 'Baz',
		age: '67',
		email: { primary: 'baz@email.com' },
	},
	{
		id: 4,
		name: 'Bar',
		age: '67',
		email: { primary: 'bar@email.com' },
	},
];

users.sort(sortBy<IUser>('name', 'age'));

console.log(users);
