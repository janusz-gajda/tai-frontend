<script setup lang="ts">
    import defaultCoverUrl from '@/assets/images/music-placeholder.png'
    import type {AlbumFrontend} from '@/types/album'
    import {BsPauseFill, BsPlayFill} from 'vue3-icons/bs'
    import router from '@/router'
    import {usePlayerStore} from '@/stores/player'
    const props = defineProps<{
        album: AlbumFrontend
    }>()

    const playerStore = usePlayerStore()

    function handleClick() {
        router.push({name: 'album', params: {id: props.album.id}})
    }
</script>

<template>
    <div
        class="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
    >
        <div class="flex flex-col w-full h-full" @click="handleClick">
            <div class="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <img
                    :src="props.album.coverUrl ? props.album.coverUrl : defaultCoverUrl"
                    alt="Image"
                    class="w-full object-cover"
                />
            </div>
            <div class="flex flex-col itmes-start w-full pt-4 gap-y-1">
                <p class="font-semibold truncate w-full">{{ props.album.name }}</p>
                <p class="text-neutral-400 text-sm truncate pb-4 w-full">
                    {{ props.album.author }}
                </p>
            </div>
        </div>
        <div @click="$emit('playAlbum')" class="absolute bottom-24 right-5">
            <button
                class="transition opacity-0 rounded-full p-2 flex items-center bg-green-500 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 hover:scale-110"
            >
                <BsPauseFill
                    size="20"
                    v-if="playerStore.isPlaying && playerStore.albumId === props.album.id"
                    class="text-black"
                />
                <BsPlayFill size="20" v-else class="text-black" />
            </button>
        </div>
    </div>
</template>

<style scoped></style>
