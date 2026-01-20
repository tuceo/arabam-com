<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      @click.self="$emit('close')"
    >
      <div
        class="flex h-full max-h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl transition-all"
      >
        <div class="flex items-center justify-between border-b border-gray-100 p-5">
          <div>
            <h2 class="text-xl font-bold text-gray-800">İlan Karşılaştırma</h2>
            <p class="text-xs text-gray-500 mt-1">Seçilen iki aracın teknik özellik kıyaslaması</p>
          </div>
          <button
            @click="$emit('close')"
            class="group cursor-pointer rounded-full p-2 transition-colors hover:bg-gray-100 border-none bg-transparent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-gray-400 group-hover:text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto overflow-x-auto p-4 md:p-6 text-gray-800">
          <table class="w-full border-collapse">
            <thead>
              <tr class="align-top">
                <th
                  class="w-1/3 min-w-30 p-2 text-left text-xs font-bold uppercase tracking-wider text-gray-400"
                >
                  Özellikler
                </th>
                <th v-for="car in cars" :key="car.id" class="w-1/3 min-w-40 p-2">
                  <div class="flex flex-col items-center">
                    <div
                      class="aspect-video w-full overflow-hidden rounded-lg border border-gray-100 shadow-sm mb-3"
                    >
                      <img
                        :src="car.photo.replace('{0}', '800x600')"
                        class="h-full w-full object-cover"
                        :alt="car.modelName"
                      />
                    </div>
                    <span class="text-center text-sm font-bold leading-tight">
                      {{ car.modelName }}
                    </span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr class="bg-red-50/50">
                <td class="p-4 text-sm font-bold">Fiyat</td>
                <td
                  v-for="car in cars"
                  :key="car.id"
                  class="p-4 text-center text-lg font-black text-red-600"
                >
                  {{ car.priceFormatted }}
                </td>
              </tr>
              <tr
                v-for="propName in allPropertyNames"
                :key="propName"
                class="transition-colors hover:bg-gray-50"
              >
                <td class="p-4 text-xs font-semibold text-gray-500">
                  {{ translatePropName(propName) }}
                </td>
                <td v-for="car in cars" :key="car.id" class="p-4 text-center text-sm">
                  {{ getCarPropValue(car, propName) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="flex justify-between border-t border-gray-100 bg-gray-50 p-4 px-6">
          <button
            @click="handleClearAndClose"
            class="text-sm font-semibold text-gray-500 hover:text-red-600 transition-colors cursor-pointer border-none bg-transparent"
          >
            Seçimi Temizle
          </button>
          <button
            @click="$emit('close')"
            class="rounded-lg bg-gray-800 px-8 py-2.5 text-sm font-bold text-white shadow-md hover:bg-gray-700 transition-all active:scale-95 cursor-pointer border-none"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Car } from '@/utils/types'
import { useComparisonStore } from '@/store/comparisonStore'

const props = defineProps<{
  isOpen: boolean
  cars: Car[]
}>()

const emit = defineEmits(['close'])
const compStore = useComparisonStore()

const propertyMap: Record<string, string> = {
  year: 'Yıl',
  km: 'Kilometre',
  color: 'Renk',
  gear: 'Vites',
  fuel: 'Yakıt',
}

const translatePropName = (name: string) => {
  return propertyMap[name.toLowerCase()] || name.toUpperCase()
}

const handleClearAndClose = () => {
  compStore.clearSelection()
  emit('close')
}

const allPropertyNames = computed(() => {
  const names = new Set<string>()
  props.cars.forEach((car) => {
    car.properties.forEach((p) => names.add(p.name))
  })
  return Array.from(names)
})

const getCarPropValue = (car: Car, name: string) => {
  const prop = car.properties.find((p) => p.name === name)
  return prop ? prop.value : '-'
}
</script>
