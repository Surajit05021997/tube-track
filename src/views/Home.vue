<template>
  <div class="top-shows" :style="heroStyle">
    <div class="overlay">
      <div class="content">
        <h1>{{ showsStore.topShows[0]?.name }}</h1>
        <div v-html="showsStore.topShows[0]?.summary"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useShowsStore } from '@/store/shows';

const showsStore = useShowsStore();

const heroImage = computed(() => showsStore.topShows[0]?.image?.original || '');
const heroStyle = computed(() => {
  return heroImage.value
    ? { backgroundImage: `url(${heroImage.value})` }
    : { backgroundColor: '#111' };
});

onMounted(async () => {
  try {
    await showsStore.fetchShows();
  } catch (err) {
    console.error('Failed to load shows', err);
  }
});
</script>

<style scoped>
.top-shows {
  height: 80vh;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  color: #fff;
}
.top-shows .overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1));
  display: flex;
  align-items: flex-end;
  padding: 2rem;
}
.top-shows .content {
  max-width: 70%;
  padding-bottom: 10rem;
}
.top-shows h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
}
</style>
