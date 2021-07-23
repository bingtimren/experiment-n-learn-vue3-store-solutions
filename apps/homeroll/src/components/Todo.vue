<template>
  <h1>Todo</h1>
  <table style="margin:auto">
    <tr v-for="(todo, index) in todos" :key="todo.id">
      <td>
        <input type="text" :value="todo.title" @input="updateTodo(todo, $event)" />
      </td>
      <td>
        <input type="checkbox" @change="updateTodo(todo, $event)" />
      </td>
      <td>{{ todoValid[index] ? "" : "[X]" }}</td>
      <td></td>
    </tr>
  </table>
  <input type="text" v-model="newTitle" />
  <button type="button" @click="createTodo">Add</button>
  <br>
  {{createError}}
</template>

<script lang="ts">
import { TodoItem } from "mock-backend";
import { defineComponent, PropType } from "vue";
import { state, createTodo, fetchTodos, updateTodo, removeTodoById } from "../homeroll-store"



export default defineComponent({
  name: "MyComponent",
  data: () => ({
    todos: state.todos,
    todoValid: state.todoValidations,
    newTitle: "",
    createError: ""

  }),
  methods: {
    createTodo() {
      try {
        createTodo(this.newTitle); 
        this.createError = "";
        this.newTitle = "";
      } catch {
        this.createError = "New todo must starts with 'I will'!!!"
      };
    },
    updateTodo(item: TodoItem, event: Event) {
      const trElement = (event.target as HTMLElement).parentElement!.parentElement;
      const title = (trElement!.children.item(0)!.children.item(0) as HTMLInputElement).value // the title
      const checked = (trElement!.children.item(1)!.children.item(0) as HTMLInputElement).checked // the checkbox
      try {updateTodo({
        id: item.id,
        title,
        completed: checked
      })} catch{
        // nothing
      };
    },
    updateTodoTitle(item: TodoItem, event: Event) {
      updateTodo(Object.assign({}, item, { title: (event as any).target.value }));
    },
    
  },
  watch: {
  },
  emits: []
});
</script>

<style scoped>
</style>
