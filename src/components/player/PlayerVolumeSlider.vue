<script setup lang="ts">
    import {ref, watch} from 'vue'
    import {SliderRange, SliderRoot, SliderThumb, SliderTrack} from 'radix-vue'

    interface Props {
        value: number
    }

    const props = withDefaults(defineProps<Props>(), {
        value: 1
    })

    let value = ref([props.value])

    watch(
        () => props.value,
        (newValue: number, odlValue: number) => {
            value.value = [newValue]
        }
    )
</script>

<template>
    <SliderRoot
        class="relative flex items-center select-none touch-none w-full h-10"
        v-model="value"
        @update:model-value="$emit('volumeChange', value[0])"
        :max="1"
        :step="0.01"
        aria-label="Volume"
    >
        <SliderTrack class="h-[3px] relative grow bg-neutral-600 rounded-full">
            <SliderRange class="absolute bg-white rounded-full h-full" />
        </SliderTrack>
        <SliderThumb class="w-3 h-3 bg-white rounded-full" />
    </SliderRoot>
</template>

<style scoped></style>
