<script setup lang="ts">
    import {RouterLink, RouterView} from 'vue-router'
    import SideBar from './components/sidebar/SideBar.vue'
    import Player from './components/player/Player.vue'
    import ModalProvider from './components/providers/ModalProvider.vue'
</script>

<template>
    <ModalProvider />
    <SideBar>
        <RouterView />
    </SideBar>
    <Player />
</template>

<style scoped></style>
