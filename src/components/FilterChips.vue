<template>
  <div
    v-if="filters.length > 0"
    class="mb-2 rounded border border-dashed border-gray-200 bg-white p-5"
  >
    <div class="flex flex-wrap items-center gap-2">
      <div
        v-for="filter in filters"
        :key="filter.id"
        class="flex items-center rounded-2xl border border-gray-200 bg-gray-100 p-2 text-xs"
      >
        {{ filter.label }}
        <button
          @click="filter.clear"
          class="ml-2 cursor-pointer border-none bg-none text-lg leading-none text-gray-600"
        >
          &times;
        </button>
      </div>
      <button
        @click="$emit('clear-all')"
        class="cursor-pointer border-none bg-none text-xs text-red-600 underline"
      >
        Filtreleri Temizle
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FilterChip {
  id: string
  label: string
  clear: () => void
}

defineProps<{
  filters: FilterChip[]
}>()

defineEmits(['clear-all'])
</script>
