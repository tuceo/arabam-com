<template>
  <div
    @click="goToDetail(props.car.id)"
    class="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
  >
    <div class="relative h-48 w-full">
      <img
        :src="formatPhoto(props.car.photo)"
        :alt="props.car.title"
        class="h-full w-full object-cover"
      />
    </div>

    <div class="flex flex-col p-4">
      <h3 class="line-clamp-2 text-sm font-semibold text-gray-800 h-10">
        {{ props.car.title }}
      </h3>

      <div class="mt-3 flex items-center justify-between">
        <span class="text-xs text-gray-600">{{ props.car.modelName }}</span>
        <span class="text-base font-bold text-red-600">
          {{ props.car.priceFormatted }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Car } from '@/utils/types'
import { useRouter } from 'vue-router'

const props = defineProps<{
  car: Car
}>()

const router = useRouter()

const goToDetail = (id: number) => {
  router.push({ name: 'detail', params: { id } })
}

const formatPhoto = (photoUrl: string): string => {
  return photoUrl.replace('{0}', '800x600')
}
</script>
