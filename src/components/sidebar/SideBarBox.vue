<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
</script>

<template>
  <div :class="twMerge(`bg-neutral-900 rounded-lg h-fit w-full`)">
    <slot></slot>
  </div>
</template>

<style scoped></style>
