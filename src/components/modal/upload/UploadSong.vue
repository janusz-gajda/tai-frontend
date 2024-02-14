<script setup lang="ts">
    import type {SongUpload} from '@/types/song'
    import {IoMdClose} from 'vue3-icons/io'

    const props = defineProps<{
        song: SongUpload
        index: number
    }>()
</script>

<template>
    <div class="flex flex-row justify-between rounded-md bg-neutral-800 hover:bg-neutral-700 mx-4">
        <div class="pl-10 flex flex-row justify-start gap-x-4 py-1">
            <p class="text-neutral-400 font-medium">{{ props.index }}</p>
            <p class="text-white font-medium">{{ props.song.name }}</p>
        </div>
        <button @click="$emit('delete')" class="pr-5">
            <IoMdClose />
        </button>
    </div>
</template>

<style scoped></style>
