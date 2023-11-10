<script setup>
import { ref, provide } from 'vue';
  import Sidebar from '@/components/Sidebar.vue';
import { getCookie } from "@/assets/js/util/cookie.js"
import KMap from '@/components/KMap.vue';
const id = ref("");
const cookieId = getCookie("id");
if (cookieId) {
  id.value = cookieId;
}
provide("id", id);
</script>

<template>
  <Sidebar></Sidebar>
  <KMap />
</template>

<style scoped></style>
