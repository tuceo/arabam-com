import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Car } from '@/utils/types'

export const useComparisonStore = defineStore('comparison', () => {
  const selectedCars = ref<Car[]>([])

  const toggleSelection = (car: Car) => {
    const index = selectedCars.value.findIndex((item) => item.id === car.id)

    if (index > -1) {
      selectedCars.value.splice(index, 1)
    } else if (selectedCars.value.length < 2) {
      selectedCars.value.push(car)
    }
  }

  const isSelected = (id: number) => {
    return selectedCars.value.some((car) => car.id === id)
  }

  const clearSelection = () => {
    selectedCars.value = []
  }

  return { selectedCars, toggleSelection, isSelected, clearSelection }
})
