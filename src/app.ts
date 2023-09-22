// Модульность и библиотеки
// Namespaces и reference

/// <reference path="./module/app2.ts"/>
// reference -  это устаревшая опция

/*
	в tsconfig.json:
	
	"module": "AMD", 
	"outFile": "./app.js",

	// "outDir": "./dist/", 
	// "resolveJsonModule": true,
*/

console.log(A.a);
