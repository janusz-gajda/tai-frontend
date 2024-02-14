<script setup lang="ts">
    import type {AlbumFrontend} from '@/types/album'
    import AlbumItem from './AlbumItem.vue'
    import {useContentStore} from '@/stores/content'
    import {usePlayerStore} from '@/stores/player'
import PlaylistItem from './PlaylistItem.vue';
import type { PlaylistFrontend } from '@/types/playlist';
import SongItem from './SongItem.vue';
import type { SongFrontend } from '@/types/song';
    const props = defineProps<{
        albums: AlbumFrontend[]
        playlists: PlaylistFrontend[]
        songs?: SongFrontend[]
    }>()
    const contentStore = useContentStore()
    const playerStore = usePlayerStore()

    function handlePlayAlbum(album: AlbumFrontend) {
        if(album.id != playerStore.albumId){
            playerStore.playAlbum(album.songs, album.id)
        }else{
            playerStore.togglePlay()
        }
    }

    function handlePlayPlaylist(playlist: PlaylistFrontend) {
        if(playlist.id != playerStore.playlistId){
            playerStore.playPlaylist(playlist.songs, playlist.id)
        } else {
            playerStore.togglePlay()
        }
    }
</script>

<template>
    <div class="mt-4 text-neutral-400" v-if="props.albums.length <= 0 && props.playlists.length <= 0 && props.songs && props.songs?.length <= 0">No content avaliable!</div>
    <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4"
    >   
        <AlbumItem
            @play-album="handlePlayAlbum(album)"
            v-for="(album, index) in props.albums"
            :key="index"
            :album="album"
        />
        <PlaylistItem @play-playlist="handlePlayPlaylist(playlist)" :playlist="playlist" v-for="playlist in props.playlists" :key="playlist.id" />
        <SongItem @play-song="playerStore.playSong(song)" v-for="song in props.songs" :key="song.id" :song="song" />
    </div>
</template>

<style scoped></style>
