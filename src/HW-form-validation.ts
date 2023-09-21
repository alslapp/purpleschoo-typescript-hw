export { }

// Манипуляция с типами
// Упражнение - Валидация форм

/*
Необходимо сделать тип для результат валидации формы, основываясь на типе формы
*/

interface IForm {
	name: string;
	password: string;
	age: number;
}

const form: IForm = {
	name: 'Вася',
	password: '123',
	age: 23,
}


type TFormValidation<Type> = {
	[Property in keyof Type]: { isValid: true } | { isValid: false, errorMessage: string; }
};


// описать тип для результата валидации формы:
const formValidation: TFormValidation<IForm> = {
	name: { isValid: true, },
	age: { isValid: true, },
	password: { isValid: false, errorMessage: 'Должен быть длиннее 5 символов' },
}



console.log(formValidation);


