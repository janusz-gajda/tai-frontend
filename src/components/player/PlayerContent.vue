<script setup lang="ts">
    import {ref, watch} from 'vue'
    import MediaItem from './MediaItem.vue';
    import LikeButton from '../LikeButton.vue';
    import PlayerSlider from './PlayerSlider.vue';
    import {useSound} from '@raffaelesgarro/vue-use-sound'
    import {BsPauseFill, BsPlayFill} from "vue3-icons/bs"
    import { AiFillStepBackward, AiFillStepForward } from 'vue3-icons/ai';
    import {HiSpeakerXMark, HiSpeakerWave} from 'vue3-icons/hi2'

    const isPlaying = ref(false)
    const volume = ref(1)
    let oldVolume = 1

    const props = defineProps<{
        song: {
            title: string,
            author: string
        },
        songUrl: string
        
    }>()

    function togglePlay(){
        isPlaying.value = !isPlaying.value
    }

    function toogleMute(){
        if(volume.value !== 0){
            oldVolume = volume.value
            volume.value = 0
        } else{
            volume.value = oldVolume
        }
    }

    const {play, sound} = useSound(props.songUrl, {
        volume: volume
    })
    

</script>

<template>
    <div class="grid grid-cols-2 md:grid-cols-3 h-full">
        <div class="flex w-full justify-start">
            <div class="flex items-center gap-x-4">
                <MediaItem :song="props.song"/>
                <LikeButton />
            </div>
        </div>
        <div class="flex md:hidden col-auto w-full justify-end items-center">
            <div @click="togglePlay" class="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer mr-2 transistion">
                <BsPauseFill v-if="isPlaying" class="text-black" size="30"/>
                <BsPlayFill v-else class="text-black" size="30"/>
            </div>
        </div>
        <div class="hidden h-full md:flex justify-center items-center w-full max-w-[720px] gap-x-6">
            <AiFillStepBackward 
                @click="$emit('prev')" class="text-neutral-400 cursor-pointer hover:text-white transition" size="30"/>
            <div @click="togglePlay" class="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer">
                <BsPauseFill v-if="isPlaying" class="text-black" size="30"/>
                <BsPlayFill v-else class="text-black" size="30"/>
            </div>
            <AiFillStepForward 
                @click="$emit('prev')" class="text-neutral-400 cursor-pointer hover:text-white transition" size="30"/>
        </div>
        <div class="hidden md:flex w-full justify-end pr-2">
            <div class="flex items-center gap-x-2 w-[120px]">
                <HiSpeakerWave @click="toogleMute" v-if="volume !== 0" size="34" class="cursor-pointer"/>
                <HiSpeakerXMark @click="toogleMute" v-else size="34" class="cursor-pointer"/>
                <PlayerSlider :value="volume" @volume-change="(newVolume) => volume = newVolume"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>