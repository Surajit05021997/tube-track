<template>
  <div class="search-page">
    <div class="seach-container">
      <div class="search">
        <img class="search-icon" :src="searchIcon" alt="Search Icon" />
        <input class="search-bar" type="text" v-model="searchText" @keyup.enter="searchShow">
      </div>
      <div>Search Results for: {{ route.params.searchText }}</div>
      <div class="loading" v-if="isLoading">
        <img :src="loadingIcon" alt="">
      </div>
      <div v-if="!isLoading" class="search-result">
        <div v-for="showObj in showsStore.searchResult" :key="showObj.show.id">
          <RouterLink :to="`/show-details/${showObj.show.id}`">
            <ShowCard :imgUrl="showObj.show.image.medium"></ShowCard>
          </RouterLink>
        </div>
      </div>
      <div v-if="noShowsFound">No shows found!</div>
      <div class="search-result-error" v-if="searchResultError">Some thing went wrong - Try Again!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useShowsStore } from '@/store/shows';
import ShowCard from '@/components/ShowCard.vue';
import searchIcon from '@/assets/icons/search-icon.svg';
import loadingIcon from '@/assets/icons/loading-icon.svg';

const route = useRoute();
const router = useRouter();
const showsStore = useShowsStore();

const searchText = ref('');
const noShowsFound = ref(false);
const searchResultError = ref(false);
const isLoading = ref(false);

showsStore.searchResult = [];

const searchShow = () => {
  if(searchText.value.trim()) {
    router.push({ path: `/search/${searchText.value}` });
    searchText.value = '';
  }
}

const performSearch = async (query) => {
  if (!query) return;
  try {
    isLoading.value = true;
    showsStore.searchResult = [];
    searchResultError.value = false;
    noShowsFound.value = false;
    await showsStore.serchShows(query);
    if(showsStore.searchResult.length === 0) {
      noShowsFound.value = true;
    }
  } catch (err) {
    searchResultError.value = true;
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  performSearch(route.params.searchText);
});

watch(
  () => route.params.searchText,
  (newSearchText) => {
    showsStore.searchResult = [];
    performSearch(newSearchText);
  }
);
</script>

<style scoped>
.search-page {
  background-color: var(--clr-neutral-800);
  min-height: 100vh;
  font-size: 2rem;
  color: var(--clr-neutral-200);

  .seach-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    padding-top: 6rem;

    .search {
      display: flex;
      align-items: center;
      gap: .5rem;
      position: relative;
      padding-block: 1rem;
      font-size: 1.5rem;

      .search-icon {
        position: absolute;
        left: 8px;
      }

      .search-bar {
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, 0.259);
        color: var(--clr-neutral-200);
        padding: 0.5rem 1rem .5rem 2.25rem;
        border-radius: 4px;
        outline: none;
      }
    }
  
    .search-result {
      padding-block: 2rem;
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
    }
  }

  .search-result-error {
    text-align: center;
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--clr-neutral-800);
  
    img {
      width: 100px;
    }
  }
}
</style>
