<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-white p-5 md:px-10 shadow-sm">
    <a href="/" class="text-xl font-bold text-red-600 no-underline">
      arabam<span class="text-gray-800">.com</span>
    </a>
  </header>

  <main class="bg-gray-100 p-5 md:px-10">
    <RouterView />
  </main>
</template>
