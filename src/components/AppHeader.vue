<template>
  <header class="app-header">
    <div class="header-items-left">
      <div class="logo">
        <img :src="logo" alt="TubeTrack Logo">
      </div>
      <div class="">
        <nav class="main-nav">
          <ul>
            <li>
              <img :src="homeIcon" alt="">
              <span>Home</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <div class="header-items-right">
      <div class="search">
        <img :src="searchIcon" alt="">
        <input type="text">
      </div>
      <div class="profile-invoker">
        <img :src="userIcon" alt="">
      </div>
    </div>
  </header>
</template>

<script setup>
import logo from '@/assets/icons/TubeTrack-Logo.jpg';
import homeIcon from '@/assets/icons/home-icon.svg';
import searchIcon from '@/assets/icons/search-icon.svg';
import userIcon from '@/assets/icons/user-icon.svg';
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1400px;
  margin: auto;
  padding: 1rem 2rem;

  .header-items-left, .header-items-right {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .main-nav {
    ul li {
      display: flex;
      align-items: center;
      gap: .5rem;
    }
  }

  .logo {
    width: 10rem;
  }

  .search {
    display:flex;
    align-items: center;
    gap: .5rem;
  }
}
</style>
