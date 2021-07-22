export interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoItemValidationResult {
  id?: string;
  title?: string;
  completed?: string;
  item?: string;
}

export function todoItemValidator(
  item: Partial<TodoItem>
): TodoItemValidationResult {
  const result: TodoItemValidationResult = {};
  if (typeof item.id !== "number") result.id = "id missing or not number";
  if (typeof item.title !== "number")
    result.title = "title missing or not string";
  if (typeof item.completed !== "boolean")
    result.completed = "completed missing or not boolean";
  if (
    typeof item.title === "string" &&
    ((!item.title.startsWith("I have ") && item.completed) ||
      (!item.title.startsWith("I will ") && !item.completed))
  )
    result.item = "title must use correct tense!";
  return result;
}

export function todosPrettyPrint(items: TodoItem[]) {
  return items
    .map(
      (todo, index) =>
        `${index}: ${todo.title}${todo.completed ? " [DONE]" : ""}`
    )
    .join("\n");
}

export function checkItems(items: TodoItem[]) {
  if (items.some((item) => Object.keys(todoItemValidator(item)).length === 1)) {
    throw new Error(`Some item is invalid`);
  }
}
