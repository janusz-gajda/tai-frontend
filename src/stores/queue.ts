import {defineStore} from 'pinia'
import {ref, type Ref} from 'vue'
import type {Song} from '@/types/song'

export const useQueueStore = defineStore('queue', () => {
    const currentQueue: Ref<Song[]> = ref([])
    const currentSong: Ref<Song | null> = ref(null)
    const isPlaying: Ref<boolean> = ref(false)

    function nextSong() {
        const nextIndex =
            (currentSong.value === null ? 0 : currentQueue.value.indexOf(currentSong.value) + 1) %
            currentQueue.value.length
        currentSong.value = currentQueue.value[nextIndex]
    }

    function previousSong() {
        let prevIndex =
            (currentSong.value === null ? 0 : currentQueue.value.indexOf(currentSong.value) - 1) %
            currentQueue.value.length
        prevIndex < 0 ? (prevIndex = currentQueue.value.length - 1) : null
        currentSong.value = currentQueue.value[prevIndex]
    }

    function addSong(song: Song) {
        currentQueue.value.push(song)
        if (currentSong.value === null) {
            currentSong.value = song
        }
    }

    function addCollection(songs: Song[]) {
        currentQueue.value.push(...songs)
        if (currentSong.value === null) {
            currentSong.value = songs[0]
        }
    }

    function changeSong(id: string) {
        currentSong.value =
            currentQueue.value[currentQueue.value.findIndex((song) => song.id === id)]
        if (!isPlaying.value) {
            isPlaying.value = true
        }
    }

    //TODO: przerobić podczas spinania z backendem
    function likeUnlikeSong(id: string) {
        const index = currentQueue.value.findIndex((song) => song.id === id)
        currentQueue.value[index].isLiked = !currentQueue.value[index].isLiked
    }

    function deleteFromQueue(id: string) {
        currentQueue.value = currentQueue.value.filter((song) => song.id !== id)
        if(currentSong.value?.id === id) {
            nextSong()
        }
    }

    function playSong(song: Song){
        if(currentSong.value?.id === song.id)
            return 

        const index = currentQueue.value.findIndex((queueSong) => queueSong.id === song.id)

        if(index === -1)
            addSong(song)

        return changeSong(song.id)
        
    }

    return {
        currentQueue,
        currentSong,
        isPlaying,
        nextSong,
        previousSong,
        addSong,
        addCollection,
        changeSong,
        likeUnlikeSong,
        deleteFromQueue,
        playSong
    }
})
