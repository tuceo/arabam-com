<template>
  <div class="description-container">
    <h3>İlan Açıklaması</h3>
    <div class="html-content" v-html="props.description"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  description: string
}>()
</script>

<style scoped>
.description-container {
  margin-top: 40px;
  padding: 15px;
  background: var(--color-white);
  border-radius: 4px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.06);
}
.html-content {
  color: var(--color-text-main);
  font-size: 14px;
}
</style>
