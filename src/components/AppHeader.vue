<template>
  <div class="header-container">
    <header class="app-header">
      <div class="header-items-left">
        <div class="logo">
          <RouterLink to="/">
            <img :src="logo" alt="TubeTrack Logo" />
          </RouterLink>
        </div>
        <div>
          <nav class="main-nav">
            <ul>
              <li>
                <RouterLink to="/">
                  <span>HOME</span>
                </RouterLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div class="header-items-right">
        <div class="search">
          <img class="search-icon" :src="searchIcon" alt="" />
          <input class="search-bar" type="text" v-model="searchText" @keyup.enter="searchShow">
        </div>
        <div class="profile-invoker">
          <img :src="userIcon" alt="" />
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import logo from '@/assets/icons/TubeTrack-Logo.png';
import searchIcon from '@/assets/icons/search-icon.svg';
import userIcon from '@/assets/icons/user-icon.svg';

const searchText = ref('');

const router = useRouter();

const searchShow = () => {
  if(searchText.value.trim()) {
    router.push({ path: `/search/${searchText.value}` });
    searchText.value = '';
  }
}
</script>

<style scoped>
.header-container {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgb(0, 0, 0, .9);

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    width: 100%;
    position: relative;

    .header-items-left,
    .header-items-right {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .main-nav ul li a {
      display: flex;
      align-items: end;
      gap: .5rem;
      color: var(--clr-neutral-200);
      transition: color .1s;

      &:hover {
        color: var(--clr-primary-400);
      }
    }

    .logo {
      width: 10rem;
    }

    .search {
      display: flex;
      align-items: center;
      gap: .5rem;
      position: relative;

      .search-icon {
        position: absolute;
        left: 8px;
      }

      .search-bar {
        background-color: transparent;
        border: 1px solid rgba(255, 255, 255, 0.259);
        color: white;
        padding: 8px 15px 8px 36px;
        border-radius: 4px;
        outline: none;
      }
    }
  }
}
</style>
