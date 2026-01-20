<template>
  <CarHeader :carDetail="props.carDetail" />

  <div class="grid grid-cols-1 items-start gap-5 lg:grid-cols-[1fr_350px]">
    <CarImageSlider :photos="props.carDetail.photos" :modelName="props.carDetail.modelName" />

    <CarInfo :carDetail="props.carDetail" />
  </div>

  <CarDescription :description="props.carDetail.text" />
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
