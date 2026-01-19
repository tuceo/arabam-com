<template>
  <table class="w-full border-collapse text-sm">
    <thead>
      <tr>
        <th class="border-b-2 border-gray-200 p-3 px-2 text-left">Model</th>
        <th class="border-b-2 border-gray-200 p-3 px-2 text-left">İlan Başlığı</th>
        <th class="border-b-2 border-gray-200 p-3 px-2 text-left">Yıl</th>
        <th class="border-b-2 border-gray-200 p-3 px-2 text-left">Kilometre</th>
        <th class="border-b-2 border-gray-200 p-3 px-2 text-left">Renk</th>
        <th class="border-b-2 border-gray-200 p-3 px-2 text-left">Fiyat</th>
        <th class="border-b-2 border-gray-200 p-3 px-2 text-left">Tarih</th>
        <th class="border-b-2 border-gray-200 p-3 px-2 text-left">İl / İlçe</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="car in props.cars"
        :key="car.id"
        class="cursor-pointer border-b border-gray-200 hover:bg-red-100"
        @click="goToDetail(car.id)"
      >
        <td class="p-2">
          <div class="flex items-center gap-5">
            <img
              :src="formatPhoto(car.photo)"
              :alt="car.title"
              class="h-24 w-32 min-w-32 rounded object-cover"
            />
            <span>{{ car.modelName }}</span>
          </div>
        </td>

        <td class="max-w-60 p-2">{{ car.title }}</td>

        <td class="p-2">{{ getPropValue(car, 'year') }}</td>
        <td class="p-2">{{ getPropValue(car, 'km') }}</td>
        <td class="p-2">{{ getPropValue(car, 'color') }}</td>

        <td class="whitespace-nowrap p-2 text-sm font-bold text-red-600">
          {{ car.priceFormatted }}
        </td>

        <td class="p-2">{{ car.dateFormatted }}</td>

        <td class="p-2">
          {{ car.location.cityName }}<br />
          <small class="text-gray-600">{{ car.location.townName }}</small>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { Car } from '@/utils/types'
import { useRouter } from 'vue-router'

const props = defineProps<{
  cars: Car[]
}>()

const router = useRouter()

const goToDetail = (id: number) => {
  router.push({ name: 'detail', params: { id } })
}

const getPropValue = (car: Car, propName: string): string => {
  const property = car.properties.find((p) => p.name === propName)
  return property ? property.value : '-'
}

const formatPhoto = (photoUrl: string): string => {
  return photoUrl.replace('{0}', '800x600')
}
</script>
