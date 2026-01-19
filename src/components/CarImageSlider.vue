<template>
  <div
    class="relative flex h-75 md:h-120 w-full items-center justify-center overflow-hidden rounded bg-black"
  >
    <button
      class="absolute left-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-r border-none bg-black/40 p-2 text-lg text-white hover:text-gray-600 md:px-2 md:text-2xl"
      @click="prevPhoto"
    >
      ❮
    </button>

    <img
      :src="formatPhoto(props.photos[activePhotoIndex])"
      :alt="props.modelName"
      class="max-h-full max-w-full object-contain"
    />

    <button
      class="absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-l border-none bg-black/40 p-2 text-lg text-white hover:text-gray-600 md:px-2 md:text-2xl"
      @click="nextPhoto"
    >
      ❯
    </button>

    <div class="absolute bottom-2 flex gap-2">
      <div
        v-for="(photo, index) in props.photos"
        :key="index"
        class="h-2.5 w-2.5 cursor-pointer rounded-full bg-gray-600"
        :class="{ 'bg-gray-800': activePhotoIndex === index }"
        @click="activePhotoIndex = index"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelName: string
  photos: string[]
}>()

const activePhotoIndex = ref(0)

const nextPhoto = () => {
  if (activePhotoIndex.value === props.photos.length - 1) {
    activePhotoIndex.value = 0
  } else {
    activePhotoIndex.value++
  }
}

const prevPhoto = () => {
  if (activePhotoIndex.value === 0) {
    activePhotoIndex.value = props.photos.length - 1
  } else {
    activePhotoIndex.value--
  }
}

const formatPhoto = (photoUrl: string | undefined): string => {
  return photoUrl ? photoUrl.replace('{0}', '800x600') : ''
}
</script>
