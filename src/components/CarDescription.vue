<template>
  <div class="description-container">
    <h3>İlan Açıklaması</h3>
    <div class="html-content" v-html="props.carDetail.text"></div>
  </div>
</template>

<script setup lang="ts">
import type { CarDetail } from '@/utils/types'

const props = defineProps<{
  carDetail: CarDetail
}>()
</script>

<style scoped>
.description-container {
  margin-top: 40px;
  border-top: 1px solid var(--color-gray);
  padding-top: 20px;
}
.html-content {
  line-height: 1.6;
  color: var(--color-text-main);
  font-size: 14px;
}
</style>
