<script setup lang="ts">
import defaultUrl from '@/assets/images/music-placeholder.png'
import type { Song } from '@/types/song'
const props = defineProps<{
  song: Song | null
}>()
</script>

<template>
  <div
    class="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
  >
    <div class="relative rounded-md min-h-[48px] min-w[48px] overflow-hidden">
      <div class="flex next-img">
        <img
          :src="props.song?.coverUrl ? props.song.coverUrl : defaultUrl"
          alt="MediaItem"
          class="object-cover"
        />
      </div>
    </div>
    <div class="flex flex-col gap-y-1 overflow-hidden">
      <p class="text-white truncate">{{ props.song?.title }}</p>
      <p class="text-neutral-400 text-sm truncate">{{ props.song?.author }}</p>
    </div>
    <div class="absolute bottom-24 right-5"></div>
  </div>
</template>

<style scoped></style>
