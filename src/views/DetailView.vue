<template>
  <div v-if="loading" class="loading">Yükleniyor...</div>

  <div v-else-if="error">Bir hata oluştu.</div>

  <template v-else>
    <CarDetails v-if="carDetail" :carDetail="carDetail" />

    <div v-else>Bir hata oluştu.</div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { CarDetail } from '@/utils/types'
import { useRoute } from 'vue-router'
import CarDetails from '../components/CarDetail.vue'

const route = useRoute()

const carDetail = ref<CarDetail | null>(null)
const loading = ref(true)
const error = ref(false)

const fetchCarDetail = async () => {
  try {
    const response = await axios.get(
      'https://sandbox.arabamd.com/api/v1/detail?id=' + route.params.id,
    )
    carDetail.value = response.data
    console.log(response.data)
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCarDetail()
})
</script>
