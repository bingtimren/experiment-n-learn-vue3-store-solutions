<template>
  <h1>Todo</h1>
  <table style="margin:auto">
    <tr v-for="(todo, index) in todos" :key="todo.id">
      <td>{{index+1}}</td>
      <td>
        <input type="text" :value="todo.title" @input="updateTodo(index, 'title', $event)" />
      </td>
      <td>
        <input type="checkbox" :checked="todo.completed" @change="updateTodo(index, 'completed', $event)" />
      </td>
      <td><button @click="deleteTodo(index)">X</button></td>
      <td>{{ todoValid[index] ? "" : "[ERROR]" }}</td>
      <td></td>
    </tr>
  </table>
  <hr>
  <input type="text" v-model="newTitle" />
  <button type="button" @click="createTodo">Add</button>
  <br>
  {{createError}}
</template>

<script lang="ts">
import { TodoItem, updateItems } from "mock-backend";
import { defineComponent, PropType } from "vue";
import { state, createTodo, removeTodoByIndexAndId, updateTodo } from "../homeroll-store"



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
    updateTodo(index: number, propName:keyof TodoItem, event: Event) {
      const input = event.target as HTMLInputElement;
      const value = propName === "title"? input.value : input.checked;
      const updatedItem = Object.assign({}, this.todos[index], {[propName]:value});
      try {
        updateTodo(index, updatedItem);
      } catch{
        // nothing
      };
    },
    deleteTodo(index: number){
      removeTodoByIndexAndId(index, this.todos[index].id);
    }
  },
  watch: {
  },
  emits: []
});
</script>

<style scoped>
</style>
