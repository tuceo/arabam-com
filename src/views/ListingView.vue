<template>
  <div class="grid items-start gap-5 grid-cols-1 lg:grid-cols-4">
    <FilterSidebar
      v-model:minYear="minYear"
      v-model:maxYear="maxYear"
      v-model:minDate="minDate"
      v-model:maxDate="maxDate"
      @search="handleSearch"
    />

    <main class="lg:col-span-3">
      <div
        class="mb-2 flex flex-col sm:flex-row justify-end gap-5 rounded border border-gray-200 bg-white p-5"
      >
        <div class="flex items-center gap-2 text-sm">
          <label>Sıralama:</label>
          <select
            :value="`${sort}-${direction}`"
            @change="handleSortChange"
            class="rounded border border-gray-200 p-2"
          >
            <option value="0-0">Fiyata Göre Artan</option>
            <option value="0-1">Fiyata Göre Azalan</option>
            <option value="1-1">Tarihe Göre En Yeni</option>
            <option value="1-0">Tarihe Göre En Eski</option>
            <option value="2-1">Yıla Göre En Yeni</option>
            <option value="2-0">Yıla Göre En Eski</option>
          </select>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <label>Görünüm:</label>
          <select v-model="itemsPerPage" class="rounded border border-gray-200 p-2">
            <option :value="20">20 Ürün</option>
            <option :value="50">50 Ürün</option>
          </select>
        </div>
      </div>

      <FilterChips :filters="activeFilters" @clear-all="clearAllFilters" />

      <div v-if="loading" class="rounded border border-gray-200 bg-white p-5 text-center">
        Yükleniyor...
      </div>
      <div v-else-if="error" class="rounded border border-gray-200 bg-white p-5 text-center">
        Bir hata oluştu.
      </div>
      <template v-else>
        <ListTable v-if="cars.length > 0" :cars="cars" />
        <div v-else class="rounded border border-gray-200 bg-white p-5 text-center">
          Gösterilecek ilan bulunamadı.
        </div>
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
