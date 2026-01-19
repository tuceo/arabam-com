<template>
  <div v-if="filters.length > 0" class="active-filters-area">
    <div class="filter-chips">
      <div v-for="filter in filters" :key="filter.id" class="chip">
        {{ filter.label }}
        <button @click="filter.clear" class="remove-chip">&times;</button>
      </div>
      <button @click="$emit('clear-all')" class="clear-all-link">Filtreleri Temizle</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FilterChip {
  id: string
  label: string
  clear: () => void
}

defineProps<{
  filters: FilterChip[]
}>()

defineEmits(['clear-all'])
</script>

<style scoped>
.active-filters-area {
  padding: 10px 15px;
  background-color: var(--color-white);
  border: 1px dashed var(--color-gray);
  border-radius: 4px;
  margin-bottom: 10px;
}
.filter-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}
.chip {
  display: flex;
  align-items: center;
  background-color: var(--color-light-gray);
  border: 1px solid var(--color-gray);
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 12px;
}
.remove-chip {
  background: none;
  border: none;
  color: var(--color-text-light);
  font-size: 18px;
  margin-left: 5px;
  cursor: pointer;
  line-height: 1;
}
.clear-all-link {
  background: none;
  border: none;
  color: var(--color-red);
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
}
</style>
