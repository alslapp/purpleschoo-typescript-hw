// Классы
// урок 5 Упражнение - Перегрузка методов

class User {
	skills: string[] = [];

	private addSkill(skill: string): void {
		const skillIndex = this.skills.findIndex((s) => s === skill);
		if (skillIndex < 0) this.skills.push(skill);
	}

	addSkills(skill: string): void;
	addSkills(skills: string[]): void;
	addSkills(skillOrSkills: string | string[]): void {
		if (typeof skillOrSkills === 'string') {
			this.addSkill(skillOrSkills);
		} else if (Array.isArray(skillOrSkills)) {
			skillOrSkills.map(this.addSkill.bind(this));
		}
	}
}

const user = new User();

user.addSkills('dev');
console.log(user);

user.addSkills(['dev', 'devOps', 'front']);
console.log(user);

user.addSkills('dev');
console.log(user);

///////////////////////////////
// перегрузка функции
function run(distance: string): string;
function run(distance: number): number;
function run(distance: number | string): number | string {
	if (typeof distance == 'number') {
		return 1;
	} else {
		return '1';
	}
}

run(1);
run('1');
