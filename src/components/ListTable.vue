<template>
  <table class="car-table">
    <thead>
      <tr>
        <th>Model</th>
        <th>İlan Başlığı</th>
        <th>Yıl</th>
        <th>Kilometre</th>
        <th>Renk</th>
        <th>Fiyat</th>
        <th>Tarih</th>
        <th>İl / İlçe</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="car in props.cars" :key="car.id" class="car-row" @click="goToDetail(car.id)">
        <td class="model-td">
          <div class="model-info">
            <img :src="formatPhoto(car.photo)" :alt="car.title" class="car-photo" />
            <span>{{ car.modelName }}</span>
          </div>
        </td>

        <td class="title-td">{{ car.title }}</td>

        <td>{{ getPropValue(car, 'year') }}</td>
        <td>{{ getPropValue(car, 'km') }}</td>
        <td>{{ getPropValue(car, 'color') }}</td>

        <td class="price-td">{{ car.priceFormatted }}</td>

        <td>{{ car.dateFormatted }}</td>

        <td class="location-td">
          {{ car.location.cityName }}<br />
          <small>{{ car.location.townName }}</small>
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

<style scoped>
.car-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.car-table th {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 2px solid var(--color-gray);
}

.car-row {
  border-bottom: 1px solid var(--color-gray);
}

.car-row:hover {
  background-color: var(--color-light-red);
  cursor: pointer;
}

.car-table td {
  padding: 10px 8px;
}

.model-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.car-photo {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 4px;
}

.title-td {
  max-width: 250px;
}

.price-td {
  color: var(--color-red);
  font-weight: bold;
  font-size: 15px;
  white-space: nowrap;
}

.location-td small {
  color: var(--color-text-light);
}
</style>
