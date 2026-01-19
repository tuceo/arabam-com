<template>
  <div class="page-layout">
    <FilterSidebar
      v-model:minYear="minYear"
      v-model:maxYear="maxYear"
      v-model:minDate="minDate"
      v-model:maxDate="maxDate"
      @search="handleSearch"
    />

    <main class="content">
      <div class="listing-header-container">
        <div class="listing-header">
          <div class="options-group">
            <div class="selector">
              <label>Sıralama:</label>
              <select
                :value="`${sort}-${direction}`"
                @change="handleSortChange"
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

        <FilterChips :filters="activeFilters" @clear-all="clearAllFilters" />
      </div>

      <div v-if="loading" class="loading-state">Yükleniyor...</div>
      <div v-else-if="error" class="error-state">Bir hata oluştu.</div>
      <template v-else>
        <ListTable v-if="cars.length > 0" :cars="cars" />
        <div v-else class="no-data">Gösterilecek ilan bulunamadı.</div>
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import axios from 'axios'
import type { Car } from '@/utils/types'
import { useRoute, useRouter } from 'vue-router'
import ListTable from '../components/ListTable.vue'
import FilterSidebar from '../components/FilterSidebar.vue'
import FilterChips from '../components/FilterChips.vue'

const route = useRoute()
const router = useRouter()

const minYear = ref(route.query.minYear?.toString() || '')
const maxYear = ref(route.query.maxYear?.toString() || '')
const minDate = ref(route.query.minDate?.toString() || '')
const maxDate = ref(route.query.maxDate?.toString() || '')
const itemsPerPage = ref(Number(route.query.limit) || 20)
const sort = ref(Number(route.query.sort) || 0)
const direction = ref(Number(route.query.direction) || 1)

const cars = ref<Car[]>([])
const loading = ref(true)
const error = ref(false)

const activeFilters = computed(() => {
  const filters = []
  const q = route.query
  if (q.minYear || q.maxYear) {
    filters.push({
      id: 'year',
      label: `Yıl: ${q.minYear || '*'} - ${q.maxYear || '*'}`,
      clear: () => {
        minYear.value = ''
        maxYear.value = ''
        handleSearch()
      },
    })
  }
  if (q.minDate || q.maxDate) {
    filters.push({
      id: 'date',
      label: `Tarih: ${q.minDate || '*'} - ${q.maxDate || '*'}`,
      clear: () => {
        minDate.value = ''
        maxDate.value = ''
        handleSearch()
      },
    })
  }
  return filters
})

const fetchCars = async () => {
  loading.value = true
  try {
    const response = await axios.get('https://sandbox.arabamd.com/api/v1/listing', {
      params: {
        take: itemsPerPage.value,
        sort: sort.value,
        sortDirection: direction.value,
        minYear: route.query.minYear || undefined,
        maxYear: route.query.maxYear || undefined,
        minDate: route.query.minDate || undefined,
        maxDate: route.query.maxDate || undefined,
      },
    })
    cars.value = response.data
  } catch {
    error.value = true
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  router.push({
    query: {
      limit: itemsPerPage.value.toString(),
      sort: sort.value.toString(),
      direction: direction.value.toString(),
      minYear: minYear.value || undefined,
      maxYear: maxYear.value || undefined,
      minDate: minDate.value || undefined,
      maxDate: maxDate.value || undefined,
    },
  })
}

const handleSortChange = (e: Event) => {
  const [s, d] = (e.target as HTMLSelectElement).value.split('-')
  sort.value = Number(s)
  direction.value = Number(d)
}

const clearAllFilters = () => {
  minYear.value = ''
  maxYear.value = ''
  minDate.value = ''
  maxDate.value = ''
  handleSearch()
}

watch([itemsPerPage, sort, direction], handleSearch)
watch(() => route.query, fetchCars, { deep: true })
onMounted(fetchCars)
</script>

<style scoped>
.page-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 20px;
  max-width: 100%;
  margin: 0;
  align-items: flex-start;
}

.listing-header {
  display: flex;
  justify-content: flex-end;
  background: var(--color-white);
  padding: 15px;
  border: 1px solid var(--color-gray);
  border-radius: 4px;
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
}
.custom-select {
  padding: 6px 12px;
  border: 1px solid var(--color-gray);
  border-radius: 4px;
}
.loading-state,
.error-state,
.no-data {
  text-align: center;
  padding: 40px;
  background: var(--color-white);
  border-radius: 4px;
  border: 1px solid var(--color-gray);
}

@media (max-width: 1173px) {
  .page-layout {
    grid-template-columns: 1fr;
  }
}
</style>
