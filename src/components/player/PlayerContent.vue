<script setup lang="ts">
    import {ref, watch, onMounted, onBeforeUnmount, type Ref} from 'vue'
    import MediaItem from './MediaItem.vue'
    import LikeButton from '../LikeButton.vue'
    import PlayerVolumeSlider from './PlayerVolumeSlider.vue'
    import {BsPauseFill, BsPlayFill} from 'vue3-icons/bs'
    import {AiFillStepBackward, AiFillStepForward} from 'vue3-icons/ai'
    import {HiSpeakerXMark, HiSpeakerWave} from 'vue3-icons/hi2'
    import PlayerDurationSlider from './PlayerDurationSlider.vue'
    import {TbPlaylist, TbPremiumRights} from 'vue3-icons/tb'
    import type {SongFrontend} from '@/types/song'
    import {Howl, Howler} from 'howler'
    import {usePlayerStore} from '@/stores/player'
    import {useModalStore} from '@/stores/modal'
    import {useContentStore} from '@/stores/content'
    import  SettingsButton from '../SettingsButton.vue'
    import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioItem, DropdownMenuRadioGroup, DropdownMenuItemIndicator } from 'radix-vue'
    import {SongQuality} from '@/types/song'
    import { FaCheck } from 'vue3-icons/fa'

    const props = defineProps<{
        song: SongFrontend | null
    }>()
    console.log(props.song)

    const modalStore = useModalStore()
    const playerStore = usePlayerStore()
    const contentStore = useContentStore()
    const emit = defineEmits(['prevSong', 'nextSong'])
    
    const menu: Ref<boolean> = ref(false)
    
    let updateSeekPositionId: NodeJS.Timeout

    let sound: Howl = new Howl({
        src: [props.song?.url + contentStore.quality || ''],
        preload: true,
        volume: playerStore.volume,
        autoplay: playerStore.isPlaying
    })

    sound.on('end', () => {
        sound.stop()
        nextSong()
    })

    sound.on('load', () => {
        playerStore.duration = Math.floor(sound.duration())
    })

    onMounted(() => {
        if (playerStore.isPlaying) {
            updateSeekPositionId = setInterval(updateSeekPosition, 300)
        }
    })

    onBeforeUnmount(() => {
        clearInterval(updateSeekPositionId)
        sound.stop()
        sound.unload()
    })

    function togglePlay() {
        playerStore.isPlaying = !playerStore.isPlaying
    }

    function toogleMute() {
        if (playerStore.volume !== 0) {
            playerStore.oldVolume = playerStore.volume
            changeVolume(0)
        } else {
            changeVolume(playerStore.oldVolume)
        }
    }

    function changeVolume(newVolume: number) {
        playerStore.volume = newVolume
        sound.volume(newVolume)
    }

    function previousSong() {
        if (playerStore.timeElapsed > 1.5) {
            changeSeekPosition(0)
        } else {
            sound.stop()
            sound.unload()
            emit('prevSong')
        }
    }

    function nextSong() {
        sound.stop()
        sound.unload()
        emit('nextSong')
    }

    function updateSeekPosition() {
        //@ts-ignore
        playerStore.timeElapsed = sound.seek()
    }

    function changeSeekPosition(newSeekPosition: number) {
        sound.seek(newSeekPosition)
        playerStore.timeElapsed = newSeekPosition
    }

    function handleQualityChange(event: Event, quality: SongQuality) {
        event.preventDefault()
        event.stopPropagation()
        contentStore.quality = quality
    }


    watch(
        () => playerStore.isPlaying,
        (isPlaying) => {
            if (isPlaying) {
                sound.play()
                updateSeekPositionId = setInterval(updateSeekPosition, 300)
            } else if (!isPlaying) {
                sound.pause()
                clearInterval(updateSeekPositionId)
            }
        }
    )

    watch(
        () => playerStore.newTimeElapsed,
        (newTimeElapsed) => {
            changeSeekPosition(newTimeElapsed)
        }
    )
