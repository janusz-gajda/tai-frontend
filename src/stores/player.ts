import {defineStore} from 'pinia'
import {ref, type Ref} from 'vue'
import type {SongFrontend} from '@/types/song'

export const usePlayerStore = defineStore(
    'player',
    () => {
        const currentQueue: Ref<SongFrontend[]> = ref([])
        const currentSong: Ref<SongFrontend | null> = ref(null)
        const isPlaying: Ref<boolean> = ref(false)
        const timeElapsed: Ref<number> = ref(0)
        const duration: Ref<number> = ref(0)
        const volume: Ref<number> = ref(1)
        const oldVolume: Ref<number> = ref(1)
        const newTimeElapsed: Ref<number> = ref(0)
        const albumId: Ref<number> = ref(0)

        function nextSong() {
            const nextIndex =
                (currentSong.value === null
                    ? 0
                    : currentQueue.value.indexOf(currentSong.value) + 1) % currentQueue.value.length
            currentSong.value = currentQueue.value[nextIndex]
        }

        function previousSong() {
            let prevIndex =
                (currentSong.value === null
                    ? 0
                    : currentQueue.value.indexOf(currentSong.value) - 1) % currentQueue.value.length
            prevIndex < 0 ? (prevIndex = currentQueue.value.length - 1) : null
            currentSong.value = currentQueue.value[prevIndex]
        }

        function addSong(song: SongFrontend) {
            currentQueue.value.push(song)
            if (currentSong.value === null) {
                currentSong.value = song
            }
        }

        function addCollection(songs: SongFrontend[]) {
            currentQueue.value.push(...songs)
            if (currentSong.value === null) {
                currentSong.value = songs[0]
            }
        }

        function changeSong(id: number, albId = 0) {
            currentSong.value =
                currentQueue.value[currentQueue.value.findIndex((song) => song.id === id)]
            if (!isPlaying.value) {
                isPlaying.value = true
            }
            albumId.value = albId
        }

        //TODO: przerobić podczas spinania z backendem
        function likeUnlikeSong(id: number) {
            const index = currentQueue.value.findIndex((song) => song.id === id)
            currentQueue.value[index].isLiked = !currentQueue.value[index].isLiked
        }

        function deleteFromQueue(id: number) {
            currentQueue.value = currentQueue.value.filter((song) => song.id !== id)
            if (currentSong.value?.id === id) {
                nextSong()
            }
        }

        function playSong(song: SongFrontend) {
            if (currentSong.value?.id === song.id) return

            const index = currentQueue.value.findIndex((queueSong) => queueSong.id === song.id)

            if (index === -1) addSong(song)
            albumId.value = 0
            return changeSong(song.id)
        }

        function playAlbum(songs: SongFrontend[], id: number) {
            currentQueue.value = songs
            currentSong.value = songs[0]
            isPlaying.value = true
            albumId.value = id
        }

        function mute() {
            oldVolume.value = volume.value
            volume.value = 0
        }

        function unmute() {
            volume.value = oldVolume.value
        }

        function updateTimeElapsed(time: number) {
            timeElapsed.value = time
        }

        function togglePlay() {
            isPlaying.value = !isPlaying.value
        }

        function changeTimeElapsed(time: number) {
            newTimeElapsed.value = time
        }

        function replaceWithCollection(songs: SongFrontend[]) {
            currentQueue.value = songs
            currentSong.value = songs[0]
            isPlaying.value = true
            albumId.value = 0
        }

        return {
            currentQueue,
            currentSong,
            isPlaying,
            timeElapsed,
            duration,
            volume,
            oldVolume,
            newTimeElapsed,
            albumId,
            nextSong,
            previousSong,
            addSong,
            addCollection,
            changeSong,
            likeUnlikeSong,
            deleteFromQueue,
            playSong,
            mute,
            unmute,
            updateTimeElapsed,
            togglePlay,
            changeTimeElapsed,
            replaceWithCollection,
            playAlbum
        }
    },
    {
        persist: true
    }
)
