<script setup lang="ts">
    import type {AlbumFrontend} from '@/types/album'
    import AlbumItem from './AlbumItem.vue'
    import {useContentStore} from '@/stores/content'
    import {usePlayerStore} from '@/stores/player'
    const props = defineProps<{
        albums: AlbumFrontend[]
    }>()
    const contentStore = useContentStore()
    const playerStore = usePlayerStore()
</script>

<template>
    <div class="mt-4 text-neutral-400" v-if="props.albums.length <= 0">No content avaliable!</div>
    <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4"
    >
        <AlbumItem
            @play-album="playerStore.replaceWithCollection(album.songs)"
            v-for="(album, index) in props.albums"
            :key="index"
            :album="album"
        />
    </div>
</template>

<style scoped></style>
