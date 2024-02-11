<script setup lang="ts">
    import type {Song} from '@/types/song'
    import SongItem from './SongItem.vue';
    const props = defineProps<{
        songs: Song[] 
    }>()
</script>

<template>
    <div class="mt-4 text-neutral-400" v-if="props.songs.length <= 0">
        No songs avaliable!
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
        <SongItem v-for="song in props.songs" :key="song.id" :song="song" />
    </div>
</template>

<style scoped>

</style>