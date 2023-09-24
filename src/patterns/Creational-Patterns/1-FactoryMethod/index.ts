export {};
// Порождающие паттерны
// Factory Method -  фабрика

interface IInsurance {
	id: number;
	status: string;

	setVehicle(vehicle: any): void;

	submit(): Promise<boolean>;
}

// Класс для создания запроса в первую страховую компанию TFInsurance
class TFInsurance implements IInsurance {
	id: number;
	status: string;
	private vehicle: any;

	setVehicle(vehicle: any): void {
		this.vehicle = vehicle;
	}

	async submit(): Promise<boolean> {
		const res = await fetch('', {
			method: 'POST',
			body: JSON.stringify({vehicle: this.vehicle}),
		});
		const data = await res.json();
		return data.isSuccess;
	}
}

// Класс для создания запроса во вторую страховую компанию ABInsurance
class ABInsurance implements IInsurance {
	id: number;
	status: string;
	private vehicle: any;

	setVehicle(vehicle: any): void {
		this.vehicle = vehicle;
	}

	async submit(): Promise<boolean> {
		const res = await fetch('', {
			method: 'POST',
			body: JSON.stringify({vehicle: this.vehicle}),
		});
		const data = await res.json();
		return data.yes;
	}
}

// фабрика
abstract class InsuranceFactory {
	db: any; // какая то база данных, если нужно

	abstract createInsuranse(): IInsurance;

	saveHistory(ins: IInsurance) {
		this.db.save(ins.id, ins.status);
	}
}

// реализация фабрик - для каждой фабрики нужно создавать свой класс
// преимущество - можно в каждой фабрике сделать свои методы и свойства.
// недостаток - нужно писать для каждой свой фабрики класс

// реализация фабрики для TFInsurance
class TFInsuranceFactory extends InsuranceFactory {
	// использовать класс как интерфейс
	createInsuranse(): TFInsurance {
		return new TFInsurance();
	}
}

// реализация фабрики для TFInsurance
class ABInsuranceFactory extends InsuranceFactory {
	// использовать класс как интерфейс
	createInsuranse(): ABInsurance {
		return new ABInsurance();
	}
}

///////// использование

const tfInsFactory = new TFInsuranceFactory();
const ins = tfInsFactory.createInsuranse();
tfInsFactory.saveHistory(ins);

/////////// другой подход - не нужно создавать фабрики под кажый тип страховки, просто создаем
// объект с перечислением всех типов и динамически создаем фабрики
// но нельзя сделать разные методы для разных фабрик, т.к. используется один шаблон

const INSURANCE_TYPE = {
	tf: TFInsurance,
	ab: ABInsurance,
};

type IT = typeof INSURANCE_TYPE;

class InsuranceFactoryAlternative {
	db: any;

	createInsuranse<T extends keyof IT>(type: T): IT[T] {
		return INSURANCE_TYPE[type];
	}

	saveHistory(ins: IInsurance) {
		this.db.save(ins.id, ins.status);
	}
}

const tfInsFactoryAlt = new InsuranceFactoryAlternative();
const ins2 = new (tfInsFactoryAlt.createInsuranse('tf'))();
tfInsFactoryAlt.saveHistory(ins2);
