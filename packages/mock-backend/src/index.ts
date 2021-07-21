export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

let storage: TodoItem[] = [];

export function createTodoItem(item: TodoItem) {
  storage.push(item);
}

export function getTodoItems(): TodoItem[] {
  return storage;
}

export function updateItems(items: TodoItem[]) {
  storage = items;
}

export function updateItem(item: TodoItem) {
  const itemInStore = storage.filter((i) => i.id === item.id);
  if (itemInStore.length === 1) {
    Object.assign(itemInStore[0], item);
  } else {
    throw Error("Not found");
  }
}

export function removeItemById(id: number) {
  const index = storage.findIndex((i) => i.id === id);
  if (index >= 0) {
    storage.splice(index, 1);
  } else {
    throw Error("Not found");
  }
}
