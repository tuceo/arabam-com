<template>
  <div class="image-container">
    <button class="slider-nav prev" @click="prevPhoto">❮</button>

    <img :src="formatPhoto(props.photos[activePhotoIndex])" :alt="props.modelName" />

    <button class="slider-nav next" @click="nextPhoto">❯</button>

    <div class="photo-indexes">
      <div
        v-for="(photo, index) in props.photos"
        :key="index"
        :class="{ active: activePhotoIndex === index }"
        @click="activePhotoIndex = index"
        style="cursor: pointer"
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

<style scoped>
.image-container {
  position: relative;
  width: 100%;
  height: 450px;
  background-color: var(--color-black);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.slider-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.4);
  color: var(--color-white);
  border: none;
  padding: 15px 10px;
  cursor: pointer;
  font-size: 24px;
  z-index: 10;
}

.slider-nav:hover {
  background: rgba(0, 0, 0, 0.7);
  color: var(--color-gray);
}

.prev {
  left: 0;
  border-radius: 0 4px 4px 0;
}

.next {
  right: 0;
  border-radius: 4px 0 0 4px;
}

.photo-indexes {
  position: absolute;
  bottom: 15px;
  display: flex;
  gap: 8px;
}

.photo-indexes div {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--color-gray);
}

.photo-indexes div.active {
  background-color: var(--color-light-gray);
}
</style>
