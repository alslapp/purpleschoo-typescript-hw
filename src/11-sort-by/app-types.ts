export interface IEmail {
	primary: string;
}

export interface IUser {
	id: number;
	name: string;
	age: string;
	email: IEmail;
}
