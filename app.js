"use strict";
// module A - тоже самое что и namespace A
var A;
(function (A) {
    A.a = 5;
})(A || (A = {}));
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
//# sourceMappingURL=app.js.map