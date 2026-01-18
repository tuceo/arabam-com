<template>
  <header class="detail-header">
    <h1>{{ props.carDetail.title }}</h1>
    <p class="location-text">
      {{ props.carDetail.location.cityName }}, {{ props.carDetail.location.townName }}
    </p>
  </header>
</template>

<script setup lang="ts">
import type { CarDetail } from '@/utils/types'

const props = defineProps<{
  carDetail: CarDetail
}>()
</script>

<style scoped>
.detail-header h1 {
  font-size: 18px;
  color: var(--color-text-main);
}
.location-text {
  color: var(--color-text-light);
  font-size: 13px;
}
</style>
