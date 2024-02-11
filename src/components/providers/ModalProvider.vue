<script setup lang="ts">
    import { useModalStore } from '@/stores/modal';
    import ModalLogin from '@/components/modal/ModalLogin.vue';
    import ModalRegister from '@/components/modal/ModalRegister.vue';
    const modalStore = useModalStore()
</script>

<template>
    <ModalLogin @register="modalStore.openModal('register')" v-if="modalStore.activeModal === 'login'" :is-open="modalStore.isOpen" @update:is-open="modalStore.closeModal" />
    <ModalRegister @register="modalStore.openModal('login')" v-if="modalStore.activeModal === 'register'" :is-open="modalStore.isOpen" @update:is-open="modalStore.closeModal" />
</template>

<style scoped></style>
