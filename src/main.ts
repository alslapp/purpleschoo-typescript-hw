// Generics
// урок Mixins

type Constructor = new (...args: any[]) => {};
type GConstructor<T = {}> = new (...args: any[]) => T; // задать тип по умолчанию: <T = {}>

class List {
	constructor(public items: string[]) { }
}

class Accordeon {
	isOpened: boolean;
}

class ExtendedListClass extends List {
	first() {
		return this.items[0];
	}
}

////////////////
const res = new ExtendedListClass(['1', '2']);
console.log(res.first());
////////////////


type ListType = GConstructor<List>;
type AccordeonType = GConstructor<Accordeon>;

// это миксин:
function ExtendsList<TBase extends ListType & AccordeonType>(Base: TBase) {
	return class ExtendedList extends Base {
		first() {
			return this.items[0];
		}
	}
}


class AccordeonList {
	isOpened: boolean;
	constructor(public items: string[]) { }
}


const list = ExtendsList(AccordeonList);
const res2 = new list(['first', 'second']);
console.log(res2.first());



// пример про дженерик конструктор: https://www.simonholywell.com/post/typescript-constructor-type.html