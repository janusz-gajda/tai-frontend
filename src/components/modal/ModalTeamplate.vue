<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import {
        DialogRoot,
        DialogPortal,
        DialogOverlay,
        DialogContent,
        DialogTitle,
        DialogDescription,
        DialogClose
    } from 'radix-vue'
    import {IoMdClose} from 'vue3-icons/io'

    const props = defineProps<{
        isOpen: boolean
        title: string
        description: string
        error?: string
    }>()
</script>

<template>
    <DialogRoot
        :open="props.isOpen"
        :default-open="props.isOpen"
        @update:open="$emit('update:isOpen')"
    >
        <DialogPortal>
            <DialogOverlay class="bg-neutral-900/90 backdrop-blur-sm fixed inset-0" />
            <DialogContent
                class="fixed overflow-scroll drop-shadow-md border border-neutral-700 top-[50%] left-[50%] max-h-full h-full md:h-auto md:max-h[85vh] w-full md:w-[90vw] md:max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-neutral-800 p-[25px] focus:outline-none"
            >
                <DialogTitle class="text-xl text-center font-bold mb-4">
                    {{ props.title }}
                </DialogTitle>
                <DialogDescription class="text-center mb-5 text-md leading-normal">
                    {{ props.description }}
                </DialogDescription>
                <DialogDescription
                    v-if="props.error"
                    class="text-center mb-5 text-md leading-normal text-red-500"
                >
                    {{ props.error.capitalize() }}
                </DialogDescription>
                <div>
                    <slot />
                </div>
                <DialogClose as-child>
                    <button
                        class="text-neutral-400 hover:text-white absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:outline-none"
                    >
                        <IoMdClose />
                    </button>
                </DialogClose>
            </DialogContent>
        </DialogPortal>
    </DialogRoot>
</template>

<style scoped></style>
