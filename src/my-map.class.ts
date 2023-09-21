type IItem = [string | number, unknown];

interface IBucket {
	[key: string | number]: {
		[key: string | number]: MapItem;
	};
}

class MapItem {
	constructor(
		public value: IItem,
		public next: MapItem | null,
	) { }
}

class MyMap {
	protected _buckets: IBucket | null = null;
	protected _firstItem: MapItem | null = null;
	protected _lastItem: MapItem | null = null;
	protected current: MapItem | null | undefined = null;
	protected _size: number = 0;

	protected _hash(string: string): string {
		let hash = 0;
		if (string.length == 0) return hash + '';
		for (let i = 0; i < string.length; i++) {
			const char = string.charCodeAt(i);
			hash = ((hash << 5) - hash) + char;
			hash = hash & hash;
		}
		return 'h_' + (hash < 0 ? '0' + (hash * -1) : hash) + '';
	}

	// проверка объекта на пустоту
	protected _isObjectEmpty(obj: unknown) {
		if (typeof obj !== 'object') {
			return true;
		}
		// @ts-ignore
		// иначе ругается на неиспользуемую переменную
		for (const val in obj) {
			return false
		}
		return true;
	}

	set(key: string, value: unknown): IItem {

		// получаем хеш для bucket
		const hashBucket = this._hash(key);

		// создаем новый элемент
		const newItem = new MapItem([key, value], null);

		if (this._buckets === null) this._buckets = {};

		// если элемент с таким же ключём уже добавлен, перезаписываем его
		if (this._buckets.hasOwnProperty(hashBucket)) {
			const bucket = this._buckets[hashBucket];
			if (bucket && bucket.hasOwnProperty(key)) {
				const itemBucket = bucket[key];
				if (itemBucket) {
					itemBucket.value = newItem.value;
					return itemBucket.value;
				}
			}
		}

		// если первого элемента еще нет, добавляем
		if (!this._firstItem) {
			this._firstItem = newItem;
		}

		let next = null;
		// если последнего элемента еще нет, добавляем
		if (!this._lastItem) {
			this._lastItem = newItem;
		}
		else {
			next = newItem;
		}

		// в указатель next в последнем элементе bucket добавляем ссылку на только что созданный элемент, т.к. он теперь последний
		this._lastItem.next = next;

		// перезаписываем ссылку на последний элемент
		this._lastItem = newItem;

		this._buckets[hashBucket] = {
			[key]: newItem
		};

		this._size++;

		return newItem.value;
	}

	delete(keyForDelete: string): unknown {
		if (this._buckets === null) return null;

		const hashBucket = this._hash(keyForDelete);

		const bucket = this._buckets[hashBucket];
		if (!bucket) return null;

		if (!bucket.hasOwnProperty(keyForDelete)) return null;

		let deletedItem = null;

		// если нужно удалить первый элемент, тогда назначим первым следующий после него элемент
		if (keyForDelete === this._firstItem?.value[0]) {
			deletedItem = this._firstItem;
			this._firstItem = this._firstItem.next;
		}

		let current = this._firstItem;
		while (current?.value) {
			const next = current.next;
			if (keyForDelete === next?.value[0]) {
				current.next = next.next;
				deletedItem = next;
			}
			current = current.next;
		}

		// проверить, что удаляем последний элемент
		// последним ставим текущий элемент
		if (this._lastItem?.value[0] === keyForDelete) {
			this._lastItem = current;
		}

		if (deletedItem !== null) {
			this._size--;
			const returnedValue = JSON.parse(JSON.stringify(deletedItem.value));
			deletedItem = null;
			return returnedValue;
		}

		return null;
	}



	get(key: string): IItem | null {
		if (this._buckets === null) return null;

		const hashBucket = this._hash(key);
		if (!this._buckets.hasOwnProperty(hashBucket)) return null;

		const bucket = this._buckets[hashBucket];
		if (!bucket || !bucket.hasOwnProperty(key)) return null;

		const item = bucket[key];
		if (!item) return null;

		return item.value;
	}

	clear(): void {
		this._firstItem = null;
		this._lastItem = null;
		this._buckets = null;
		this.current = null;
		this._size = 0;
	}

	get size() {
		return this._size;
	}

	get buckets() {
		return this._buckets;
	}

	// итератор по мапе через for of
	[Symbol.iterator]() {
		this.current = this._firstItem;
		return this;
	}

	protected next() {
		if (this.current && 'next' in this.current) {

			const { value, next } = this.current;
			this.current = next;
			return { done: false, value };
		}
		else {
			return { done: true };
		}
	}

}

export { MyMap, MapItem };