<script setup>

import {inject} from "vue";

const username = inject('username');
const email = inject('email');
</script>

<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <div class="alert alert-primary" role="alert">
          이름 : {{username}}
        </div>
      </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="alert alert-info" role="alert">
                이메일 : {{email}}
            </div>
        </div>
    </div>
  </div>
</template>

<style scoped></style>
