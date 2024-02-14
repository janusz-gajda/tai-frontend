<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import {ref, watch, defineEmits, type Ref} from 'vue'

    const emit = defineEmits(['update:value'])

    const props = defineProps<{
        value?: string
        type: string
        placeholder: string
        errFun: (value: string) => string
    }>()


    const model = ref(props.value || '')

    const error: Ref<string> = ref('')

    watch(model, (newValue, oldValue) => {
        emit('update:value', newValue)
        error.value = props.errFun(newValue)
        
    })
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
        <p v-if="error.length > 0" class="absolute top-4 left-6 text-red-500">{{ error }}</p>
    </div>
</template>

<style scoped></style>
