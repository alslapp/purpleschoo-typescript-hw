// Generics
// Упражнение - Функция сортировки id

/*
Необходимо написать функцию сортировки любых объектов,
которые имют id по убыванию и по возрастанию
*/

const data = [
	{ id: 1, name: 'Вася', },
	{ id: 2, name: 'Петя', },
	{ id: 3, name: 'Надя', },
	{ id: 4, name: 'Зина', },
];

interface Id {
	id: number;
}

// моё решение
enum Directions {
	ASC = 'asc',
	DESC = 'desc',
}

// function sortAsc<T extends Id>(a: T, b: T): number {
// 	if (a.id < b.id) {
// 		return -1;
// 	}
// 	else if (a.id > b.id) {
// 		return 1;
// 	}
// 	return 0;
// }

// function sortDesc<T extends Id>(a: T, b: T): number {
// 	if (a.id > b.id) {
// 		return -1;
// 	}
// 	else if (a.id < b.id) {
// 		return 1;
// 	}
// 	return 0;
// }

// function sortById<T extends Id>(data: Array<T>, direction: Directions = Directions.ASC): Array<T> { // вместо дженерика можно передать/вернуть как: T[]
// 	switch (direction) {
// 		case Directions.ASC:
// 			return data.sort(sortAsc);
// 		case Directions.DESC:
// 			return data.sort(sortDesc);
// 	}
// }

// решение Антона
// <!--
function sortById<T extends Id>(data: T[], direction: Directions = Directions.ASC): T[] {
	return data.sort((a, b) => {
		switch (direction) {
			case Directions.ASC:
				return a.id - b.id;
			case Directions.DESC:
				return b.id - a.id;
		}
	});
}
// -->




console.log(sortById(data, Directions.DESC));
console.log(sortById(data));