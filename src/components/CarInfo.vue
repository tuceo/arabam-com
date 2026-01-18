<template>
  <div class="car-info">
    <div class="price-box">
      {{ props.carDetail.priceFormatted }}
    </div>

    <div class="properties">
      <div v-for="prop in props.carDetail.properties" :key="prop.name" class="property">
        <span class="label">{{ prop.name.toUpperCase() }}</span>
        <span class="value">{{ prop.value }}</span>
      </div>
      <div class="property">
        <span class="label">İLAN TARİHİ</span>
        <span class="value">{{ props.carDetail.dateFormatted }}</span>
      </div>
    </div>

    <div class="user-card">
      <div class="user-info">
        <div class="avatar">{{ props.carDetail.userInfo.nameSurname[0] }}</div>
        <p class="username">{{ props.carDetail.userInfo.nameSurname }}</p>
      </div>
      <button class="phone-btn">
        {{ props.carDetail.userInfo.phoneFormatted }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CarDetail } from '@/utils/types'

const props = defineProps<{
  carDetail: CarDetail
}>()
</script>

<style scoped>
.car-info {
  background: var(--color-white);
  border-radius: 4px;
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.06);
}

.price-box {
  padding: 15px;
  border-bottom: 2px solid var(--color-red);
  font-size: 24px;
  font-weight: bold;
  color: var(--color-red);
}

.properties {
  padding: 15px;
}

.property {
  padding-bottom: 15px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}

.property .label {
  color: var(--color-text-light);
  font-weight: 600;
}

.property .value {
  color: var(--color-text-main);
}

.user-card {
  padding: 15px;
  border-top: 1px solid var(--color-gray);
  text-align: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.avatar {
  width: 40px;
  height: 40px;
  background: var(--color-gray);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.username {
  font-weight: bold;
  margin: 0;
}

.phone-btn {
  width: 100%;
  border: none;
  background: var(--color-red);
  color: var(--color-white);
  padding: 10px;
  border-radius: 4px;
  font-weight: bold;
}
</style>
