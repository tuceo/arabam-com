<template>
  <div class="listing-header">
    <div class="options-group">
      <div class="selector">
        <label>Sıralama:</label>
        <select
          :value="`${sort}-${direction}`"
          @change="
            (e) => {
              const [s, d] = (e.target as HTMLSelectElement).value.split('-')
              sort = Number(s)
              direction = Number(d)
            }
          "
          class="custom-select"
        >
          <option value="0-0">Fiyata Göre Artan</option>
          <option value="0-1">Fiyata Göre Azalan</option>
          <option value="1-1">Tarihe Göre En Yeni</option>
          <option value="1-0">Tarihe Göre En Eski</option>
          <option value="2-1">Yıla Göre En Yeni</option>
          <option value="2-0">Yıla Göre En Eski</option>
        </select>
      </div>

      <div class="selector">
        <label>Görünüm:</label>
        <select v-model="itemsPerPage" class="custom-select">
          <option :value="20">20 Ürün</option>
          <option :value="50">50 Ürün</option>
        </select>
      </div>
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
const sort = ref(Number(route.query.sort) || 0)
const direction = ref(Number(route.query.direction) || 1)

const cars = ref<Car[]>([])
const loading = ref(true)
const error = ref(false)

const fetchCars = async () => {
  loading.value = true
  try {
    const response = await axios.get(
      'https://sandbox.arabamd.com/api/v1/listing?take=' +
        itemsPerPage.value +
        '&sort=' +
        sort.value +
        '&sortDirection=' +
        direction.value,
    )
    cars.value = response.data
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

watch([itemsPerPage, sort, direction], ([newLimit, newSort, newDirection]) => {
  router.replace({
    query: {
      ...route.query,
      limit: newLimit.toString(),
      sort: newSort.toString(),
      direction: newDirection.toString(),
    },
  })
})

watch(
  () => route.query,
  () => {
    fetchCars()
  },
  { deep: true },
)

onMounted(fetchCars)
</script>

<style scoped>
.listing-header {
  display: flex;
  justify-content: flex-end;
  padding: 15px 0;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 10px;
}

.options-group {
  display: flex;
  gap: 20px;
}

.selector {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--color-text-muted);
}

.custom-select {
  padding: 6px 12px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: white;
  font-size: 13px;
  outline: none;
}

.custom-select:focus {
  border-color: var(--color-primary);
}
</style>
