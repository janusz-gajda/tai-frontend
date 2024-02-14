<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import {
        DialogRoot,
        DialogPortal,
        DialogOverlay,
        DialogContent,
        DialogClose,
        DialogTitle,
        VisuallyHidden
    } from 'radix-vue'
    import defaultCoverUrl from '@/assets/images/music-placeholder.png'
    import {ref, watch} from 'vue'
    import {IoMdClose} from 'vue3-icons/io'
    import {usePlayerStore} from '@/stores/player'
    import PlayerVolumeSlider from '@/components/player/PlayerVolumeSlider.vue'
    import {BsPauseFill, BsPlayFill} from 'vue3-icons/bs'
    import {AiFillStepBackward, AiFillStepForward} from 'vue3-icons/ai'
    import {HiSpeakerXMark, HiSpeakerWave} from 'vue3-icons/hi2'
    import PlayerDurationSlider from '@/components/player/PlayerDurationSlider.vue'

    const playerStore = usePlayerStore()

    const props = defineProps<{
        isOpen: boolean
    }>()
</script>

<template>
    <DialogRoot
        :open="props.isOpen"
        :default-open="props.isOpen"
        @update:open="$emit('update:isOpen')"
    >
        <DialogPortal class="">
            <DialogOverlay class="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
            <DialogContent
                class="fixed drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none flex justify-center items-center"
            >
                <VisuallyHidden>
                    <DialogTitle> Mobile musc player </DialogTitle>
                </VisuallyHidden>

                <div class="flex justify-center items-center">
                    <div
                        class="flex h-full flex-col justify-center items-center w-full max-w-[80vw] gap-x-6"
                    >
                        <div class="aspect-square w-full h-full rounded-md overflow-hidden">
                            <img
                                :src="playerStore.currentSong?.coverUrl || defaultCoverUrl"
                                alt="Image"
                                class="w-full object-cover"
                            />
                        </div>
                        <div class="flex flex-col itmes-start w-full pt-4 gap-y-1">
                            <p class="font-semibold text-2xl truncate w-full">
                                {{ playerStore.currentSong?.title }}
                            </p>
                            <p class="text-neutral-400 text-xl truncate pb-4 w-full">
                                {{ playerStore.currentSong?.author }}
                            </p>
                        </div>
                        <div class="h-full flex items-center mt-2 w-full justify-between">
                            <AiFillStepBackward
                                @click="playerStore.previousSong"
                                class="text-neutral-400 cursor-pointer hover:text-white transition"
                                size="48"
                            />
                            <div
                                @click="playerStore.togglePlay"
                                class="flex items-center justify-center h-20 w-20 rounded-full bg-white p-1 cursor-pointer"
                            >
                                <BsPauseFill
                                    v-if="playerStore.isPlaying"
                                    class="text-black"
                                    size="48"
                                />
                                <BsPlayFill v-else class="text-black" size="48" />
                            </div>
                            <AiFillStepForward
                                @click="playerStore.nextSong"
                                class="text-neutral-400 cursor-pointer hover:text-white transition"
                                size="48"
                            />
                        </div>
                        <PlayerDurationSlider
                            class="mt-6"
                            :active="true"
                            :max-value="playerStore.duration"
                            :value="Math.floor(playerStore.timeElapsed)"
                            @seek-change="
                                (newSeekPosition: number) =>
                                    playerStore.changeTimeElapsed(newSeekPosition)
                            "
                        />
                    </div>
                </div>
                <DialogClose as-child>
                    <button
                        class="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none"
                    >
                        <IoMdClose size="25" />
                    </button>
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<style scoped></style>
