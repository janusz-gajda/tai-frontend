<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/sidebar/SideBar.vue';
import  Player from './components/player/Player.vue';
</script>

<template>
  <SideBar>
    <RouterView />
  </SideBar>
  <Player />
</template>

<style scoped>

</style>
