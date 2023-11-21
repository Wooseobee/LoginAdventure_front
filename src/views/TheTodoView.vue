<script setup>
import TodoHeader from "@/components/todos/TodoHeader.vue";
import TodoInput from "@/components/todos/TodoInput.vue";
</script>

<template>
    <div class="container text-center mt-3">
      <div class="row">
        <div class="col">
          <todo-header></todo-header>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <todo-input></todo-input>
        </div>
      </div>
    </div>
</template>

<style scoped>

</style>