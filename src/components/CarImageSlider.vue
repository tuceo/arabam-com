<template>
  <div class="image-container">
    <img :src="formatPhoto(props.carDetail.photos[0])" :alt="props.carDetail.title" />
  </div>
</template>

<script setup lang="ts">
import type { CarDetail } from '@/utils/types'

const props = defineProps<{
  carDetail: CarDetail
}>()

const formatPhoto = (photoUrl: string | undefined): string => {
  return photoUrl ? photoUrl.replace('{0}', '800x600') : ''
}
</script>

<style scoped>
.image-container img {
  width: 100%;
  height: 450px;
  object-fit: cover;
  border-radius: 4px;
  border: 1px solid var(--color-gray);
}
</style>
