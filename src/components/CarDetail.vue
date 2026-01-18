<template>
  <CarHeader :carDetail="props.carDetail" />

  <div class="main-container">
    <CarImageSlider :carDetail="props.carDetail" />

    <CarInfo :carDetail="props.carDetail" />
  </div>

  <CarDescription :carDetail="props.carDetail" />
</template>

<script setup lang="ts">
import type { CarDetail } from '@/utils/types'
import CarHeader from './CarHeader.vue'
import CarInfo from './CarInfo.vue'
import CarImageSlider from './CarImageSlider.vue'
import CarDescription from './CarDescription.vue'

const props = defineProps<{
  carDetail: CarDetail
}>()
</script>

<style scoped>
.main-container {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 30px;
}
</style>
