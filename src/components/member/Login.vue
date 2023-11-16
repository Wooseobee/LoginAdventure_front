<script setup>
import { ref } from 'vue'
import { login } from '@/api/member'
const id = ref('');
const pw = ref('');

function loginHandler() {
    console.log(id.value);
    console.log(pw.value);
    const param = { id: id.value, pw: pw.value };
    login(param, ({data}) => {
        console.log(data.tokens[0]);
        console.log(data.tokens[1]);
        sessionStorage.setItem("access_token", data.tokens[0]);
        sessionStorage.setItem("refresh_token", data.tokens[1]);
    }, (err) => {
        console.log(err);
    });
}
</script>

<template>
    <div>
        ID <input v-model="id"><br />
        PW <input v-model="pw"><br />
        <button @click="loginHandler">login</button>
    </div>
</template>

<style scoped></style>