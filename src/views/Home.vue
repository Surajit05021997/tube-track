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
  if (heroImage.value) {
    return {
      backgroundImage: `linear-gradient(180deg,rgba(26, 29, 41, 0) 0%, rgba(26, 29, 41, 0.79) 60%, rgba(26, 29, 41, 1) 100%), url(${heroImage.value})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
    };
  }

  return { backgroundColor: '#111' };
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
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  color: #fff;
}
.top-shows .overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
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
