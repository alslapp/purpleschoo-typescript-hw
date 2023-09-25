export { };
// Структурные паттерны
// Adapter
// https://refactoring.guru/ru/design-patterns/adapter

class DataBase {
	private static instance: DataBase;
	private db: Map<string, string> = new Map();

	private constructor() { }

	public static db(): DataBase {
		if (!DataBase.instance) {
			DataBase.instance = new DataBase();
		}
		return DataBase.instance;
	}

	set(key: string, value: string) {
		this.db.set(key, value);
		console.log('DataBase set', { key, value });
	}
}

class KVDatabase {
	constructor(private db = DataBase.db()) { }
	save(key: string, value: string) {
		this.db.set(key, value);
	}
}

class PersistentDB {
	constructor(private db = DataBase.db()) { }
	savePersistent({ key, value }: { key: string; value: string }) {
		this.db.set(key, value);
	}
}

class PersistentAdapter extends KVDatabase {
	constructor(public database: PersistentDB) {
		super();
	}

	override save(key: string, value: string) {
		this.database.savePersistent({ key, value });
	}
}

function run(base: KVDatabase) {
	base.save('key', 'myValue');
}

run(new PersistentAdapter(new PersistentDB()));
