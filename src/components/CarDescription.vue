<template>
  <div class="mt-5 rounded bg-white p-5 shadow-sm">
    <h3>İlan Açıklaması</h3>
    <div class="text-sm text-gray-800" v-html="props.description"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  description: string
}>()
</script>
