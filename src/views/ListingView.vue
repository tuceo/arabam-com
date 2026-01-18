<template>
  <div v-if="loading">Yükleniyor...</div>

  <div v-else-if="error">Bir hata oluştu.</div>

  <template v-else>
    <ListTable v-if="cars.length > 0" :cars="cars" />

    <div v-else>Bir hata oluştu.</div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { Car } from '@/utils/types'
import ListTable from '../components/ListTable.vue'

const cars = ref<Car[]>([])
const loading = ref(true)
const error = ref(false)

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
