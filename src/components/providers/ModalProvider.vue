<script setup lang="ts">
    import {useModalStore} from '@/stores/modal'
    import ModalLogin from '@/components/modal/ModalLogin.vue'
    import ModalRegister from '@/components/modal/ModalRegister.vue'
    import ModalMobilePlayer from '../modal/ModalMobilePlayer.vue'
    import {onMounted, onUnmounted, ref} from 'vue'
    import ModalUpload from '../modal/ModalUpload.vue'
    const modalStore = useModalStore()

    const md = 768
    const width = ref(window.innerWidth)

    const handleResize = () => {
        width.value = window.innerWidth
    }

    onMounted(() => {
        window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', handleResize)
    })
</script>

<template>
    <ModalLogin
        @register="modalStore.openModal('register')"
        v-if="modalStore.activeModal === 'login'"
        :is-open="modalStore.isOpen"
        @update:is-open="modalStore.closeModal"
    />
    <ModalRegister
        @login="modalStore.openModal('login')"
        v-if="modalStore.activeModal === 'register'"
        :is-open="modalStore.isOpen"
        @update:is-open="modalStore.closeModal"
    />
    <ModalMobilePlayer
        v-if="modalStore.activeModal === 'player' && width < md"
        :is-open="modalStore.isOpen"
        @update:is-open="modalStore.closeModal"
    />
    <ModalUpload
        v-if="modalStore.activeModal === 'upload'"
        :is-open="modalStore.isOpen"
        @update:is-open="modalStore.closeModal"
    />
</template>

<style scoped></style>
