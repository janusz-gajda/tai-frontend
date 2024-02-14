<script setup lang="ts">
    import type {AlbumUpload} from '@/types/album'
    import defaultCoverUrl from '@/assets/images/music-placeholder.png'
    import UploadSong from './UploadSong.vue'
    import {IoMdClose} from 'vue3-icons/io'

    const props = defineProps<{
        album: AlbumUpload
    }>()

    // const image = props.album.picture && props.album.picture[0]?.data
    //     ? btoa(String.fromCharCode.apply(null, [...new Uint8Array(props.album.picture[0].data)]))
    //     : ''
</script>

<template>
    <div class="flex flex-col gap-y-2 bg-neutral-100/10 rounded-md pb-4">
        <div
            class="group flex items-center rounded-md overflow-hidden gap-x-4 hover:bg-neutral-100/20 transition pr-4"
        >
            <div class="relative min-h-[64px] min-w-[64px]">
                <div class="flex next-img">
                    <!-- <img v-if="image" :src="`data:${props.album.picture ? props.album.picture[0].format : 'image/jpeg'};base64,` + image" alt="Image" class="object-cover" />
                    <img v-else :src="defaultCoverUrl" alt="Image" class="object-cover" /> -->
                </div>
            </div>
            <div class="flex flex-col w-full">
                <p class="font-medium truncate">{{ props.album.name }}</p>
                <p class="text-neutral-400 text-sm truncate">{{ props.album.artist }}</p>
            </div>
            <button @click="$emit('deleteAlbum')" class="pr-5">
                <IoMdClose size="20" />
            </button>
        </div>
        <UploadSong
            @delete="$emit('deleteSong', index)"
            v-for="(song, index) in props.album.songs"
            :key="index"
            :song="song"
            :index="index + 1"
        />
    </div>
</template>

<style scoped></style>
