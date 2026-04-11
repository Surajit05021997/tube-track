<template>
  <div class="loading" v-if="isLoading">
    <img :src="loadingIcon" alt="Loading Homepage">
  </div>
  <div class="top-shows" v-if="showsStore.topShows && !isLoading && !showsError" :style="heroStyle">
    <div class="overlay">
      <div class="content">
        <h1 class="top-show-title">{{ showsStore.topShows?.name }}</h1>
        <div class="top-show-summary" v-html="showsStore.topShows?.summary"></div>
        <AppButton class="watch-button" btnText="Watch" @click="watchButtonHandler"></AppButton>
      </div>
    </div>
  </div>
  <div class="show-list-by-genre" v-if="showsStore.shows.length && !isLoading && !showsError">
    <div v-for="genre in showsStore.allGenres">
      <ShowsList :title="genre"></ShowsList>
    </div>
  </div>
  <div class="show-error" v-if="showsError">
    <h1>Failed to load shows!</h1>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useShowsStore } from '@/store/shows';
import { useWatchShow } from '@/composables/useWatchShow';
import ShowsList from '@/components/ShowsList.vue';
import AppButton from '@/components/AppButton.vue';
import loadingIcon from '@/assets/icons/loading-icon.svg';

const showsStore = useShowsStore();
const { watchShow } = useWatchShow();

const showsError = ref(false);
const isLoading = ref(false);

const heroImage = computed(() => showsStore.topShows?.image?.original || '');
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
    showsError.value = false;
    isLoading.value = true;
    await showsStore.fetchShows();
  } catch (err) {
    showsError.value = true;
  } finally {
    isLoading.value = false;
  }
});

const watchButtonHandler = () => {
  watchShow(showsStore.topShows);
}
</script>

<style scoped>
.top-shows {
  height: 100vh;
  position: relative;
  color: var(--clr-neutral-200);
    
  .overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: flex-end;
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;

    .content {
      max-width: 100%;
      padding-bottom: 6rem;

      @media screen and (min-width: 768px) {
        padding-bottom: 10rem;
      }

      @media screen and (min-width: 1024px) {
        max-width: 70%;
      }

      .top-show-title {
        margin: 0 0 0.5rem 0;
        font-size: 3rem;

        @media screen and (min-width: 768px) {
          font-size: 5rem;
        }
      }

      .top-show-summary {
        font-size: 1rem;
        text-align: justify;

        @media screen and (min-width: 768px) {
          font-size: 1.25rem;
        }

        @media screen and (min-width: 1024px) {
          text-align: left;
        }
      }

      .watch-button {
        margin-block: 2rem;
      }
    }
  }
}

.show-list-by-genre {
  background-color: var(--clr-neutral-800);
}

.show-error {
  min-height: 100vh;
  background-color: var(--clr-neutral-800);
  color: var(--clr-neutral-200);
  display: flex;
  justify-content: center;
  align-items: center;
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
