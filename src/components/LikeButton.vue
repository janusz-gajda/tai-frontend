<script setup lang="ts">
import { ref } from 'vue'
import { AiFillHeart, AiOutlineHeart } from 'vue3-icons/ai'
const isLiked = ref(false)

function handleLikeClick() {
  isLiked.value = !isLiked.value
}
</script>

<template>
  <button class="cursor-pointer hover:opacity-75 transition">
    <AiFillHeart @click="handleLikeClick" v-if="isLiked" style="color: #22c55e" size="25" />
    <AiOutlineHeart @click="handleLikeClick" v-else style="color: white" size="25" />
  </button>
</template>

<style scoped></style>
