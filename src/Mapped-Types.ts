export { }

// Манипуляция с типами
// урок Mapped Types

type Modifier = 'read' | 'update' | 'create';

type UserRoles = {
	customers?: Modifier,
	projects?: Modifier,
	adminPane?: Modifier,
}

type ModifierToAccess<Type> = {
	// +? - сделать все свойства обязательными; -? - сделать все свойства необязательными
	// + readonly - сделать все обязательными, и наоборот через минус убрать
	// т.е. можно добавлять или удалять модификторы
	// [Property in keyof Type]?: boolean;
	// [Property in keyof Type as `canAccess_${string & Property}`]?: boolean; // as `canAccess${string & Property}` - можно добавить к ключу какую то строку
	+ readonly [Property in keyof Type as Exclude<`canAccess_${string & Property}`, 'canAccess_projects'>]-?: boolean; // можно исключить какие то свойста по имени ключа
}
// создаем новый тип из UserRoles
type UserAccess1 = ModifierToAccess<UserRoles>;
