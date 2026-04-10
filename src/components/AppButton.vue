<template>
  <button class="app-button">
    <span class="button-text">{{ btnText }}</span>
  </button>
</template>

<script setup>
const props = defineProps(['btnText']);
</script>

<style>
.app-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: var(--clr-neutral-200);
  color: var(--clr-neutral-800);
  font-size: var(--fs-200);
  font-weight: 700;
  text-transform: uppercase;
  padding: 0.6em 1.8em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.1s ease;
}

.app-button:hover {
  background-color: var(--clr-primary-400);
  color: var(--clr-neutral-200);
}
</style>
