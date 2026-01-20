<template>
  <button
    @click.stop="compStore.toggleSelection(props.car)"
    class="flex items-center gap-2 cursor-pointer rounded-full p-2 shadow-md"
    :class="
      compStore.isSelected(props.car.id)
        ? 'bg-red-600 text-white border-red-600'
        : 'bg-white text-gray-700 border-gray-100 hover:text-red-600'
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-3 w-3"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
      />
    </svg>
    <span class="font-bold text-[10px]">
      {{ compStore.isSelected(props.car.id) ? 'SEÇİLDİ' : 'KARŞILAŞTIR' }}
    </span>
  </button>
</template>

<script setup lang="ts">
import type { Car } from '@/utils/types'
import { useComparisonStore } from '@/store/comparisonStore'

const props = defineProps<{
  car: Car
}>()

const compStore = useComparisonStore()
</script>
