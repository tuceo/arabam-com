<template>
  <div class="container">
    <div v-if="loading" class="loading">Yükleniyor...</div>

    <div v-else-if="error" class="Error">Bir hata oluştu.</div>

    <table v-else class="car-table">
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
        <tr v-for="car in cars" :key="car.id" class="car-row">
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { Car } from '@/utils/types'

const cars = ref<Car[]>([])
const loading = ref(true)
const error = ref(false)

const getPropValue = (car: Car, propName: string): string => {
  const property = car.properties.find((p) => p.name === propName)
  return property ? property.value : '-'
}

const formatPhoto = (photoUrl: string): string => {
  return photoUrl.replace('{0}', '800x600')
}

const fetchCars = async () => {
  try {
    const response = await axios.get('https://sandbox.arabamd.com/api/v1/listing?take=20')
    cars.value = response.data
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCars()
})
</script>

<style scoped>
.container {
  padding: 20px;
  font-family: sans-serif;
}

.car-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.car-table th {
  padding: 12px 8px;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

.car-row {
  border-bottom: 1px solid #eee;
}

.car-row:hover {
  background-color: #ffedf1;
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
  color: #e40030;
  font-weight: bold;
  font-size: 15px;
  white-space: nowrap;
}

.location-td small {
  color: #999;
}
</style>
