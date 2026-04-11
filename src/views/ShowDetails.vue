<template>
  <div class="loading" v-if="isLoading">
    <img :src="loadingIcon" alt="">
  </div>
  <div class="show-details" v-if="!isLoading && !showDetailsError" :style="heroStyle">
    <div class="overlay">
      <div v-if="showsStore.showDetails" class="content">
        <h1 class="show-title">{{showsStore.showDetails?.name}}</h1>
        <div class="metadata">
          <span class="badge rating">{{ showsStore.showDetails?.rating?.average || 'N/A' }}</span>
          <span class="text-info">{{ showsStore.showDetails?.runtime }} {{showsStore.showDetails?.runtime ? 'min': ''}}</span>
        </div>
        <div class="genres-row">
          {{ formattedGenres }}
        </div>
        <AppButton class="watch-button" btnText="Watch" @click="watchButtonHandler"></AppButton>
        <div class="summary" v-html="showsStore.showDetails?.summary"></div>
      </div>
    </div>
  </div>
  <div v-if="showDetailsError">
    <h1 class="show-detail-error">Failed to load show details!</h1>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useShowsStore } from '@/store/shows';
import { useWatchShow } from '@/composables/useWatchShow';
import AppButton from '@/components/AppButton.vue';
import loadingIcon from '@/assets/icons/loading-icon.svg';

const route = useRoute();
const showsStore = useShowsStore();
const { watchShow } = useWatchShow();

const showDetailsError = ref(false);
const isLoading = ref(false);

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
    isLoading.value = true;
    showsStore.showDetails = null;
    showDetailsError.value = false;
    await showsStore.fetchShowDetails(route.params.id);
  } catch (err) {
    showDetailsError.value = true;
  } finally {
    isLoading.value = false;
  }
});

const watchButtonHandler = () => {
  watchShow(showsStore.showDetails);
}
</script>

<style scoped>
.show-details {
  height: 100vh;
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
    max-width: 100%;
    padding-bottom: 6rem;

    @media screen and (min-width: 768px) {
      padding-bottom: 10rem;
    }

    @media screen and (min-width: 1024px) {
      max-width: 70%;
    }
    
    .show-title {
      margin-bottom: 0.5rem;
      font-size: 3rem;

      @media screen and (min-width: 768px) {
        font-size: 5rem;
      }
    }

    .metadata {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.25rem;
      
      .badge {
        background-color: var(--clr-primary-400);;
        padding: 0.125em 0.375em;
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
      font-size: 0.9rem;
      color: var(--clr-neutral-200);
      font-weight: 400;

      @media screen and (min-width: 768px) {
        font-size: 0.8rem;
      }
    }

    .watch-button {
      margin-block: 2rem;
    }

    .summary {
      font-size: 1rem;
      text-align: justify;

      @media screen and (min-width: 768px) {
        font-size: 1.25rem;
      }

      @media screen and (min-width: 1024px) {
        text-align: left;
      }
    }
  }
}

.show-detail-error {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--clr-neutral-800);
  color: var(--clr-neutral-200);
}

.loading {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--clr-neutral-800);

  img {
    width: 100px;
  }
}
</style>
