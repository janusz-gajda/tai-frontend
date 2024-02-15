<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import PlayerContent from './PlayerContent.vue'
    import {usePlayerStore} from '@/stores/player'
    const palyerStore = usePlayerStore()
</script>

<template>
    <div class="fixed bottom-0 bg-black w-full py-2 h[80px] px4">
        <PlayerContent
            :key="palyerStore.currentSong?.id || 'default'"
            :song="palyerStore.currentSong"
            @prev-song="
                () => {
                    palyerStore.previousSong()
                }
            "
            @next-song="
                () => {
                    palyerStore.nextSong()
                }
            "
        />
    </div>
</template>

<style scoped></style>
