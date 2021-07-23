import { reactive, readonly } from "vue";
import * as backend from "mock-backend";

type TodoItem = backend.TodoItem;

interface State {
  todos: TodoItem[];
  todoValidations: boolean[];
}

const internalState: State = reactive<State>({
  todos: [],
  todoValidations: [],
});

export const state = readonly(internalState);

/**
 * Create new todo item, allow invalid item in state but only persist valid item
 * @param title
 * @returns
 */
export function createTodo(title: string): TodoItem {
  const newItem = {
    id: Date.now(),
    title,
    completed: false,
  } as any;
  backend.checkItems([newItem]); // throw if new item not valid
  backend.createTodoItem(newItem); // persist
  internalState.todos.push(newItem);
  internalState.todoValidations.push(true);
  return newItem;
}

function validateAll(items: TodoItem[]) {
  return items.map(
    (item) => Object.keys(backend.todoItemValidator(item)).length === 0
  );
}
/**
 * fetch todo from backend
 */
export function fetchTodos() {
  backend.retrieveItems();
  const todoItems = backend.getTodoItems();
  const validation: boolean[] = validateAll(todoItems);
  internalState.todos.splice(0, internalState.todos.length, ...todoItems); // replace todo items
  internalState.todoValidations.splice(
    0,
    internalState.todoValidations.length,
    ...validation
  ); // replace validation results
}

export function updateTodo(index: number, item: TodoItem) {
  if (internalState.todos[index]?.id !== item.id) {
    throw new Error("id not consistent");
  }

  const validation = Object.keys(backend.todoItemValidator(item)).length === 0;
  internalState.todos[index] = item; // update anyway even invalid
  internalState.todoValidations[index] = validation; // update anyway even invalid
  if (validation) {
    backend.updateItem(item); // persist only when valid
  }
}

export function removeTodoByIndexAndId(index: number, id: TodoItem["id"]) {
  if (internalState.todos[index]?.id !== id) {
    throw new Error("id not consistent");
  }
  backend.removeItemById(id);
  internalState.todos.splice(index, 1);
  internalState.todoValidations.splice(index, 1);
}

fetchTodos();
