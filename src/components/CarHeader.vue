<template>
  <header class="mb-5">
    <h1 class="text-lg text-gray-800">{{ props.carDetail.title }}</h1>
    <p class="text-sm text-gray-600">
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
