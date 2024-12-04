export class TodoBase {
	id: string = crypto.randomUUID();
	description: string;
	completed = false;
}

export enum Filters {
	All = "all",
	Active = "active",
	Completed = "completed",
}

const STORAGE_NAME = "todos";

function restore_todos(): TodoBase[] {
	try {
		const item = localStorage.getItem(STORAGE_NAME);
		return item ? JSON.parse(item) : [];
	} catch {
		return [];
	}
}


let ALL_TODOS: TodoBase[] = $state(restore_todos());


const COMPLETED = $derived.by(() => {
	return ALL_TODOS.filter(item => {
		return item.completed === true;
	})
});
const NO_COMPLETED = $derived.by(() => {
	return ALL_TODOS.filter(item => {
		return item.completed === false;
	})
});


// Todo Filters
export function all_todos() {
	return ALL_TODOS;
}
export function completed_todos() {
	return COMPLETED;
}
export function uncompleted_todos() {
	return NO_COMPLETED;
}


export function save_todos() {
	localStorage.setItem(STORAGE_NAME, JSON.stringify(all_todos()))
}


// Add and remove todos
export function add(item: TodoBase) {
	ALL_TODOS.push(item);
}
export function remove(id: string) {
	ALL_TODOS = ALL_TODOS.filter(item => {
		return item.id !== id;
	})
}
export function toggle_all() {
	for (const item of ALL_TODOS) {
		item.completed = !item.completed;
	}
}
export function remove_all_completed() {
	ALL_TODOS = ALL_TODOS.filter(item => {
		return item.completed === false;
	})
}
