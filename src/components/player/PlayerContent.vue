<script setup lang="ts">
import { ref, watch, onMounted, type Ref } from 'vue'
import MediaItem from './MediaItem.vue'
import LikeButton from '../LikeButton.vue'
import PlayerVolumeSlider from './PlayerVolumeSlider.vue'
import { BsPauseFill, BsPlayFill } from 'vue3-icons/bs'
import { AiFillStepBackward, AiFillStepForward } from 'vue3-icons/ai'
import { HiSpeakerXMark, HiSpeakerWave } from 'vue3-icons/hi2'
import PlayerDurationSlider from './PlayerDurationSlider.vue'
import { TbPlaylist, TbPremiumRights } from 'vue3-icons/tb'
import type { Song } from '@/types/song'
import {Howl, Howler} from "howler";
import { CollapsibleContent } from 'radix-vue'



const props = defineProps<{
    play: boolean
  song: Song | null
}>()

const emit = defineEmits(['prevSong', 'nextSong'])
const isPlaying: Ref<boolean> = ref(props.play)
const volume: Ref<number> = ref(1)
const seekPosition: Ref<number> = ref(0)
const duration: Ref<number> = ref(0)
let oldVolume: number = 1
let updateSeekPositionId: NodeJS.Timeout

let sound: Howl = new Howl({
  src: [props.song?.url || ''],
  preload: true,
  volume: volume.value,
  autoplay: props.play,
})

sound.on('end', () => {
  sound.stop()
  nextSong();
})

sound.on('load', () => {
  duration.value = Math.floor(sound.duration())
})

onMounted(() => {
  if(props.play){
    updateSeekPositionId = setInterval(updateSeekPosition, 300)
  }
})

function togglePlay() {
  isPlaying.value = !isPlaying.value
  if (isPlaying.value) {
    sound.play()
    updateSeekPositionId = setInterval(updateSeekPosition, 300)
  } else {
    sound.pause()
    clearInterval(updateSeekPositionId)
  }
}

function toogleMute() {
  if (volume.value !== 0) {
    oldVolume = volume.value
    changeVolume(0)
  } else {
    changeVolume(oldVolume)
  }
}

function changeVolume(newVolume: number){
  volume.value = newVolume
  sound.volume(newVolume)
}

function previousSong(){
    if(seekPosition.value < 5 && seekPosition.value > 1.5){
        changeSeekPosition(0)
    } else {
        sound.stop()
        sound.unload()
        emit('prevSong');
    }
}

function nextSong(){
    sound.stop()
    sound.unload()
    emit('nextSong');
}

function updateSeekPosition() {
  //@ts-ignore
  seekPosition.value = sound.seek()
}

function changeSeekPosition(newSeekPosition: number) {
  sound.seek(newSeekPosition)
  seekPosition.value = newSeekPosition
}
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-3 h-full">
    <div class="flex w-full justify-start">
      <div class="flex items-center gap-x-4">
        <MediaItem :song="props.song" />
        <LikeButton />
      </div>
    </div>
    <div class="flex md:hidden col-auto w-full justify-end items-center">
      <TbPlaylist size="32" class="cursor-pointer mr-2" />
      <div
        @click="togglePlay"
        class="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer mr-2 transistion"
      >
        <BsPauseFill v-if="isPlaying" class="text-black" size="30" />
        <BsPlayFill v-else class="text-black" size="30" />
      </div>
    </div>
    <div
      class="hidden h-full md:flex flex-col justify-center items-center w-full max-w-[720px] gap-x-6"
    >
      <div class="h-full flex justify-center items-center w-full max-w-[720px] gap-x-6">
        <AiFillStepBackward
          
          @click="previousSong"
          class="text-neutral-400 cursor-pointer hover:text-white transition"
          size="30"
        />
        <div
          @click="togglePlay"
          class="flex items-center justify-center h-10 w-10 rounded-full bg-white p-1 cursor-pointer"
        >
          <BsPauseFill v-if="isPlaying" class="text-black" size="30" />
          <BsPlayFill v-else class="text-black" size="30" />
        </div>
        <AiFillStepForward
        @click="nextSong"
          class="text-neutral-400 cursor-pointer hover:text-white transition"
          size="30"
        />
      </div>
      <PlayerDurationSlider
        :max-value="duration"
        :value="Math.floor(seekPosition)"
        @seek-change="(newSeekPosition: number) => changeSeekPosition(newSeekPosition)"
      />
    </div>
    <div class="hidden md:flex w-full justify-end pr-6">
      <div class="flex items-center gap-x-2 w-[160px]">
        <RouterLink to="queue">
          <TbPlaylist size="34" class="cursor-pointer" />
        </RouterLink>
        <HiSpeakerWave @click="toogleMute" v-if="volume !== 0" size="34" class="cursor-pointer" />
        <HiSpeakerXMark @click="toogleMute" v-else size="34" class="cursor-pointer" />
        <PlayerVolumeSlider :value="volume" @volume-change="(newVolume) => (changeVolume(newVolume))" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
