<script setup lang="ts">
    import {TbPlaylist} from 'vue3-icons/tb'
    import {AiOutlinePlus} from 'vue3-icons/ai'
    import SideBarPlaylistItem from './SideBarPlaylistItem.vue'
    import {useModalStore} from '@/stores/modal'

    const modalStore = useModalStore()

    const playlists = [
        {
            name: 'Playlist 1'
        },
        {
            name: 'Playlist 2'
        },
        {
            name: 'Playlist 3'
        }
    ]
    function handleUpload() {
        modalStore.openModal('upload')
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
            <SideBarPlaylistItem
                v-for="playlist in playlists"
                :key="playlist.name"
                :name="playlist.name"
            />
        </div>
    </div>
</template>

<style scoped></style>
