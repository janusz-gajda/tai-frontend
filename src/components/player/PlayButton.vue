<script setup lang="ts">
    import {FaPlay} from 'vue3-icons/fa'
    
    const props = defineProps<{
        size?: number
    }>()
</script>

<template>
    <button
        class="transition opacity-0 rounded-full flex items-center bg-green-500 drop-shadow-md translate translate-y-1/4 group-hover:opacity-100 hover:scale-110"
        :class="{'p-2': props.size, 'p-4': !props.size}"
    >
        <FaPlay :size="props.size || 18" class="text-black" />
    </button>
</template>

<style scoped></style>
