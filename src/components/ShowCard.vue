<template>
  <div class="shows-card">
    <img :src="imgUrl" alt="">
  </div>
</template>

<script setup>
const props = defineProps(['imgUrl'])
</script>

<style scoped>
  .show-card {
    height: 10rem;
    border-radius: 10px;
  }
</style>
