<template>
  <div class="show-card">
    <img :src="imgUrl" alt="">
  </div>
</template>

<script setup>
const props = defineProps(['imgUrl']);
</script>

<style scoped>
  .show-card {
    width: 10rem;
    transition: transform .2s;

    &:hover {
      transform: scale(1.1);
    }

    img {
      border-radius: 4px;
    }
  }
</style>
