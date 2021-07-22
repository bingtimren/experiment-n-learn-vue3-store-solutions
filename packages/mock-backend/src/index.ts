export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

const key = "MOCK_TODO_STORE";

let storage: TodoItem[] = [];

export function todosPrettyPrint() {
  return storage
    .map(
      (todo, index) =>
        `${index}: ${todo.title}${todo.completed ? " [DONE]" : ""}`
    )
    .join("\n");
}

export function retrieveItems() {
  const stored = window.localStorage.getItem(key);
  storage = stored ? JSON.parse(stored) : [];
}

function persist() {
  window.localStorage.setItem(key, JSON.stringify(storage));
  console.log(`Todo List Persisted:\n${todosPrettyPrint()}`);
}

export function createTodoItem(item: TodoItem) {
  storage.push(item);
  persist();
}

export function getTodoItems(): TodoItem[] {
  return storage;
}

export function updateItems(items: TodoItem[]) {
  storage = items;
  persist();
}

export function updateItem(item: TodoItem) {
  const itemInStore = storage.filter((i) => i.id === item.id);
  if (itemInStore.length === 1) {
    Object.assign(itemInStore[0], item);
    persist();
  } else {
    throw Error("Not found");
  }
}

export function removeItemById(id: number) {
  const index = storage.findIndex((i) => i.id === id);
  if (index >= 0) {
    storage.splice(index, 1);
    persist();
  } else {
    throw Error("Not found");
  }
}
