<script setup lang="ts">
import LoginButton from './sidebar/LoginButton.vue'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'vue3-icons/rx'
import { HiHome } from 'vue3-icons/hi'
import { BiSearch } from 'vue3-icons/bi'

function logout() {
  //TODO: logout
  alert('handle logout')
}
</script>

<template>
  <div :class="twMerge(`h-fit bg-gradient-to-b from-emerald-800 p-6`)">
    <div class="w-full mb-4 flex items-center justify-between">
      <div class="hidden md:flex gap-x-2 items-center">
        <button
          @click="$router.back()"
          class="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
        >
          <RxCaretLeft class="text-white" size="35" />
        </button>
        <button
          @click="$router.forward()"
          class="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
        >
          <RxCaretRight class="text-white" size="35" />
        </button>
      </div>
      <div class="flex md:hidden gap-x-2 items-center">
        <button
          class="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
        >
          <HiHome class="text-black" size="20" />
        </button>
        <button
          class="rounded-full p-2 bg-white flex items-center justify-center hover:opacity-75 transition"
        >
          <BiSearch class="text-black" size="20" />
        </button>
      </div>
      <div class="flex justify-between items-center gap-x-4">
        <div>
          <LoginButton class="bg-transparent text-neutral-300 font-medium"> Sign up </LoginButton>
        </div>
        <div>
          <LoginButton class="bg-white px-6 py-2"> Log in </LoginButton>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<style scoped></style>
