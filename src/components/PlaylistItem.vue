<script setup lang="ts">
    import defaultCoverUrl from '@/assets/images/music-placeholder.png'
    import PlayButton from './player/PlayButton.vue'
    import type {PlaylistFrontend} from '@/types/playlist'
    import {BsPauseFill, BsPlayFill} from 'vue3-icons/bs'
    import router from '@/router'
import { usePlayerStore } from '@/stores/player'
    const props = defineProps<{
        playlist: PlaylistFrontend
    }>()

    const playerStore = usePlayerStore()

    function handleClick() {
        router.push({name: 'playlist', params: {id: props.playlist.id}})
    }
</script>

<template>
    <div
        class="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
        <div class="flex flex-col w-full h-full" @click="handleClick">
            <p class="font-semibold truncate text-center py-3 mb-2 w-full">{{ props.playlist.name }}</p>
            <div class="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <img
                    :src="defaultCoverUrl"
                    alt="Image"
                    class="w-full object-cover rounded-md"
                />
            </div>
            <div class="flex flex-col itmes-start w-full pt-4 gap-y-1">
                <p class="text-neutral-400 text-sm truncate pb-4 w-full">
                    {{ props.playlist.description }}
                </p>
            </div>
        </div>
        <div @click="$emit('playPlaylist')" class="absolute bottom-16 right-5">
            <button class="transition opacity-0 rounded-full p-2 flex items-center bg-green-500 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 hover:scale-110">
                <BsPauseFill size="20" v-if="playerStore.isPlaying && playerStore.playlistId === props.playlist.id" class="text-black" />
                <BsPlayFill size="20" v-else class="text-black" />
            </button>
        </div>
    </div>
</template>

<style scoped></style>
