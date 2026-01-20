<template>
  <aside class="rounded bg-white shadow-sm">
    <div class="p-5">
      <div class="mb-5">
        <h3 class="mb-2 border-b border-gray-200 pb-2 text-sm font-bold">Yıl</h3>
        <div class="flex gap-2">
          <input
            type="number"
            :value="minYear"
            @input="$emit('update:minYear', ($event.target as HTMLInputElement).value)"
            placeholder="Min"
            min="0"
            class="min-w-0 max-w-full w-full box-border rounded border border-gray-200 bg-gray-100 p-2 text-sm outline-none focus:border-red-600"
          />
          <input
            type="number"
            :value="maxYear"
            @input="$emit('update:maxYear', ($event.target as HTMLInputElement).value)"
            placeholder="Max"
            min="0"
            class="min-w-0 max-w-full w-full box-border rounded border border-gray-200 bg-gray-100 p-2 text-sm outline-none focus:border-red-600"
          />
        </div>
      </div>

      <div class="mb-5">
        <h3 class="mb-2 border-b border-gray-200 pb-2 text-sm font-bold">İlan Tarihi</h3>
        <div class="flex w-full flex-row gap-2 lg:flex-col">
          <div class="flex w-full flex-col gap-2">
            <label class="text-xs font-semibold text-gray-600">Başlangıç</label>
            <input
              type="date"
              :value="minDate"
              @input="$emit('update:minDate', ($event.target as HTMLInputElement).value)"
              class="min-w-0 max-w-full w-full box-border rounded border border-gray-200 bg-gray-100 p-2 text-sm font-sans outline-none focus:border-red-600"
            />
          </div>
          <div class="flex w-full flex-col gap-2">
            <label class="text-xs font-semibold text-gray-600">Bitiş</label>
            <input
              type="date"
              :value="maxDate"
              @input="$emit('update:maxDate', ($event.target as HTMLInputElement).value)"
              class="min-w-0 max-w-full w-full box-border rounded border border-gray-200 bg-gray-100 p-2 text-sm font-sans outline-none focus:border-red-600"
            />
          </div>
        </div>
      </div>

      <button
        @click="$emit('search')"
        class="w-full cursor-pointer rounded-md border-none bg-red-600 p-3 text-base font-bold text-white"
      >
        Ara
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  minYear: string | number
  maxYear: string | number
  minDate: string
  maxDate: string
}>()

defineEmits(['update:minYear', 'update:maxYear', 'update:minDate', 'update:maxDate', 'search'])
</script>
