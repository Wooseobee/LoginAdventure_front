<script setup>
import { ref } from "vue";
import { useTodoStore } from "@/stores/todo";

const todoStore = useTodoStore();

const title = ref("");

const addTodo = () => {
  if (title.value.length > 0) {
    todoStore.addTodo(title.value);
    title.value = "";
  }
};
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="input-group mb-3">
        <button class="btn btn-outline-secondary" type="button" @click="addTodo">비밀번호 변경</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
