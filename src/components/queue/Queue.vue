<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useQueueStore } from '@/stores/queue';
const queue = useQueueStore();
</script>

<template>
  <div>
    <div v-for="song in queue.currentQueue" :key="song.id">
      <h1>{{ song.title + ' - ' + song.author }}</h1>
      
    </div>
  </div>
  
</template>

<style scoped></style>
