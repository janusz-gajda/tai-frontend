<script setup lang="ts">
import HomeHeader from '@/components/HomeHeader.vue'
import Queue from '@/components/queue/Queue.vue'
</script>

<template>
  <div class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
    <HomeHeader />
    <main class="mt-2 mb-7 px-6">
      <Queue />
    </main>
  </div>
</template>

<style scoped></style>