</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-3 h-full">
        <div class="flex w-full justify-start">
            <div class="hidden md:flex items-center gap-x-4">
                <MediaItem :song="props.song" />
                <LikeButton v-if="props.song" :song="props.song" />
            </div>
            <div class="flex md:hidden items-center gap-x-4">
                <MediaItem @click="modalStore.openModal('player')" :song="props.song" />
            </div>
        </div>
        <div class="flex md:hidden col-auto w-full justify-end items-center">
            <RouterLink to="/queue">
                <TbPlaylist size="32" class="cursor-pointer mr-2" />
            </RouterLink>
            <div
                @click="togglePlay"
                class="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer mr-2 transistion"
            >
                <BsPauseFill v-if="playerStore.isPlaying" class="text-black" size="30" />
                <BsPlayFill v-else class="text-black" size="30" />
            </div>
        </div>
        <div
            class="hidden h-full md:flex flex-col justify-center items-center w-full max-w-[720px] gap-x-6"
        >
            <div class="h-full flex justify-center items-center mt-2 w-full max-w-[720px] gap-x-6">
                <AiFillStepBackward
                    @click="previousSong"
                    class="text-neutral-400 cursor-pointer hover:text-white transition"
                    size="30"
                />
                <div
                    @click="togglePlay"
                    class="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
                >
                    <BsPauseFill v-if="playerStore.isPlaying" class="text-black" size="30" />
                    <BsPlayFill v-else class="text-black" size="30" />
                </div>
                <AiFillStepForward
                    @click="nextSong"
                    class="text-neutral-400 cursor-pointer hover:text-white transition"
                    size="30"
                />
            </div>
            <PlayerDurationSlider
                :active="!!props.song"
                :max-value="playerStore.duration"
                :value="Math.floor(playerStore.timeElapsed)"
                @seek-change="
                    (newSeekPosition: number) => playerStore.changeTimeElapsed(newSeekPosition)
                "
            />
        </div>
        <div class="hidden md:flex w-full justify-end pr-6">
            <div class="flex items-center gap-x-2 w-[160px]">
                <DropdownMenuRoot v-model:open="menu">
                    <DropdownMenuTrigger>
                        <SettingsButton class="scale-75"/>
                    </DropdownMenuTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuContent
                            class="w-40 bg-neutral-900 border-neutral-800 border-solid border-2 rounded-md items-center justify-center gap-y-2"
                        >
                            <DropdownMenuLabel>
                                <p class="text-neutral-400 font-semibold ml-2 mb-2">Select quality</p>
                            </DropdownMenuLabel>
                            <DropdownMenuRadioGroup v-model="contentStore.quality">
                                <DropdownMenuRadioItem :value="SongQuality.low" class="relative flex pl-7 py-1 flex-row justify-start items-center hover:bg-neutral-800 rounded-md cursor-pointer"  @click="(event: any) => event.stopPropagation()" @select="(event) => handleQualityChange(event, SongQuality.low)">
                                    <DropdownMenuItemIndicator class="absolute left-1 top-2.5">
                                            <FaCheck />
                                    </DropdownMenuItemIndicator>
                                    <p>Low</p>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem :value="SongQuality.medium" class="relative flex pl-7 py-1 flex-row justify-start items-center hover:bg-neutral-800 rounded-md cursor-pointer"  @click="(event: any) => event.stopPropagation()" @select="(event) => handleQualityChange(event, SongQuality.medium)">
                                    <DropdownMenuItemIndicator class="absolute left-1 top-2.5">
                                            <FaCheck />
                                    </DropdownMenuItemIndicator>
                                    <p>Medium</p>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem :value="SongQuality.high" class="relative flex pl-7 py-1 flex-row justify-start items-center hover:bg-neutral-800 rounded-md cursor-pointer"  @click="(event: any) => event.stopPropagation()" @select="(event) => handleQualityChange(event, SongQuality.high)">
                                    <DropdownMenuItemIndicator class="absolute left-1 top-2.5">
                                            <FaCheck />
                                    </DropdownMenuItemIndicator>
                                    <p>High</p>
                                </DropdownMenuRadioItem>
                                <DropdownMenuRadioItem :value="SongQuality.ultra" class="relative flex pl-7 py-1 flex-row justify-start items-center hover:bg-neutral-800 rounded-md cursor-pointer"  @click="(event: any) => {event.preventDefault(); event.stopPropagation()}" @select="(event) => handleQualityChange(event, SongQuality.ultra)">
                                    <DropdownMenuItemIndicator class="absolute left-1 top-2.5">
                                            <FaCheck />
                                    </DropdownMenuItemIndicator>
                                    <p>Ultra</p>
                                </DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenuPortal>
                </DropdownMenuRoot>
                <RouterLink to="/queue">
                    <TbPlaylist size="34" class="cursor-pointer" />
                </RouterLink>
                <HiSpeakerWave
                    @click="toogleMute"
                    v-if="playerStore.volume !== 0"
                    size="34"
                    class="cursor-pointer"
                />
                <HiSpeakerXMark @click="toogleMute" v-else size="34" class="cursor-pointer" />
                <PlayerVolumeSlider
                    :value="playerStore.volume"
                    @volume-change="(newVolume) => changeVolume(newVolume)"
                />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
