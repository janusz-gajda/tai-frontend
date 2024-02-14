<script setup lang="ts">
    import {ref, type Ref} from 'vue'
    import type {PlaylistFrontend} from '@/types/playlist'
    import { DropdownMenuCheckboxItem, DropdownMenuItemIndicator } from 'radix-vue';
    import {FaCheck, FaRegSquare} from 'vue3-icons/fa'
    const props = defineProps<{
        playlist: PlaylistFrontend
    }>()

    const checked: Ref<boolean> = ref(true)
</script>

<template>
    <div class="flex flex-row justify-start items-center">
        <DropdownMenuCheckboxItem v-model:checked="checked">
            <DropdownMenuItemIndicator>
                <FaCheck />
            </DropdownMenuItemIndicator>
        </DropdownMenuCheckboxItem>
        <p>{{ props.playlist.name }}</p>
    
    </div>
    
</template>

<style scoped>

</style>