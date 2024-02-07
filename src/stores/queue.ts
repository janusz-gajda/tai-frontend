import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { Song } from '@/types/song'

export const useQueueStore = defineStore('queue', () => {
  const currentQueue: Ref<Song[]> = ref([])
  const currentIndex: Ref<number> = ref(0)
  const currentSong: Ref<Song | null> = ref(null)

  function nextSong() {
    currentIndex.value = (currentIndex.value + 1) % currentQueue.value.length
    currentSong.value = currentQueue.value[currentIndex.value]
  }

  function previousSong() {
    currentIndex.value =
      (currentIndex.value - 1 + currentQueue.value.length) % currentQueue.value.length
    currentSong.value = currentQueue.value[currentIndex.value]
  }

  function addSong(song: Song) {
    currentQueue.value.push(song)
    if(currentSong.value === null) {
      currentSong.value = song
    }
  }

  function addCollection(songs: Song[]){
    currentQueue.value.push(...songs)
    if(currentSong.value === null) {
      currentSong.value = songs[0]
    }
  }


  return {
    currentQueue,
    currentIndex,
    currentSong,
    nextSong,
    previousSong,
    addSong,
    addCollection
  }
})
