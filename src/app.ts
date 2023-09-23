// Модульность и библиотеки
// Типизация сторонних библиотек
import { toJson } from 'really-relaxed-json';
const rjson = '[ one two three {foo:bar} ]';
const json = toJson(rjson);
console.log(json);
