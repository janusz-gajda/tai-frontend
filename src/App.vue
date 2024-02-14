<script setup lang="ts">
    import { onMounted } from 'vue'
    import {RouterLink, RouterView} from 'vue-router'
    import SideBar from './components/sidebar/SideBar.vue'
    import Player from './components/player/Player.vue'
    import ModalProvider from './components/providers/ModalProvider.vue'
    import {getCollections} from './api/collections'
    import {get} from '@/api/base'
    import {useUserStore} from '@/stores/user'
    import {useContentStore} from '@/stores/content'

    onMounted(() => {
        get('user').then((res) => {
            useContentStore().refreshContent(useUserStore().id)
            }).catch((err) => {
                useUserStore().clear()
                useContentStore().clear()
            })
    })
</script>

<template>
    <ModalProvider />
    <SideBar>
        <RouterView />
    </SideBar>
    <Player />
    
</template>

<style scoped></style>
