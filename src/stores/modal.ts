import {ref} from 'vue'
import {defineStore} from 'pinia'

export const useModalStore = defineStore('modal', () => {
    const isOpen = ref(false)
    const activeModal = ref('')

    function openModal(modal: string) {
        isOpen.value = true
        activeModal.value = modal
    }

    function closeModal() {
        isOpen.value = false
    }

    return {
        isOpen,
        activeModal,
        openModal,
        closeModal
    }
})
