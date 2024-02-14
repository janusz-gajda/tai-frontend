<script setup lang="ts">
    import {ref, type Ref} from 'vue'
    import ModalTeamplate from './ModalTeamplate.vue';
    import Input from './Input.vue'
    import { createPlaylist } from '@/api/collections';

    import { useContentStore } from '@/stores/content';
    import { useUserStore } from '@/stores/user';

    const emit = defineEmits(['update:isOpen'])

    const contentStore = useContentStore()
    const userStore = useUserStore()

    const props = defineProps<{
        isOpen: boolean
    }>()

    const error: Ref<string> = ref('')

    let name: string = ''
    let description: string = ''




    function handleSubmit(){
        createPlaylist(name, description).then((res) => {
            contentStore.refreshContent(userStore.id)
            emit('update:isOpen', false)
        }).catch((err) => {
            console.log(err)
        })
    }
</script>

<template>
    <ModalTeamplate
        @update:is-open="$emit('update:isOpen')"
        title="Create playlist"
        description="Fill in information"
        :is-open="props.isOpen"
        :error="error"
    >
        <div class="gap-x-3">
            <Input
                @keyup.enter="handleSubmit"
                type="text"
                placeholder="Name"
                @update:value="(value) => (name = value)"
                :err-fun="
                    (value: string) => {
                        if(value.length === 0) return 'Name cannot be empty'
                        return ''
                    }
                "
            />
            <Input
                @keyup.enter="handleSubmit"
                type="text"
                placeholder="Description"
                @update:value="(value) => (description = value)"
                :err-fun="
                    (value: any) => {
                        return ''
                    }
                "
            />
            <button
                @click="handleSubmit"
                class="w-full rounded-full bg-green-500 px-4 py-3 mt-10 text-white font-bold"
            >
                Create palylist
            </button>
            
        </div>
    </ModalTeamplate>
</template>

<style scoped>

</style>