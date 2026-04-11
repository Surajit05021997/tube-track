<template>
  <button class="app-button">
    <span class="button-text">{{ btnText }}</span>
  </button>
</template>

<script setup>
const props = defineProps(['btnText']);
</script>

<style scoped>
.app-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--clr-neutral-200);
  color: var(--clr-neutral-800);
  font-size: var(--fs-200);
  font-weight: var(--fw-bold);
  text-transform: uppercase;
  padding: 0.6em 1.8em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.1s;

  &:hover {
    background-color: var(--clr-primary-400);
    color: var(--clr-neutral-200);
  }
}
</style>
