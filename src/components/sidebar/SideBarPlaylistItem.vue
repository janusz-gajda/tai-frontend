<script setup lang="ts">
    import defaultUrl from '@/assets/images/music-placeholder.png'
    import type {Song} from '@/types/song'
    import {AspectRatio} from 'radix-vue'
import PlayButton from '../player/PlayButton.vue';
    const props = defineProps<{
        name: string
    }>()
</script>

<template>
    <div
        class="flex flex-row items-center relative justify-between group gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full p-2 rounded-md"
    >
            <p class="text-white truncate">{{ props.name }}</p>
            <PlayButton :size="10" class="absolute right-2 top-0.5"/>
    </div>
</template>

<style scoped></style>
