<template>
  <aside class="sidebar">
    <div class="filter-section">
      <div class="filter-group">
        <h3>Yıl</h3>
        <div class="filter-inputs">
          <input
            type="number"
            :value="minYear"
            @input="$emit('update:minYear', ($event.target as HTMLInputElement).value)"
            placeholder="Min"
            class="filter-input"
          />
          <input
            type="number"
            :value="maxYear"
            @input="$emit('update:maxYear', ($event.target as HTMLInputElement).value)"
            placeholder="Max"
            class="filter-input"
          />
        </div>
      </div>

      <div class="filter-group">
        <h3>İlan Tarihi</h3>
        <div class="filter-inputs vertical">
          <div class="date-input-wrapper">
            <label>Başlangıç</label>
            <input
              type="date"
              :value="minDate"
              @input="$emit('update:minDate', ($event.target as HTMLInputElement).value)"
              class="filter-input date-picker"
            />
          </div>
          <div class="date-input-wrapper">
            <label>Bitiş</label>
            <input
              type="date"
              :value="maxDate"
              @input="$emit('update:maxDate', ($event.target as HTMLInputElement).value)"
              class="filter-input date-picker"
            />
          </div>
        </div>
      </div>

      <div class="search-action">
        <button @click="$emit('search')" class="search-btn">Ara</button>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
defineProps<{
  minYear: string | number
  maxYear: string | number
  minDate: string
  maxDate: string
}>()

defineEmits(['update:minYear', 'update:maxYear', 'update:minDate', 'update:maxDate', 'search'])
</script>

<style scoped>
.sidebar {
  background: var(--color-white);
  border: 1px solid var(--color-gray);
  border-radius: 4px;
}

.filter-section {
  padding: 15px;
}

.filter-group {
  margin-bottom: 25px;
}

.filter-group h3 {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--color-light-gray);
  padding-bottom: 5px;
}

.filter-inputs {
  display: flex;
  gap: 10px;
}

.filter-inputs.vertical {
  flex-direction: column;
  width: 100%;
}

.date-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
}

.date-input-wrapper label {
  font-size: 11px;
  color: var(--color-text-light);
  font-weight: 600;
}

.filter-input {
  width: 100%;
  padding: 8px;
  border: 1px solid var(--color-gray);
  border-radius: 4px;
  background-color: var(--color-light-gray);
  outline: none;
  font-size: 13px;
  box-sizing: border-box;
  max-width: 100%;
  min-width: 0;
}

.date-picker {
  font-family: Arial, sans-serif;
}

.filter-input:focus {
  border-color: var(--color-red);
}

.search-action {
  border-top: 1px solid var(--color-gray);
  padding-top: 15px;
}

.search-btn {
  width: 100%;
  background-color: var(--color-red);
  color: var(--color-white);
  border: none;
  padding: 12px;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
}

@media (max-width: 1173px) {
  .filter-inputs.vertical {
    flex-direction: row;
  }
}
</style>
