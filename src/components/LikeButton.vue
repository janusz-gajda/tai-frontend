<script setup lang="ts">
    import {AiFillHeart, AiOutlineHeart} from 'vue3-icons/ai'
    import {useContentStore} from '@/stores/content'
    import type {SongFrontend} from '@/types/song'
    const contentStore = useContentStore()
    const props = defineProps<{
        song: SongFrontend
    }>()
</script>

<template>
    <button class="cursor-pointer hover:opacity-75 transition">
        <AiFillHeart
            @click="contentStore.likeUnlikeSong(props.song.id)"
            v-if="song?.isLiked"
            style="color: #22c55e"
            size="25"
        />
        <AiOutlineHeart
            @click="contentStore.likeUnlikeSong(props.song.id)"
            v-else
            style="color: white"
            size="25"
        />
    </button>
</template>

<style scoped></style>
