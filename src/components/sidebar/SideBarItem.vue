<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { IconType } from 'vue3-icons/lib/esm'
import { useRoute } from 'vue-router'
const props = defineProps<{
  to: string
  label: string
  activeClass?: string
  inactiveClass?: string
  icon?: IconType
}>()
</script>

<template>
  <RouterLink
    :class="[
      twMerge(`flex flex-row h-auto items-center w-full gap-x-4 text-md 
    font-medium cursor-pointer hover:text-white transition text-neutral-400 py-1`),
      to === useRoute().path ? props.activeClass : props.inactiveClass
    ]"
    :to="to"
  >
    <props.icon size="26" />
    <p class="truncate w-100">{{ label }}</p>
  </RouterLink>
</template>

<style scoped></style>
