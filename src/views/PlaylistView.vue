<script setup lang="ts">
    import {ref, watch, type Ref} from 'vue'
    import HomeHeader from '@/components/HomeHeader.vue'
    import {useContentStore} from '@/stores/content'
    import {FaPlay, FaPause} from 'vue3-icons/fa'
    import {usePlayerStore} from '@/stores/player'
    import LikeButton from '@/components/LikeButton.vue'
    import {IoMdClose} from 'vue3-icons/io'
    import {useRoute} from 'vue-router'
    import DropdownManagePlaylists from '@/components/DropdownManagePlaylists.vue'
    import {removeFromPlaylist, removePlaylist} from '@/api/collections'
    import type {PlaylistFrontend} from '@/types/playlist'
    import router from '@/router'

    const props = defineProps<{
        id: number
    }>()

    const route = useRoute()
    const contentStore = useContentStore()
    const playerStore = usePlayerStore()

    const playlist: Ref<PlaylistFrontend | undefined> = ref(contentStore.getPlaylistById(props.id))

    function handlePlayChange(id: number, isCurrentSong: boolean) {
        if (isCurrentSong) {
            playerStore.togglePlay()
        } else {
            if (playerStore.playlistId === props.id) {
                playerStore.changeSongPlaylist(id, props.id)
            } else {
                //@ts-ignore
                playerStore.playPlaylist(playlist.value.songs, props.id)
                playerStore.changeSongPlaylist(id, props.id)
            }
        }
    }

    function playPlaylist() {
        if (playerStore.playlistId === props.id) {
            playerStore.togglePlay()
            return
        }
        if (!playlist.value) return
        playerStore.playPlaylist(playlist.value.songs, props.id)
    }

    function handleRemoveSong(id: number) {
        removeFromPlaylist(id, props.id).then(() => {
            contentStore.removeSongFromPlaylist(props.id, id)
        })
    }

    function handleRemovePlaylist() {
        const confirmed: boolean = confirm(
            `Are you sure you want to remove the playlist ${playlist.value?.name}?`
        )
        if (confirmed && playlist.value) {
            removePlaylist(playlist.value.id).then(() => {
                //@ts-ignore
                contentStore.removePlaylist(playlist.value.id)
                router.push({name: 'home'})
            })
        }
    }

    watch(
        () => route.params.id,
        (newId) => {
            playlist.value = contentStore.getPlaylistById(newId as unknown as number)
        }
    )

    contentStore.$subscribe((mutation, state) => {
        playlist.value = state.playlists.find((playlist) => playlist.id === props.id)
    })
</script>

<template>
    <div class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <HomeHeader />
        <main class="mt-2 mb-40 px-6" v-if="playlist">
            <div class="flex justify-between items-center">
                <div class="flex justify-start mb-3">
                    <div class="max-w-[160px] rounded-md"></div>

                    <div class="flex flex-col justify-end mb-3 ml-2">
                        <p class="text-white font-medium text-3xl">{{ playlist.name }}</p>
                        <p class="text-neutral-400 text-xl">{{ playlist?.description }}</p>
                    </div>
                </div>
                <div class="flex justify-end items-center gap-x-3">
                    <div
                        v-if="playlist.songs.length > 0"
                        @click="playPlaylist"
                        class="transition rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md opacity-100 hover:scale-110 cursor-pointer"
                    >
                        <FaPlay
                            size="20"
                            v-if="!playerStore.isPlaying || playerStore.albumId !== playlist?.id"
                            class="text-black"
                        />
                        <FaPause size="20" v-else class="text-black" />
                    </div>
                    <div>
                        <IoMdClose
                            @click="handleRemovePlaylist"
                            aria-label="Delete playlist"
                            class="cursor-pointer hover:text-red-500 transition"
                            size="40"
                        />
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-y-2 mb-30">
                <div
                    v-for="(song, index) in playlist?.songs"
                    :key="song.id"
                    class="relative group flex items-center justify-between rounded-md overflow-hidden gap-x-4 bg-neutral-800 hover:bg-neutral-700 transition pr-4"
                >
                    <div class="relative flex truncate items-center gap-x-4">
                        <div
                            @click="
                                handlePlayChange(song.id, playerStore.currentSong?.id === song.id)
                            "
                            class="transition ml-4 mr-2 rounded-full hidden items-center justify-center bg-green-500 p-3 drop-shadow-md right-5 group-hover:flex opacity-100 hover:scale-110 cursor-pointer"
                        >
                            <FaPlay
                                v-if="
                                    playerStore.currentSong?.id !== song.id ||
                                    !playerStore.isPlaying
                                "
                                class="text-black"
                            />
                            <FaPause v-else class="text-black" />
                        </div>
                        <h1
                            class="relative group-hover:hidden ml-4 px-4 w-[40px] md:w-[48px] text-gray-300"
                        >
                            {{ index + 1 }}
                        </h1>
                        <div class="flex flex-col">
                            <p
                                class="font-medium truncate"
                                :class="{'text-green-400': playerStore.currentSong?.id === song.id}"
                            >
                                {{ song.title }}
                            </p>
                            <p class="font-medium truncate text-gray-400 cursor-pointer">
                                {{ song.author }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center flex-row gap-x-2">
                        <LikeButton :song="song" />
                        <DropdownManagePlaylists :song="song" />
                        <IoMdClose
                            @click="handleRemoveSong(song.id)"
                            aria-label="Remove from queue"
                            class="cursor-pointer"
                            size="26"
                        />
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped></style>
