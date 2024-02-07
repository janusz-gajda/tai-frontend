<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {ref} from 'vue'
import PlayerContent from './PlayerContent.vue'
import type { Song } from '@/types/song.ts'
import { useQueueStore } from '@/stores/queue'
const queue = useQueueStore()
const autoPlay = ref(false)

queue.addCollection([
    {
        id: "dsasd",
        title: "You're gonna go far kid",
        author: "The Offspring",
        url: "http://localhost:8080/offspring.mp3",
        album: "Rise and fall, rage and grace",
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Offspring_-_Rise_and_Fall%2C_Rage_and_Grace.jpg"
    },
    {
        id: "dsadsasd",
        title: "Mr Brightside",
        author: "The Killers",
        url: "http://localhost:8080/brightside.mp3",
        album: "Hot Fuss",
        coverUrl: "https://upload.wikimedia.org/wikipedia/en/1/17/The_Killers_-_Hot_Fuss.png"
    },
    {
        id: "gfgf",
        title: "Zombie",
        author: "The Cranberries",
        url: "http://localhost:8080/zombie.mp3",
        album: "No need to argue",
        coverUrl: "https://m.media-amazon.com/images/I/714YmYo4pEL._UF1000,1000_QL80_.jpg"
    }
])

</script>

<template>
  <div class="fixed bottom-0 bg-black w-full py-2 h[80px] px4">
    <PlayerContent
      :play="autoPlay"
      :key="queue.currentSong?.id || 'default'"
      :song="queue.currentSong"
      @prev-song="() => {queue.previousSong(); autoPlay = true}"
      @next-song="() => {queue.nextSong(); autoPlay = true}"
    />
  </div>
</template>

<style scoped></style>
