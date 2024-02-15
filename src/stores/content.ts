import {ref, type Ref} from 'vue'
import {defineStore} from 'pinia'
import type {Collection} from '@/types/collections'
import type {SongBackend, SongFrontend} from '@/types/song'
import {SongQuality} from '@/types/song'
import {addToPlaylist, getCollections, removeFromPlaylist} from '@/api/collections'
import config from '@/config'
import type {AlbumFrontend} from '@/types/album'
import type {PlaylistFrontend} from '@/types/playlist'

export const useContentStore = defineStore('content', () => {
    const songs: Ref<SongFrontend[]> = ref([])
    const albums: Ref<AlbumFrontend[]> = ref([])
    const playlists: Ref<PlaylistFrontend[]> = ref([])
    const quality: Ref<SongQuality> = ref(SongQuality.ultra)
    const favourites: Ref<SongFrontend[]> = ref([])
    const uploadProgress: Ref<number> = ref(0)
    const uploadMax: Ref<number> = ref(0)
    const favouritesId: Ref<number> = ref(0)

    function refreshContent(userId: number) {
        albums.value = []
        playlists.value = []
        getCollections().then((collections: any) => {
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
                if (collection.type === 'PLAYLIST' && collection.creatorId === userId) {
                    if (collection.name.match('Favourite songs')) {
                        favourites.value = []
                        favouritesId.value = collection.id
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

    function getPlaylistsBySongId(id: number): PlaylistFrontend[] {
        return playlists.value.filter(
            (playlist) => playlist.songs.findIndex((song) => song.id === id) !== -1
        )
    }

    function getDataForDropdown(songId: number): Map<number, boolean> {
        const temp = new Map<number, boolean>()
        for (const playlist of playlists.value) {
            if (playlist.songs.findIndex((song) => song.id === songId) !== -1) {
                temp.set(playlist.id, true)
            } else {
                temp.set(playlist.id, false)
            }
        }
        return temp
    }

    function addSongToPlaylist(playlistId: number, songId: number) {
        const index = playlists.value.findIndex((playlist) => playlist.id === playlistId)
        playlists.value[index].songs.push(
            songs.value[songs.value.findIndex((song) => song.id === songId)]
        )
    }

    function removeSongFromPlaylist(playlistId: number, songId: number) {
        const index = playlists.value.findIndex((playlist) => playlist.id === playlistId)
        playlists.value[index].songs = playlists.value[index].songs.filter(
            (song) => song.id !== songId
        )
    }

    function getPlaylistsBySearch(search: string): PlaylistFrontend[] {
        return playlists.value.filter((playlist) =>
            playlist.name.toLowerCase().includes(search.toLowerCase())
        )
    }

    function getAlbumsBySearch(search: string): AlbumFrontend[] {
        return albums.value.filter(
            (album) =>
                album.name.toLowerCase().includes(search.toLowerCase()) ||
                album.author.toLowerCase().includes(search.toLowerCase()) ||
                album.songs.some((song) => song.title.toLowerCase().includes(search.toLowerCase()))
        )
    }

    function getSongsBySearch(search: string): SongFrontend[] {
        return songs.value.filter(
            (song) =>
                song.title.toLowerCase().includes(search.toLowerCase()) ||
                song.author.toLowerCase().includes(search.toLowerCase())
        )
    }

    function clear() {
        songs.value = []
        albums.value = []
        playlists.value = []
        favourites.value = []
    }

    function likeUnlikeSong(id: number) {
        const index = songs.value.findIndex((song) => song.id === id)
        if (songs.value[index].isLiked) {
            removeFromPlaylist(id, favouritesId.value)
                .then(() => {
                    songs.value[index].isLiked = false
                    favourites.value = favourites.value.filter((song) => song.id !== id)
                })
                .catch(() => {})
        } else {
            addToPlaylist(id, favouritesId.value)
                .then(() => {
                    songs.value[index].isLiked = true
                    favourites.value.push(songs.value[index])
                })
                .catch(() => {})
        }
    }

    function removePlaylist(id: number) {
        playlists.value = playlists.value.filter((playlist) => playlist.id !== id)
    }

    return {
        songs,
        albums,
        playlists,
        quality,
        favourites,
        uploadProgress,
        uploadMax,
        favouritesId,
        refreshContent,
        getAlbumById,
        getPlaylistById,
        getPlaylistsBySongId,
        getDataForDropdown,
        addSongToPlaylist,
        removeSongFromPlaylist,
        clear,
        getPlaylistsBySearch,
        getAlbumsBySearch,
        getSongsBySearch,
        likeUnlikeSong,
        removePlaylist
    }
})
