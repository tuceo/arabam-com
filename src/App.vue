<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="page-header">
    <a href="/"> arabam<span>.com</span> </a>
  </header>

  <main class="page-content">
    <RouterView />
  </main>
</template>

<style scoped>
.page-header {
  background: var(--color-white);
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.06);
  padding: 20px 70px;
}

.page-header a {
  text-decoration: none;
  color: var(--color-red);
  font-size: 25px;
  font-weight: bold;
}

.page-header a span {
  color: var(--color-text-main);
}

.page-content {
  margin: 20px 70px;
}
</style>
