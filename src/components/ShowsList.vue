<template>
  <div class="shows-list">
    <div class="shows-list-title">{{ props.title }}</div>
    <button class="nav-btn left" v-if="isScrollable" @click="handleScroll('left')">
      <img :src="arrowIcon" alt="Scroll Left">
    </button>
    <button class="nav-btn right" v-if="isScrollable" @click="handleScroll('right')">
      <img :src="arrowIcon" alt="Scroll Right">
    </button>
    <div ref="scrollContainer" class="show-card-container">
      <div v-for="show in showsStore.showsByGenre[title]">
        <RouterLink :to="`/show-details/${show.id}`">
          <ShowCard :imgUrl="show.image.medium"></ShowCard>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useShowsStore } from '@/store/shows';
import ShowCard from './ShowCard.vue';
import arrowIcon from '@/assets/icons/arrow-icon.svg';

const props = defineProps(['title']);

const showsStore = useShowsStore();

const scrollContainer = ref(null);
const isScrollable = ref(false);

const handleScroll = (direction) => {
  if (scrollContainer.value) {
    const scrollAmount = scrollContainer.value.clientWidth * 0.8;
    
    scrollContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  }
};

const checkScrollability = () => {
  if (scrollContainer.value) {
    const { scrollWidth, clientWidth } = scrollContainer.value;
    isScrollable.value = scrollWidth > clientWidth;
  }
};

onMounted(checkScrollability);
</script>

<style scoped>
.shows-list {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;

  .shows-list-title {
    font-weight: var(--fw-medium);
    font-size: var(--fs-400);
    padding-inline: 1rem;
    color: var(--clr-neutral-200);
  }

  .nav-btn {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
  
    &.left {
      right: 4rem;
      top: 2.2rem;
      transition: transform 0.1s;
  
      &:hover {
        transform: scale(1.2);
      }
    }
  
    &.right {
      right: 2rem;
      top: 2.2rem;
      transform: rotate(180deg);
      transition: transform 0.1s;
  
      &:hover {
        transform: rotate(180deg) scale(1.2);
      }
    }
  }

  .show-card-container {
    display: flex;
    overflow-x: scroll;
    gap: 1.25rem;
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
}
</style>
