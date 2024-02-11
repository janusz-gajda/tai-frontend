<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import {useQueueStore} from '@/stores/queue'
    import QueueItem from './QueueItem.vue'
    import draggable from 'vuedraggable'
    const queue = useQueueStore()
</script>

<template>
    <draggable class="grid grid-cols-1" v-model="queue.currentQueue" item-key="id">
        <template #item="{element: song}">
            <QueueItem
                class="my-1"
                :key="song.id"
                :index="queue.currentQueue.indexOf(song) + 1"
                :image="song.coverUrl"
                :song="song"
                :author-href="'#'"
                :album-href="'#'"
                :active="queue.currentSong?.id === song.id"
                :id="song.id"
            />
        </template>
    </draggable>
</template>

<style scoped></style>
