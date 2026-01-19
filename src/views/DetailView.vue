<template>
  <button
    @click="$router.back()"
    class="mb-2 cursor-pointer border-none bg-transparent p-0 text-gray-800 hover:text-gray-600"
  >
    <span class="text-lg">←</span> İlan Listesine Dön
  </button>

  <div v-if="loading" class="">Yükleniyor...</div>

  <div v-else-if="error">Bir hata oluştu.</div>

  <template v-else>
    <CarDetails v-if="carDetail" :carDetail="carDetail" />

    <div v-else>İlan detayı bulunamadı.</div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import axios from 'axios'
import type { CarDetail } from '@/utils/types'
import { useRoute } from 'vue-router'
import CarDetails from '../components/CarDetail.vue'

const router = useRoute()

const carDetail = ref<CarDetail | null>(null)
const loading = ref(true)
const error = ref(false)

const fetchCarDetail = async () => {
  try {
    const response = await axios.get(
      'https://sandbox.arabamd.com/api/v1/detail?id=' + router.params.id,
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
