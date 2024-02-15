<script setup lang="ts">
    import {onBeforeMount} from 'vue'
    import SideBar from './components/sidebar/SideBar.vue'
    import Player from './components/player/Player.vue'
    import ModalProvider from './components/providers/ModalProvider.vue'
    import {get} from '@/api/base'
    import {useUserStore} from '@/stores/user'
    import {useContentStore} from '@/stores/content'

    onBeforeMount(() => {
        get('user')
            .then(() => {
                useContentStore().refreshContent(useUserStore().id)
            })
            .catch(() => {
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
