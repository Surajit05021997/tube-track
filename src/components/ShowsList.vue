<template>
  <div class="shows-list">
    <div class="shows-list-title">{{ props.title }}</div>
    <div class="show-card-container">
      <div v-for="show in showsStore.showsByGenre[title]">
        <RouterLink :to="`/show-details/${show.id}`">
          <ShowCard :imgUrl="show.image.medium"></ShowCard>
        </RouterLink>
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

  .shows-list-title {
    font-weight: 600;
    font-size: 1.5rem;
    padding-inline: 1rem;
    color: var(--clr-neutral-200);
  }
}

.show-card-container {
  display: flex;
  overflow-x: scroll;
  gap: 20px;
  padding: 1rem;
  /* For Firefox */
  scrollbar-width: none; 
  /* For IE and Edge */
  -ms-overflow-style: none; 
}

/* For Chrome, Safari, and newer Edge */
.show-card-container::-webkit-scrollbar {
  display: none;
}
</style>
