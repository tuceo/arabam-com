<template>
  <button
    @click="$router.back()"
    class="mb-4 flex items-center gap-2 cursor-pointer border-none bg-transparent p-0 text-gray-800 hover:text-red-600 transition-colors"
  >
    <span class="text-xl leading-none">←</span> 
    <span class="text-sm font-semibold">İlan Listesine Dön</span>
  </button>

  <div v-if="loading" class="rounded border border-gray-200 bg-white p-10 text-center text-gray-600">
    Yükleniyor...
  </div>

  <div v-else-if="error" class="rounded border border-gray-200 bg-red-50 p-10 text-center text-red-600 font-bold">
    İlan detayları yüklenirken bir hata oluştu.
  </div>

  <template v-else>
    <CarDetails v-if="carDetail" :carDetail="carDetail" />
    <div v-else class="rounded border border-gray-200 bg-white p-10 text-center">
      İlan detayı bulunamadı.
    </div>
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