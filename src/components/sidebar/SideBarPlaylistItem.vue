<script setup lang="ts">
    import type { PlaylistFrontend } from '@/types/playlist';
    import PlayButton from '../player/PlayButton.vue'
    import router from '@/router';
    import { usePlayerStore } from '@/stores/player';

    const playerStore = usePlayerStore()

    const props = defineProps<{
        playlist: PlaylistFrontend
    }>()

    function handlePlaylistView() {
        router.push({name: 'playlist', params: {id: props.playlist.id}})
    }

    
</script>

<template>
    <div class="relative group w-full flex justify-between">
        <div @click="handlePlaylistView" class="flex flex-row items-center relative justify-between group gap-x-3 cursor-pointer hover:bg-neutral-800/50 w-full px-4 py-2 rounded-md">
            <p class="text-neutral-300 font-medium truncate">{{ props.playlist.name }}</p>
        
    </div>
    <PlayButton @click="playerStore.playAlbum(playlist.songs, props.playlist.id)" :size="10" class="absolute right-2 top-0.5" />
    </div>
    
    
</template>

<style scoped></style>
