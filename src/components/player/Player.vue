<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import {ref} from 'vue'
    import PlayerContent from './PlayerContent.vue'
    import type {Song} from '@/types/song.ts'
    import {useQueueStore} from '@/stores/queue'
    const queue = useQueueStore()

    queue.addCollection([
        {
            id: 'dsasd',
            title: "You're gonna go far kid",
            author: 'The Offspring',
            url: 'http://10.0.0.99:8080/offspring.mp3',
            album: 'Rise and fall, rage and grace',
            coverUrl:
                'https://upload.wikimedia.org/wikipedia/en/d/dd/The_Offspring_-_Rise_and_Fall%2C_Rage_and_Grace.jpg',
            isLiked: true
        },
        {
            id: 'dsadsasd',
            title: 'Mr Brightside',
            author: 'The Killers',
            url: 'http://10.0.0.99:8080/brightside.mp3',
            album: 'Hot Fuss',
            coverUrl: 'https://upload.wikimedia.org/wikipedia/en/1/17/The_Killers_-_Hot_Fuss.png',
            isLiked: false
        },
        {
            id: 'gfgf',
            title: 'Zombie',
            author: 'The Cranberries',
            url: 'http://10.0.0.99:8080/zombie.mp3',
            album: 'No need to argue',
            coverUrl: 'https://m.media-amazon.com/images/I/714YmYo4pEL._UF1000,1000_QL80_.jpg',
            isLiked: false
        }
    ])
</script>

<template>
    <div class="fixed bottom-0 bg-black w-full py-2 h[80px] px4">
        <PlayerContent
            :key="queue.currentSong?.id || 'default'"
            :song="queue.currentSong"
            @prev-song="
                () => {
                    queue.previousSong()
                }
            "
            @next-song="
                () => {
                    queue.nextSong()
                }
            "
        />
    </div>
</template>

<style scoped></style>
