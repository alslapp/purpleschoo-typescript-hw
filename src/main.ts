type voidFn = () => void;

const f1: voidFn = () => {
	return true;
}
const b = f1();

console.log(`b: `, b);

// void позволяет игнорировать все что выводит функция,
// это нужно для совместимости js функций например forEach и ts типизации