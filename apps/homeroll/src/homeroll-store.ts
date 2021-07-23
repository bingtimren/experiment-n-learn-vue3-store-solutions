import { reactive, readonly } from "vue";
import {
  TodoItem,
  createTodoItem,
  getTodoItems,
  updateItem,
  retrieveItems,
  todoItemValidator,
  checkItems,
} from "mock-backend";

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
  checkItems([newItem]);
  createTodoItem(newItem);
  internalState.todos.push(newItem);
  internalState.todoValidations.push(true);
  return newItem;
}

function validateAll(items: TodoItem[]) {
  return items.map((item) => Object.keys(todoItemValidator(item)).length === 0);
}
/**
 * fetch todo from backend
 */
export function fetchTodos() {
  retrieveItems();
  const todoItems = getTodoItems();
  const validation = validateAll(todoItems);
  internalState.todos.splice(0, internalState.todos.length, ...todoItems);
  internalState.todoValidations.splice(
    0,
    internalState.todoValidations.length,
    ...validation
  );
}

export function updateTodo(item: TodoItem) {
  const index = internalState.todos.findIndex((i) => i.id === item.id);
  if (index >= 0) {
    const validation = Object.keys(todoItemValidator(item)).length === 0;
    if (validation) {
      updateItem(item);
      internalState.todos[index] = item;
    }
    internalState.todoValidations[index] = validation;
  }
}

export function removeTodoById(id: TodoItem["id"]) {
  const index = internalState.todos.findIndex((i) => i.id === id);
  if (index >= 0) {
    internalState.todos.splice(index, 1);
    internalState.todoValidations.splice(index, 1);
  } else {
    throw new Error(`ID ${id} not found`);
  }
}

fetchTodos();
