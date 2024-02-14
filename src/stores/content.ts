import {ref, computed, type Ref} from 'vue'
import {defineStore} from 'pinia'
import type {Collection} from '@/types/collections'
import type {SongBackend, SongFrontend} from '@/types/song'
import {SonqQuality} from '@/types/song'
import {getCollections} from '@/api/collections'
import config from '@/config'
import type {AlbumFrontend} from '@/types/album'
import type {PlaylistFrontend} from '@/types/playlist'

export const useContentStore = defineStore('content', () => {
    const songs: Ref<SongFrontend[]> = ref([])
    const albums: Ref<AlbumFrontend[]> = ref([])
    const playlists: Ref<PlaylistFrontend[]> = ref([])
    const quality: Ref<SonqQuality> = ref(SonqQuality.ultra)
    const favourites: Ref<SongFrontend[]> = ref([])

    function refreshContent() {
        albums.value = []
        playlists.value = []
        getCollections().then((collections) => {
            //first pass: get only songs, so we can achive reactivity later
            for (const collection of collections) {
                if (collection.type !== 'ALBUM') {
                    continue
                }
                for (const backendSong of collection.songs) {
                    if (songs.value.findIndex((s) => s.id === backendSong.id) !== -1) {
                        continue
                    }
                    songs.value.push(convertSong(backendSong, collection.name, collection.id))
                }
            }
            //second pass: create albums and playlist
            for (const collection of collections) {
                if (collection.type === 'ALBUM') {
                    albums.value.push(convertAlbum(collection))
                }
                if (collection.type === 'PLAYLIST') {
                    if (collection.songs.length === 0) {
                        continue
                    } else if (collection.name.match('Favourite songs')) {
                        favourites.value = []
                        for (const song of collection.songs) {
                            const index = songs.value.findIndex((s) => s.id === song.id)
                            songs.value[index].isLiked = true
                            favourites.value.push(songs.value[index])
                        }
                        continue
                    }
                    playlists.value.push(convertPlaylist(collection))
                }
            }
        })
    }

    function convertSong(song: SongBackend, albumName: string, albumId: number): SongFrontend {
        const url = config.apiUrl + 'files/' + song.id + '/'
        return {
            id: song.id,
            access: song.access,
            author: song.author,
            title: song.title,
            url: url,
            coverUrl: url + 'cover.png',
            isLiked: false,
            album: albumName,
            albumId: albumId
        }
    }

    function convertAlbum(album: Collection): AlbumFrontend {
        const albumFrontend: AlbumFrontend = {
            id: album.id,
            name: album.name,
            author: album.songs[0].author,
            coverUrl: undefined,
            songs: []
        }
        for (const song of album.songs) {
            albumFrontend.songs.push(songs.value[songs.value.findIndex((s) => s.id === song.id)])
        }
        albumFrontend.coverUrl = albumFrontend.songs[0].coverUrl
        return albumFrontend
    }

    function convertPlaylist(playlist: Collection): PlaylistFrontend {
        const playlistFrontend: PlaylistFrontend = {
            id: playlist.id,
            name: playlist.name,
            description: playlist.description,
            songs: [],
            access: playlist.access
        }
        for (const song of playlist.songs) {
            playlistFrontend.songs.push(songs.value[songs.value.findIndex((s) => s.id === song.id)])
        }
        return playlistFrontend
    }

    function getAlbumById(id: number): AlbumFrontend | undefined {
        return albums.value.find((album) => album.id === id)
    }

    function getPlaylistById(id: number): PlaylistFrontend | undefined {
        return playlists.value.find((playlist) => playlist.id === id)
    }

    return {
        songs,
        albums,
        playlists,
        quality,
        favourites,
        refreshContent,
        getAlbumById,
        getPlaylistById
    }
})
