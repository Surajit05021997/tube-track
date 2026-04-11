<template>
  <div class="show-card">
    <img :src="imgUrl" alt="Show Image">
  </div>
</template>

<script setup>
const props = defineProps(['imgUrl']);
</script>

<style scoped>
  .show-card {
    width: 6rem;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }

    @media screen and (min-width: 480px) {
      width: 8rem;
    }

    @media screen and (min-width: 768px) {
      width: 10rem;
    }

    img {
      border-radius: 4px;
    }
  }
</style>
