<script setup lang="ts">
    import {TbPlaylist} from 'vue3-icons/tb'
    import {AiOutlinePlus} from 'vue3-icons/ai'
    import SideBarPlaylistItem from './SideBarPlaylistItem.vue'
    import {useModalStore} from '@/stores/modal'
    import {useContentStore} from '@/stores/content'

    const modalStore = useModalStore()
    const contentStore = useContentStore()

    function handleUpload() {
        modalStore.openModal('upload')
    }

    function handleCreatePlaylist() {
        modalStore.openModal('createPlaylist')
    }
</script>

<template>
    <div class="flex flex-col">
        <div class="flex items-center justify-between px-5 pt-4">
            <div class="inline-flex items-center gap-x-2">
                <TbPlaylist size="26" class="text-neutral-400" />
                <p class="text-neutral-400 font-medium text-md">Your Liblary</p>
            </div>
            <AiOutlinePlus
                class="cursor-pointer text-neutral-400 hover:text-white transition"
                size="20"
                @click="handleUpload"
            />
        </div>
        <div class="flex flex-col gap-y-2 mt-4 px-3">
            <button
                @click="handleCreatePlaylist"
                class="flex items-center justify-start w-full rounded-full bg-neutral-900 py-1 py-1text-neutral-400 hover:bg-neutral-800 text-neutral-400 gap-x-2 hover:text-white transition"
            >
                <AiOutlinePlus class="cursor-pointer transition" size="20" />
                <p>Create playlist</p>
            </button>
            <SideBarPlaylistItem
                v-for="playlist in contentStore.playlists"
                :key="playlist.name"
                :playlist="playlist"
            />
        </div>
    </div>
</template>

<style scoped></style>
