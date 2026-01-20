<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gray-100">
    <header class="bg-white p-5 shadow-sm lg:px-10">
      <a href="/" class="text-xl font-bold text-red-600 no-underline">
        arabam<span class="text-gray-800">.com</span>
      </a>
    </header>

    <main class="flex-1 p-5 lg:px-10">
      <RouterView />
    </main>
  </div>
</template>