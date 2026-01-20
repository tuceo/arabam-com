<template>
  <div class="rounded bg-white shadow-sm">
    <div class="border-b-2 border-red-600 p-5 text-2xl font-bold text-red-600">
      {{ props.carDetail.priceFormatted }}
    </div>

    <div class="p-5">
      <div
        v-for="prop in props.carDetail.properties"
        :key="prop.name"
        class="flex justify-between pb-5 text-sm"
      >
        <span class="font-semibold text-gray-600">
          {{ translatePropName(prop.name) }}
        </span>
        <span class="text-gray-800">{{ prop.value }}</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="font-semibold text-gray-600">İlan Tarihi</span>
        <span class="text-gray-800">{{ props.carDetail.dateFormatted }}</span>
      </div>
    </div>

    <div class="border-t border-gray-200 p-5 text-center">
      <div class="mb-5 flex items-center gap-2.5">
        <div class="bg-gray-300 flex h-10 w-10 items-center justify-center rounded-full font-bold">
          {{ props.carDetail.userInfo.nameSurname[0] }}
        </div>
        <p class="m-0 font-bold">{{ props.carDetail.userInfo.nameSurname }}</p>
      </div>
      <a
        :href="'tel:' + props.carDetail.userInfo.phoneFormatted"
        class="flex w-full cursor-pointer items-center justify-center gap-2 rounded bg-red-600 p-3 font-bold text-white no-underline transition-all hover:bg-red-700 active:scale-[0.98] shadow-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            fill-rule="evenodd"
            d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.96 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ props.carDetail.userInfo.phoneFormatted }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CarDetail } from '@/utils/types'

const props = defineProps<{
  carDetail: CarDetail
}>()

const propertyMap: Record<string, string> = {
  year: 'Yıl',
  km: 'Kilometre',
  color: 'Renk',
  gear: 'Vites',
  fuel: 'Yakıt',
}

const translatePropName = (name: string) => {
  return propertyMap[name.toLowerCase()] || name.toUpperCase()
}
</script>
