<template>
  <div class="listing-options">
    <div class="page-size-selector">
      <label for="perPage">Görünüm:</label>
      <select id="perPage" v-model="itemsPerPage" class="custom-select">
        <option :value="20">20 Ürün</option>
        <option :value="50">50 Ürün</option>
      </select>
    </div>
  </div>

  <div v-if="loading">Yükleniyor...</div>

  <div v-else-if="error">Bir hata oluştu.</div>

  <template v-else>
    <ListTable v-if="cars.length > 0" :cars="cars" />

    <div v-else>Gösterilecek ilan bulunamadı.</div>
  </template>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import type { Car } from '@/utils/types'
import ListTable from '../components/ListTable.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const itemsPerPage = ref(Number(route.query.limit) || 20)

const cars = ref<Car[]>([])
const loading = ref(true)
const error = ref(false)

const fetchCars = async () => {
  loading.value = true
  try {
    const response = await axios.get(
      'https://sandbox.arabamd.com/api/v1/listing?take=' + itemsPerPage.value,
    )
    cars.value = response.data
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

watch(itemsPerPage, (newLimit) => {
  router.replace({
    query: { ...route.query, limit: newLimit.toString() },
  })
})

watch(
  () => route.query.limit,
  () => {
    fetchCars()
  },
)

onMounted(fetchCars)
</script>

<style scoped>
.listing-options {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;
}

.page-size-selector {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.custom-select {
  padding: 5px 10px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background-color: var(--color-white);
  color: var(--color-text-main);
  cursor: pointer;
  outline: none;
}

.custom-select:focus {
  border-color: var(--color-primary);
}
</style>
