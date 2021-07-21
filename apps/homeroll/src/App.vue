<template>
<todo-summary></todo-summary>
<hr>
<todo></todo>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Todo from "./components/Todo.vue";
import TodoSummary from "./components/TodoSummary.vue"

export default defineComponent({
  name: 'App',
  components: {
    todo: Todo,
    todoSummary : TodoSummary
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
