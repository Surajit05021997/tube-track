<template>
  <div class="shows-list">
    <div>{{ props.title }}</div>
    <div class="show-card-container">
      <div v-for="show in showsStore.showsByGenre[title]">
        <ShowCard :imgUrl="show.image.medium"></ShowCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import ShowCard from './ShowCard.vue';
import { useShowsStore } from '@/store/shows';
const props = defineProps(['title']);

const showsStore = useShowsStore();
</script>

<style scoped>
.shows-list {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.show-card-container {
  display: flex;
}
</style>
