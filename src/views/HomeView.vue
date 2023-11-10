<script setup>
import Sidebar from '@/components/common/Sidebar.vue'
import kakaoMap from "@/components/kakaoMap.vue";
</script>

<template>
    <Sidebar></Sidebar>
    <kakaoMap :latitude="37.5013" :longitude="127.0397" />
</template>

<style scoped>

</style>