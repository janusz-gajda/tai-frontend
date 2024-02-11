<script setup lang="ts">
    import {ref} from 'vue'
    import {AiFillHeart, AiOutlineHeart} from 'vue3-icons/ai'
    import {useQueueStore} from '@/stores/queue'
    import type {Song} from '@/types/song'
    const queue = useQueueStore()
    const props = defineProps<{
        song: Song
    }>()
</script>

<template>
    <button class="cursor-pointer hover:opacity-75 transition">
        <AiFillHeart
            @click="queue.likeUnlikeSong(props.song.id)"
            v-if="song?.isLiked"
            style="color: #22c55e"
            size="25"
        />
        <AiOutlineHeart
            @click="queue.likeUnlikeSong(props.song.id)"
            v-else
            style="color: white"
            size="25"
        />
    </button>
</template>

<style scoped></style>
