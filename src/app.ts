// Модульность и библиотеки
// Модульность на frontend
// Import и export

import run, { a, type B, Test } from './module/app2'; // дефолтный импорт можно именовать произвольно
import running from './module/app2'; // дефолтный импорт можно именовать произвольно
import * as all from './module/app2';
import { Test as CL } from './module/app2';
import { type TB, Obj } from './module/app2';
import type { TC, TD } from './module/app2';
// при импорте типов можно указать type и транспилятор просто удалить их из импортов, это ускоряет сборку
// но можно и не указывать, они все равно удалятся, но будут анализироваться файлы, на которые указывают импорты типов

running();
run();
console.log(a);
console.log(new Test());
console.log(new CL());
console.log(Obj);
console.log(all);

const CC: TC = {
	c: 0,
};

console.log(CC);

const CD: TD = {
	c: 0,
};

console.log(CD);

const CBB: TB = {
	c: 0,
};

console.log(CBB);
