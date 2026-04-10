<template>
  <div class="show-details" :style="heroStyle">
    <div class="overlay">
      <div v-if="showsStore.showDetails" class="content">
        <h1 class="show-title">{{showsStore.showDetails?.name}}</h1>
        <div class="metadata">
          <span class="badge rating">{{ showsStore.showDetails?.rating?.average || 'N/A' }}</span>
          <span class="text-info">{{ showsStore.showDetails?.runtime }} min</span>
        </div>
        <div class="genres-row">
          {{ formattedGenres }}
        </div>
        <AppButton class="watch-button" btnText="Watch" @click="watchButtonHandler"></AppButton>
        <div class="summary" v-html="showsStore.showDetails?.summary"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useShowsStore } from '@/store/shows';
import AppButton from '@/components/AppButton.vue';
import { useWatchShow } from '@/composables/useWatchShow';

const route = useRoute();
const showsStore = useShowsStore();
const { watchShow } = useWatchShow();

const heroImage = computed(() => showsStore.showDetails?.image?.original || '');
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

const formattedGenres = computed(() => {
  return showsStore.showDetails?.genres?.join(', ') || '';
});

onMounted(async () => {
  try {
    showsStore.showDetails = null;
    await showsStore.fetchShowDetails(route.params.id);
  } catch (err) {
    console.error('Failed to load shows', err);
  }
});

const watchButtonHandler = () => {
  watchShow(showsStore.showDetails);
}
</script>

<style scoped>
.show-details {
  height: 100vh;
  background-size: cover;
  background-repeat: no-repeat;
  position: relative;
  color: var(--clr-neutral-300);

  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
  }

  .content {
    max-width: 70%;
    padding-bottom: 10rem;
    
    .show-title {
      margin-bottom: .5rem;
      font-size: 5rem;
    }

    .metadata {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: .25rem;
      font-family: sans-serif;
      
      .badge {
        background-color: var(--clr-primary-400);;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: bold;
        color: var(--clr-neutral-200);;
      }

      .text-info {
        font-size: 1.2rem;
        color: var(--clr-neutral-200);
      }
    }

    .genres-row {
      margin-bottom: 1.5rem;
      font-size: .9rem;
      color: var(--clr-neutral-200);
      font-weight: 400;
    }

    .watch-button {
      margin-block: 2rem;
    }

    .summary {
      font-size: 1.25rem;
    }
  }
}
</style>