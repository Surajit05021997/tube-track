<template>
  <div class="not-found-container">
    <div class="content">
      <h1 class="error-code">404</h1>
      <h2 class="error-message">Page not found!</h2>
      <RouterLink to="/">
        <AppButton btnText="Back to Home" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import AppButton from '@/components/AppButton.vue';
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: var(--clr-neutral-800);
  color: var(--clr-neutral-200);
  padding: 2rem;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
  
    .error-code {
      font-size: 10rem;
      font-weight: var(--fw-black);
      margin: 0;
      color: var(--clr-neutral-200);
    }
  
    .error-message {
      font-size: 2rem;
      margin-block: 1rem;
    }
  }
}
</style>
