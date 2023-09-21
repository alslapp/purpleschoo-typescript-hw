export { }

// Манипуляция с типами
// урок Indexed Access Types

interface Role {
	name: string;
}

interface IPermission {
	endDate: Date;
}

interface User1 {
	name: string;
	roles: Role[];
	permission: IPermission;
}

const user: User1 = {
	name: 'Вася',
	roles: [{ name: 'user' }],
	permission: {
		endDate: new Date(),
	},
};

const nameUser = user['name'];
const roleName = 'roles'; // это сработает, только если использовать const

type rolesType = User1['roles'];
type rolesType2 = User1[typeof roleName];

// получить тип из типа, который является массивом, 
// т.е.обращаемся к типу User, потом по ключу к roles 
// и по индексу[number] получаем элемент массива, 
// который является типом Role
type roleType = User1['roles'][number]; // достучались до типа Role
type dateType = User1['permission']['endDate']; // достучались до типа Role

const roles = ['admin', 'user', 'super'] as const;

type TRoleTypes = typeof roles[number]; // 'admin' | 'user' | 'super' -  можно преобразовать массив из рантайма в юнион тип
