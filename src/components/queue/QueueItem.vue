<script setup lang="ts">
    import {ref, type Ref} from 'vue'
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
    import LikeButton from '../LikeButton.vue'
    import {BsThreeDots} from 'vue3-icons/bs'
    import {IoMdClose} from 'vue3-icons/io'
    import {AiOutlinePlusCircle} from 'vue3-icons/ai'

    const props = defineProps<{
        id: number
        image: string | undefined
        index: number
        song: SongFrontend
        authorHref: string
        albumHref: string
        active: boolean
    }>()

    const menu: Ref<boolean> = ref(false)
    const playerStore = usePlayerStore()

    function handlePlayChange() {
        if (props.active) {
            playerStore.isPlaying = !playerStore.isPlaying
        } else {
            playerStore.changeSong(props.id)
        }
    }
</script>

<template>
    <div
        class="relative group flex items-center justify-between rounded-md overflow-hidden gap-x-4 hover:bg-neutral-700 transition pr-4"
        :class="{
            'bg-neutral-700 border-emerald-700 border-solid border-2': props.active,
            'bg-neutral-800': !props.active
        }"
    >
        <div class="relative flex truncate items-center gap-x-4">
            <div
                @click="handlePlayChange"
                class="transition ml-4 rounded-full hidden items-center justify-center bg-green-500 p-3 md:p-4 drop-shadow-md right-5 group-hover:flex opacity-100 hover:scale-110 cursor-pointer"
            >
                <FaPlay v-if="!props.active || !playerStore.isPlaying" class="text-black" />
                <FaPause v-else class="text-black" />
            </div>
            <h1 class="relative group-hover:hidden ml-4 px-4 w-[40px] md:w-[48px] text-gray-300">
                {{ props.index }}
            </h1>
            <div class="relative hidden md:block min-h-[64px] min-w-[64px]">
                <a :href="props.albumHref">
                    <AspectRatio :ratio="1 / 1">
                        <div class="flex next-img">
                            <img :src="props.image" alt="Image" class="object-cover" />
                        </div>
                    </AspectRatio>
                </a>
            </div>
            <div class="flex flex-col">
                <p class="font-medium truncate" :class="{'text-green-400': props.active}">
                    {{ props.song.title }}
                </p>
                <a
                    :href="props.authorHref"
                    class="font-medium truncate text-gray-400 cursor-pointer"
                    >{{ props.song.author }}</a
                >
            </div>
        </div>
        <div class="truncate">
            <a
                :href="props.albumHref"
                class="hidden md:inline font-medium truncate text-gray-400 cursor-pointer"
                >{{ props.song.album }}</a
            >
        </div>
        <div class="flex items-center flex-row gap-x-2">
            <LikeButton :song="props.song" />
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
            <IoMdClose
                @click="playerStore.deleteFromQueue(props.id)"
                aria-label="Remove from queue"
                class="cursor-pointer"
                size="26"
            />
        </div>
    </div>
</template>

<style scoped></style>
