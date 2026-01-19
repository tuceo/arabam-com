<template>
  <div class="rounded bg-white shadow-sm">
    <div class="border-b-2 border-red-600 p-5 text-2xl font-bold text-red-600">
      {{ props.carDetail.priceFormatted }}
    </div>

    <div class="p-5">
      <div
        v-for="prop in props.carDetail.properties"
        :key="prop.name"
        class="flex justify-between pb-5 text-sm"
      >
        <span class="font-semibold text-gray-600">{{ prop.name.toUpperCase() }}</span>
        <span class="text-gray-800">{{ prop.value }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="font-semibold text-gray-600">İLAN TARİHİ</span>
        <span class="text-gray-800">{{ props.carDetail.dateFormatted }}</span>
      </div>
    </div>

    <div class="border-t border-gray-200 p-5 text-center">
      <div class="mb-5 flex items-center gap-2.5">
        <div class="bg-gray-600 flex h-10 w-10 items-center justify-center rounded-full font-bold">
          {{ props.carDetail.userInfo.nameSurname[0] }}
        </div>
        <p class="m-0 font-bold">{{ props.carDetail.userInfo.nameSurname }}</p>
      </div>
      <button class="w-full rounded bg-red-600 p-2 font-bold text-white border-none">
        {{ props.carDetail.userInfo.phoneFormatted }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CarDetail } from '@/utils/types'

const props = defineProps<{
  carDetail: CarDetail
}>()
</script>
