<template>
  <div class="header-container">
    <header class="app-header">
      <div class="header-items-left">
        <div class="logo">
          <RouterLink to="/">
            <img :src="logo" alt="TubeTrack Logo" />
          </RouterLink>
        </div>
        <nav class="main-nav">
          <ul>
            <li>
              <RouterLink to="/">
                <div>HOME</div>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
      <div class="header-items-right">
        <div class="search">
          <RouterLink to="/search">
            <img class="search-icon" :src="searchIcon" alt="Search Shows Icon" />
          </RouterLink>
        </div>
        <div class="profile-invoker">
          <img :src="userIcon" alt="Profile Inkover" />
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>
import logo from '@/assets/icons/TubeTrack-Logo.png';
import searchIcon from '@/assets/icons/search-icon.svg';
import userIcon from '@/assets/icons/user-icon.svg';
</script>

<style scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  background: rgba(0, 0, 0, 0.9);

  .app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
    margin: 0 auto;
    padding: 1rem 2rem;
    position: relative;

    .header-items-left,
    .header-items-right {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .main-nav ul li a {
      color: var(--clr-neutral-200);
      transition: color 0.1s;

      &:hover {
        color: var(--clr-primary-400);
      }
    }

    .logo {
      width: 6rem;

      @media screen and (min-width: 768px) {
        width: 10rem;
      }
    }
  }
}
</style>
