// Модульность и библиотеки
// Модульность на backend

// в package.json добавить "type": "module", иначе ругается, что в скомпилированном файле в импортах нет расширения файлов .js
// и добавить в импорт в TS расширение .js. Тогда всё работает.
import { a } from './module/app2.js';

/*
	в tsconfig.json:
	
	"module": "AMD", 
	"outFile": "./app.js",

	// "outDir": "./dist/", 
	// "resolveJsonModule": true,
*/

console.log(a);
