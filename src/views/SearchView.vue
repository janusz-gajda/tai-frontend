<script setup lang="ts">
import { ref, watch, type Ref } from 'vue'
    import HomeHeader from '@/components/HomeHeader.vue'
    import PageContent from '@/components/PageContent.vue'
import { useContentStore } from '@/stores/content';
import type { SongFrontend } from '@/types/song';
import type { AlbumFrontend } from '@/types/album';
import type { PlaylistFrontend } from '@/types/playlist';

    const songs: Ref<SongFrontend[]> = ref([])
    const albums: Ref<AlbumFrontend[]> = ref([])
    const playlists: Ref<PlaylistFrontend[]> = ref([])
    const search = ref('')
    const contentStore = useContentStore()

    watch(search, (newSearch, oldSearch) => {
        if(newSearch != oldSearch){
            console.log(newSearch)
            if(newSearch.length >= 3){
                playlists.value = contentStore.getPlaylistsBySearch(newSearch)
                albums.value = contentStore.getAlbumsBySearch(newSearch)
                songs.value = contentStore.getSongsBySearch(newSearch)
            }
        }
    })
</script>

<template>
   <div class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <HomeHeader>
            <input v-model="search" type="text" placeholder="Search" class="w-[80%] px-4 py-2 rounded-full bg-neutral-800"/>
        </HomeHeader>
        <main class="mt-2 px-6">
            <div class="flex justify-between items-center">
                <h1 class="text-white text-2xl font-semibold">Search results</h1>
            </div>
            <PageContent :albums="albums" :playlists="playlists" :songs="songs"/>
        </main>
    </div>
</template>
