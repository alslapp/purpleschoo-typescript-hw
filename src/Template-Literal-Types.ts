export { }

// Манипуляция с типами
// урок Template Literal Types

type TReadOrWrite = 'read' | 'write';

type TBulk = 'bulk' | '';

// комбинирование типов

type TAccessType = `can${Capitalize<TReadOrWrite>}` //"canRead" | "canWrite"

type TAccessTypeWhitBulk = `can${Capitalize<TReadOrWrite>}${Capitalize<TBulk>}` //"canRead" | "canWrite" | "canReadBulk" | "canWriteBulk"

type TReadOrWriteBulk<T> = T extends `can${infer R}` ? R : never; // в R попадет все после can
type TTypeExample = TReadOrWriteBulk<TAccessTypeWhitBulk> // "Read" | "Write" | "ReadBulk" | "WriteBulk - т.е. удалили can

type TErrorOrSuccess = 'error' | 'success';

type TResponse = {
	result: `http${Capitalize<TErrorOrSuccess>}`; // "httpError" | "httpSuccess"
}


const a: TResponse = {
	result: 'httpSuccess',
}



class User {
	id: number;
	name: string;
}

type UserKeys = keyof User