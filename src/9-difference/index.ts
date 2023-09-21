export { };
/*
Написать функцию, которая удаляет все ключи из первого объекта,
которые есть во втором объекте
*/

interface IA {
	a: number;
	b: string;
}

interface IB {
	a: number;
	c: boolean;
}

type TExcludedKeys<A, B> = Exclude<keyof A, keyof B>; // получаем ключи из IA, которых нет в IB
type IDifferense<A, B> = Pick<A, TExcludedKeys<A, B>>; // тип, в котором есть только ключи из типа TExcludedKeys

const a: IA = { a: 5, b: '' };
const b: IB = { a: 10, c: true };

function differense<A extends {}, B extends {}>(a: A, b: B): IDifferense<A, B> {
	let key: keyof A;
	for (key in a) {
		if (key in b) {
			delete a[key];
		}
	}
	return a;
}
const v0: IDifferense<IA, IB> = differense(a, b);
console.log(v0);
