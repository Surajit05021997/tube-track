<template>
  <div>
    <h1>Home Page</h1>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useShowsStore } from '@/store/shows';

const showsStore = useShowsStore();

onMounted(async () => {
  try {
    await showsStore.fetchShows();
  } catch (err) {
    console.error('Failed to load shows', err);
  }
});
</script>
