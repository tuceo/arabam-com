<template>
  <div
    class="relative flex h-75 lg:h-120 w-full items-center justify-center overflow-hidden rounded bg-black"
  >
    <button
      class="absolute left-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-r border-none bg-black/40 p-2 text-lg text-white hover:text-gray-200 lg:px-2 lg:text-2xl"
      @click="prevPhoto"
    >
      ❮
    </button>

    <img
      :src="formatPhoto(props.photos[activePhotoIndex])"
      :alt="props.modelName"
      class="max-h-full max-w-full cursor-zoom-in object-contain"
      @click="openFullScreen"
    />

    <button
      class="absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-l border-none bg-black/40 p-2 text-lg text-white hover:text-gray-200 lg:px-2 lg:text-2xl"
      @click="nextPhoto"
    >
      ❯
    </button>

    <div class="absolute bottom-2 flex gap-2">
      <div
        v-for="(photo, index) in props.photos"
        :key="index"
        class="h-2.5 w-2.5 cursor-pointer rounded-full bg-gray-600"
        :class="{ 'bg-gray-200': activePhotoIndex === index }"
        @click="activePhotoIndex = index"
      ></div>
    </div>

    <Teleport to="body">
      <div
        v-if="isFullScreen"
        class="fixed inset-0 z-9999 flex items-center justify-center bg-black/95"
        @click.self="closeFullScreen"
      >
        <button
          @click="closeFullScreen"
          class="absolute top-5 right-5 cursor-pointer border-none bg-transparent text-5xl leading-none text-white hover:text-gray-200"
        >
          &times;
        </button>

        <button
          class="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-black/40 p-5 text-4xl text-white hover:text-gray-200"
          @click="prevPhoto"
        >
          ❮
        </button>

        <div class="flex max-h-[90%] max-w-[90%] flex-col items-center gap-4">
          <img
            :src="formatPhoto(props.photos[activePhotoIndex])"
            :alt="props.modelName"
            class="max-h-[85vh] max-w-full object-contain shadow-2xl"
          />
          <div class="rounded-full bg-white/10 px-4 py-1 text-sm text-white">
            {{ activePhotoIndex + 1 }} / {{ props.photos.length }}
          </div>
        </div>

        <button
          class="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-black/40 p-5 text-4xl text-white hover:text-gray-200"
          @click="nextPhoto"
        >
          ❯
        </button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  modelName: string
  photos: string[]
}>()

const activePhotoIndex = ref(0)
const isFullScreen = ref(false)

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

const openFullScreen = () => {
  isFullScreen.value = true
  document.body.style.overflow = 'hidden'
}

const closeFullScreen = () => {
  isFullScreen.value = false
  document.body.style.overflow = ''
}
</script>
