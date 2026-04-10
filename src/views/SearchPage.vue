<template>
  <div class="search-page">
    <div class="seach-container">
      <div>Search Results for: {{ route.params.searchText }}</div>
      <div class="search-result">
        <div v-for="showObj in showsStore.searchResult" :key="showObj.show.id">
          <RouterLink :to="`/show-details/${showObj.show.id}`">
            <ShowCard :imgUrl="showObj.show.image.medium"></ShowCard>
          </RouterLink>
        </div>
      </div>
      <div v-if="noShowsFound">No shows found!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useShowsStore } from '@/store/shows';
import ShowCard from '@/components/ShowCard.vue';

const route = useRoute();
const showsStore = useShowsStore();

const noShowsFound = ref(false);

const performSearch = async (query) => {
  if (!query) return;
  try {
    showsStore.searchResult = [];
    noShowsFound.value = false;
    await showsStore.serchShows(query);
    if(showsStore.searchResult.length === 0) {
      noShowsFound.value = true;
    }
  } catch (err) {
    console.error('Failed to search shows', err);
  }
};

onMounted(() => {
  performSearch(route.params.searchText);
});


watch(
  () => route.params.searchText,
  (newSearchText) => {
    performSearch(newSearchText);
  }
);
</script>

<style scoped>
.search-page {
  background-color: rgba(26, 29, 41, 1);
  min-height: 100vh;
  font-size: 2rem;
  color: var(--clr-neutral-200);

  .seach-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    padding-top: 6rem;
  
    .search-result {
      padding-block: 2rem;
      display: flex;
      gap: 20px;
      flex-wrap: wrap;
    }
  }
}
</style>
