<template>
  <div
    class="relative flex h-75 lg:h-120 w-full items-center justify-center overflow-hidden rounded bg-black"
  >
    <button
      class="absolute left-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-r border-none bg-black/40 p-2 text-lg text-white hover:text-gray-200 lg:p-3 lg:text-2xl"
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
      class="absolute right-0 top-1/2 z-10 -translate-y-1/2 cursor-pointer rounded-l border-none bg-black/40 p-2 text-lg text-white hover:text-gray-200 lg:p-3 lg:text-2xl"
      @click="nextPhoto"
    >
      ❯
    </button>

    <div class="absolute bottom-4 flex gap-2">
      <div
        v-for="(photo, index) in props.photos"
        :key="index"
        class="h-2.5 w-2.5 cursor-pointer rounded-full transition-colors"
        :class="activePhotoIndex === index ? 'bg-red-600' : 'bg-gray-400/60 hover:bg-white'"
        @click="activePhotoIndex = index"
      ></div>
    </div>

    <Teleport to="body">
      <div
        v-if="isFullScreen"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 transition-opacity duration-300"
        @click.self="closeFullScreen"
      >
        <button
          @click="closeFullScreen"
          class="absolute top-5 right-5 cursor-pointer border-none bg-transparent text-5xl leading-none text-white transition-colors hover:text-red-500"
        >
          &times;
        </button>

        <button
          class="absolute left-5 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-black/40 p-5 text-4xl text-white transition-all hover:bg-black/60 active:scale-90"
          @click="prevPhoto"
        >
          ❮
        </button>

        <div class="flex max-h-[90%] max-w-[90%] flex-col items-center gap-4">
          <img
            :src="formatPhoto(props.photos[activePhotoIndex])"
            :alt="props.modelName"
            class="max-h-[80dvh] max-w-full object-contain shadow-2xl transition-transform duration-300"
          />
        </div>

        <div
          class="absolute bottom-5 left-5 flex max-w-[70%] gap-3 overflow-x-auto pb-2 scrollbar-hide"
        >
          <div
            v-for="(photo, index) in props.photos"
            :key="index"
            @click="activePhotoIndex = index"
            class="h-16 w-24 shrink-0 cursor-pointer overflow-hidden rounded border-2 transition-all duration-200"
            :class="
              activePhotoIndex === index
                ? 'border-red-600 ring-2 ring-red-600/30'
                : 'border-white/10 opacity-50 hover:opacity-100 hover:border-white/30'
            "
          >
            <img :src="formatPhoto(photo)" class="h-full w-full object-cover" />
          </div>
        </div>

        <div
          class="absolute bottom-5 right-5 rounded-full bg-white/10 px-4 py-1 text-sm font-bold tracking-widest text-white backdrop-blur-sm"
        >
          {{ activePhotoIndex + 1 }} / {{ props.photos.length }}
        </div>

        <button
          class="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer border-none bg-black/40 p-5 text-4xl text-white transition-all hover:bg-black/60 active:scale-90"
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
  activePhotoIndex.value = (activePhotoIndex.value + 1) % props.photos.length
}

const prevPhoto = () => {
  activePhotoIndex.value = (activePhotoIndex.value - 1 + props.photos.length) % props.photos.length
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

<style scoped>
/* Thumbnail scroll alanının scrollbar'ını gizlemek için */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
