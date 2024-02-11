<script setup lang="ts">
    import type {Song} from '@/types/song'
    import defaultCoverUrl from '@/assets/images/music-placeholder.png'
    import { AspectRatio } from 'radix-vue';
    import PlayButton from './player/PlayButton.vue';
    const props = defineProps<{
        song: Song
    }>()
</script>

<template>
    <div class="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer
    hover:bg-neutral-400/10 transition p-3"
    >   
        <div class="relative aspect-square w-full h-full rounded-md overflow-hidden">
            <img :src="props.song.coverUrl || defaultCoverUrl" alt="Image" class="w-full object-cover" />
        </div>
        <div class="flex flex-col itmes-start w-full pt-4 gap-y-1">
            <p class="font-semibold truncate w-full">{{ props.song.title }}</p>
            <p class="text-neutral-400 text-sm truncate pb-4 w-full">{{ props.song.author }}</p>
        </div>
        <div class="absolute bottom-24 right-5">
            <PlayButton />
        </div>
    </div>
</template>

<style scoped>

</style>