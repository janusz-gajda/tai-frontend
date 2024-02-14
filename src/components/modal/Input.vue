<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import {ref, computed, defineEmits, type Ref} from 'vue'

    const emit = defineEmits(['update:value'])

    const props = defineProps<{
        value?: string
        type: string
        placeholder: string
        errFun: (value: string) => string
    }>()

    const model = computed({
        get(): string {
            return props.value || ''
        },
        set(newValue): void {
            emit('update:value', newValue)
            error.value = props.errFun(newValue)
        }
    })

    const error: Ref<string> = ref('')
</script>

<template>
    <div class="text-center relative">
        <input
            v-model="model"
            class="w-full rounded-full focus bg-neutral-700 px-4 py-4 mt-4 focus:outline-none"
            :class="{'border-red-500 border-solid border-2': error}"
            :type="props.type"
            :placeholder="props.placeholder"
        />
        <p v-if="error" class="absolute top-4 left-6 text-red-500">{{ error }}</p>
    </div>
</template>

<style scoped></style>
