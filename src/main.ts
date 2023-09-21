// Классы
// Домашнее задание - Классы

import { MyMap } from './my-map.class';

const myMap = new MyMap();

myMap.set('London', '+15');
myMap.set('Moscow', '+18');
myMap.set('Moscow', '+38');
myMap.set('Moscow', '+11');
myMap.set('Moscow', '+32');
myMap.set('Berlin', '+1');
myMap.set('Kazan', '+1');

console.log('size 1', myMap.size);

myMap.delete('London');

console.log('size 2', myMap.size);

myMap.set('Moscow2', {
	t: 1,
	r: 3,
});

myMap.set('Kazan1', '+1');
myMap.set('Kazan2', '+1');
myMap.set('Kazan3', '+134');

console.log('size 3', myMap.size);

console.log('температура в городе Казань: ', myMap.get('Kazan'));
console.log('температура в городе Москва: ', myMap.get('Moscow'));
console.log('температура в городе Kazan3: ', myMap.get('Kazan3'));

console.log('удаление: ', myMap.delete('Moscow2'));
console.log('');


// console.log('==================================');
// for (let b in myMap.buckets) {
// 	const bucket = myMap.buckets[b];
// 	for (let c in bucket) {
// 		const item = bucket[c];
// 		if (item) console.log('item', item['value']);
// 	}
// }
// console.log('==================================');


console.log('size 4', myMap.size);

for (let item of myMap) {
	console.log(item);
}

myMap.clear();
console.log('size 5', myMap.size);

for (let item of myMap) {
	console.log(item);
}
