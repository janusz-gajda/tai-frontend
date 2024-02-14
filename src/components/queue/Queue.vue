<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import {usePlayerStore} from '@/stores/player'
    import QueueItem from './QueueItem.vue'
    import draggable from 'vuedraggable'
    const palyerStore = usePlayerStore()
</script>

<template>
    <draggable class="grid grid-cols-1 mb-40" v-model="palyerStore.currentQueue" item-key="id">
        <template #item="{element: song}">
            <QueueItem
                class="my-1"
                :key="song.id"
                :index="palyerStore.currentQueue.indexOf(song) + 1"
                :image="song.coverUrl"
                :song="song"
                :author-href="'#'"
                :album-href="'#'"
                :active="palyerStore.currentSong?.id === song.id"
                :id="song.id"
            />
        </template>
    </draggable>
</template>

<style scoped></style>
