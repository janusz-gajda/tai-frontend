<script setup lang="ts">
    import {ref, type Ref} from 'vue'
    import {AiOutlinePlusCircle} from 'vue3-icons/ai'
    import {
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuPortal,
        DropdownMenuRoot,
        DropdownMenuTrigger,
        DropdownMenuCheckboxItem,
        DropdownMenuItemIndicator
    } from 'radix-vue'
    import type {SongFrontend} from '@/types/song'
    import {useContentStore} from '@/stores/content'
    import {FaCheck} from 'vue3-icons/fa'
    import {addToPlaylist, removeFromPlaylist} from '@/api/collections'

    const contentStore = useContentStore()
    const props = defineProps<{
        song: SongFrontend
    }>()

    const checkedRef: Ref<boolean[]> = ref([])

    contentStore.getDataForDropdown(props.song.id).forEach((value) => {
        checkedRef.value.push(value)
    })

    const menu: Ref<boolean> = ref(false)

    function handleChange(event: Event, playlistId: number) {
        const map: Map<number, boolean> = contentStore.getDataForDropdown(props.song.id)
        event.stopPropagation()
        event.preventDefault()
        if (map.has(playlistId)) {
            if (map.get(playlistId)) {
                removeFromPlaylist(props.song.id, playlistId).then(() => {
                    contentStore.removeSongFromPlaylist(playlistId, props.song.id)
                })
            } else {
                addToPlaylist(props.song.id, playlistId).then(() => {
                    contentStore.addSongToPlaylist(playlistId, props.song.id)
                })
            }
        }
    }
</script>

<template>
    <DropdownMenuRoot v-model:open="menu">
        <DropdownMenuTrigger>
            <AiOutlinePlusCircle aria-label="Add to playlist" class="cursor-pointer" size="26" />
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
            <DropdownMenuContent
                class="w-40 bg-neutral-900 border-neutral-800 border-solid border-2 rounded-md items-center justify-center gap-y-2"
            >
                <DropdownMenuLabel>
                    <p class="text-neutral-400 font-semibold ml-2 mb-2">Manage playlists</p>
                </DropdownMenuLabel>
                <DropdownMenuItem
                    v-for="(playlist, index) in contentStore.playlists"
                    :key="playlist.id"
                    value="Delete"
                >
                    <DropdownMenuCheckboxItem
                        class="relative flex pl-7 py-1 flex-row justify-start items-center hover:bg-neutral-800 rounded-md"
                        v-model:checked="checkedRef[index]"
                        @click="(event: any) => event.stopPropagation()"
                        @select="(event) => handleChange(event, playlist.id)"
                    >
                        <DropdownMenuItemIndicator class="absolute left-1 top-2.5">
                            <FaCheck />
                        </DropdownMenuItemIndicator>
                        <p>{{ playlist.name }}</p>
                    </DropdownMenuCheckboxItem>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenuPortal>
    </DropdownMenuRoot>
</template>

<style scoped></style>
