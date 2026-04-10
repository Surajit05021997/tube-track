<template>
  <div class="seach-container">
    <div class="search-bar">

    </div>
    <div class="search-result">

    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useShowsStore } from '@/store/shows';

const route = useRoute();
const showsStore = useShowsStore();

onMounted(async () => {
  try {
    showsStore.searchResult = [];
    await showsStore.serchShows(route.params.searchText);
  } catch (err) {
    console.error('Failed to search shows', err);
  }
});
</script>

<style scoped>

</style>
