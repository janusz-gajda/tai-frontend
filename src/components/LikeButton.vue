<script setup lang="ts">
    import {ref} from 'vue'
    import {AiFillHeart, AiOutlineHeart} from 'vue3-icons/ai'
    import {usePlayerStore} from '@/stores/player'
    import type {SongFrontend} from '@/types/song'
    const playerStore = usePlayerStore()
    const props = defineProps<{
        song: SongFrontend
    }>()
</script>

<template>
    <button class="cursor-pointer hover:opacity-75 transition">
        <AiFillHeart
            @click="playerStore.likeUnlikeSong(props.song.id)"
            v-if="song?.isLiked"
            style="color: #22c55e"
            size="25"
        />
        <AiOutlineHeart
            @click="playerStore.likeUnlikeSong(props.song.id)"
            v-else
            style="color: white"
            size="25"
        />
    </button>
</template>

<style scoped></style>
