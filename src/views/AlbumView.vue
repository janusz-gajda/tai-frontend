<script setup lang="ts">
    import {ref, type Ref} from 'vue'
    import HomeHeader from '@/components/HomeHeader.vue'
    import {useContentStore} from '@/stores/content'
    import {FaPlay, FaPause} from 'vue3-icons/fa'
    import {
        AspectRatio,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuPortal,
        DropdownMenuRoot,
        DropdownMenuTrigger
    } from 'radix-vue'
    import {usePlayerStore} from '@/stores/player'
    import type {SongFrontend} from '@/types/song'
    import LikeButton from '@/components/LikeButton.vue'
    import {IoMdClose} from 'vue3-icons/io'
    import {AiOutlinePlusCircle} from 'vue3-icons/ai'
    import defaultCoverUrl from '@/assets/images/music-placeholder.png'

    const props = defineProps<{
        id: number
    }>()

    const contentStore = useContentStore()
    const playerStore = usePlayerStore()

    const menu = ref(false)

    function handlePlayChange(id: number, isCurrentSong: boolean) {
        if (isCurrentSong) {
            playerStore.togglePlay()
        } else {
            if (playerStore.albumId === props.id) {
                playerStore.changeSong(id, props.id)
            } else {
                //@ts-ignore
                playerStore.playAlbum(album?.songs, props.id)
                playerStore.changeSong(id, props.id)
            }
        }
    }

    function playAlbum() {
        if (playerStore.albumId === props.id) {
            playerStore.togglePlay()
            return
        }
        if (!album) return
        playerStore.playAlbum(album.songs, props.id)
    }

    const album = contentStore.getAlbumById(props.id)
</script>

<template>
    <div class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <HomeHeader />
        <main class="mt-2 mb-7 px-6">
            <div class="flex justify-between items-center">
                <div class="flex justify-start mb-3">
                    <div class="max-w-[160px] rounded-md">
                        <img
                            :src="album?.coverUrl ? album?.coverUrl : defaultCoverUrl"
                            alt="Image"
                            class="w-full rounded-md object-cover"
                        />
                    </div>

                    <div class="flex flex-col justify-end mb-3 ml-2">
                        <p class="text-white font-medium text-3xl">{{ album?.name }}</p>
                        <p class="text-neutral-400 text-xl">{{ album?.author }}</p>
                    </div>
                </div>
                <div class="relative">
                    <div
                        @click="playAlbum"
                        class="transition rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 opacity-100 hover:scale-110 cursor-pointer"
                    >
                        <FaPlay
                            size="32"
                            v-if="!playerStore.isPlaying || playerStore.albumId !== album?.id"
                            class="text-black"
                        />
                        <FaPause size="32" v-else class="text-black" />
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-y-2">
                <div
                    v-for="(song, index) in album?.songs"
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
                        <DropdownMenuRoot v-model:open="menu">
                            <DropdownMenuTrigger>
                                <AiOutlinePlusCircle
                                    aria-label="Add to playlist"
                                    class="cursor-pointer"
                                    size="26"
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuContent
                                    class="w-40 bg-neutral-600 rounded-md items-center justify-center gap-y-2"
                                >
                                    <DropdownMenuLabel>
                                        <p>Add to playlist</p>
                                    </DropdownMenuLabel>
                                    <DropdownMenuItem value="Delete">
                                        <p class="ml-2">List of playlists</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenuPortal>
                        </DropdownMenuRoot>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped></style>
