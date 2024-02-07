<script setup lang="ts">
import { FaPlay } from 'vue3-icons/fa'
import router from '@/router'

const props = defineProps<{
  image: string | undefined
  name: string
  href: string
}>()

function onClick() {
  router.push(props.href)
}
</script>

<template>
  <button
    @click="onClick"
    class="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4"
  >
    <div class="relative min-h-[64px] min-w-[64px]">
      <div class="flex next-img">
        <img :src="props.image" alt="Image" class="object-cover" />
      </div>
    </div>
    <p class="font-medium truncate py-5">{{ props.name }}</p>
    <div
      class="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110"
    >
      <FaPlay class="text-black" />
    </div>
  </button>
</template>

<style scoped></style>
