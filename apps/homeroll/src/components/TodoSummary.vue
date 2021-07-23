<template>
  <h1>Todo</h1>
  <p>Total todos: {{length}}</p>
  <p>Unfinished todos: {{unFinished}}</p>
  
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from "vue";
  import {state} from "../homeroll-store"
  export default defineComponent({
    name: "todo",
    data: () => ({
      todos: state.todos
    }),
    computed: {
      length():number{
        return this.todos.length
      },
      unFinished():number {
        return this.todos.filter((i)=>(!i.completed)).length
      }
    },
    methods: {
    },
    watch: {
    },
    emits: [] 
  });
  </script>
  
  <style scoped>
  </style>
  