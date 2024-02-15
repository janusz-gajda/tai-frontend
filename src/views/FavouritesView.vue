<script setup lang="ts">
    import HomeHeader from '@/components/HomeHeader.vue'
    import {useContentStore} from '@/stores/content'
    import {FaPlay, FaPause} from 'vue3-icons/fa'
    import {usePlayerStore} from '@/stores/player'
    import LikeButton from '@/components/LikeButton.vue'
    import DropdownManagePlaylists from '@/components/DropdownManagePlaylists.vue'

    const contentStore = useContentStore()
    const playerStore = usePlayerStore()

    function handlePlayChange(id: number, isCurrentSong: boolean) {
        if (isCurrentSong) {
            playerStore.togglePlay()
        } else {
            if (playerStore.isPlaylingFavourites) {
                playerStore.changeSongFavourites(id)
            } else {
                //@ts-ignore
                playerStore.playFavourites(contentStore.favourites)
                playerStore.changeSongFavourites(id)
            }
        }
    }

    function playFavourites() {
        if (playerStore.isPlaylingFavourites) {
            playerStore.togglePlay()
            return
        }
        if (contentStore.favourites.length === 0) return
        playerStore.playFavourites(contentStore.favourites)
    }
</script>

<template>
    <div class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <HomeHeader />
        <main class="mt-2 mb-40 px-6">
            <div class="flex justify-between items-center">
                <div class="flex justify-start mb-3">
                    <div class="max-w-[160px] rounded-md"></div>

                    <div class="flex flex-col justify-end mb-3 ml-2">
                        <p class="text-white font-medium text-3xl">Favourites</p>
                        <p class="text-neutral-400 text-xl">Your most liked music</p>
                    </div>
                </div>
                <div class="relative">
                    <div
                        v-if="contentStore.favourites.length > 0"
                        @click="playFavourites"
                        class="transition rounded-full flex items-center justify-center bg-green-500 p-2 drop-shadow-md right-5 opacity-100 hover:scale-110 cursor-pointer"
                    >
                        <FaPlay
                            size="25"
                            v-if="!playerStore.isPlaying || !playerStore.isPlaylingFavourites"
                            class="text-black"
                        />
                        <FaPause size="25" v-else class="text-black" />
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-y-2 mb-30">
                <div
                    v-for="(song, index) in contentStore.favourites"
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
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<style scoped></style>
