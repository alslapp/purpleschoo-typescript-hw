enum Gender {
	MALE = 'male',
	FEMALE = 'female',
}

interface IHair {
	color: string;
	type: string
}

interface ICoordinates {
	lat: number;
	lng: number
}

interface IAddress {
	address: string;
	city: string;
	coordinates: ICoordinates;
	postalCode: number;
	state: string
}

interface IBank {
	cardExpire: string;
	cardNumber: string;
	cardType: string;
	currency: string;
	iban: string;
}

interface ICompany {
	address: IAddress;
	department: string;
	name: string;
	title: string;
}

interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	maidenName: string;
	age: number;
	gender: Gender;
	email: string;
	phone: string;
	username: string;
	password: string;
	birthDate: string;
	image: string;
	bloodGroup: string;
	height: number;
	weight: number;
	eyeColor: string;
	hair: IHair;
	domain: string;
	ip: string;
	address: IAddress;
	macAddress: string;
	university: string;
	bank: IBank;
	company: ICompany;
	ein: string;
	ssn: string;
	userAgent: string;
};

interface IResData {
	users: IUser[];
	total: number;
	skip: number;
	limit: number;
}

interface IRes {
	data: IResData;
}
