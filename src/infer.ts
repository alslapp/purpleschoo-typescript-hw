export { }

// Манипуляция с типами
// урок Infer


function runTransaction(transaction: {
	fromTo: [string, string]
}) {
	console.log(transaction);
}


const transaction = {
	fromTo: ['1', '2'],
};
console.log(transaction);
// const trans = runTransaction(transaction); // ошибка показывать, что transaction имеет тип string[], а нам нужен [string, string]



type GetFirstArg<T> = T extends (first: infer First, ...args: any[]) => any ? First : never



const transaction2: GetFirstArg<typeof runTransaction> = {
	fromTo: ['1', '2'],
};

const trans2 = runTransaction(transaction2);

console.log(trans2);
