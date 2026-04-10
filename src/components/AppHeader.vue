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
          <RouterLink to="/search">
            <img class="search-icon" :src="searchIcon" alt="" />
          </RouterLink>
        </div>
        <div class="profile-invoker">
          <img :src="userIcon" alt="" />
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
    }
  }
}
</style>
