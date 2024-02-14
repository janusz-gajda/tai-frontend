<script setup lang="ts">
    import {ref, watch, type Ref} from 'vue'
    import {SliderRange, SliderRoot, SliderThumb, SliderTrack} from 'radix-vue'

    interface Props {
        active: boolean
        value: number
        maxValue: number
    }

    const props = withDefaults(defineProps<Props>(), {
        value: 0
    })

    let value: Ref<number[]> = ref([props.value])
    let active: Ref<boolean> = ref(props.active)

    function convertSeconds(seconds: number) {
        return `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${seconds % 60}`
    }

    watch(
        () => props.value,
        (newValue: number, odlValue: number) => {
            value.value = [newValue]
        }
    )
</script>

<template>
    <div class="refative w-full items-center flex">
        <h1 v-if="props.active">{{ convertSeconds(props.value) }}</h1>
        <SliderRoot
            class="group relative mx-3 flex items-center justify-between select-none touch-none w-full h-10"
            v-model="value"
            @update:model-value="$emit('seekChange', value[0])"
            :max="maxValue"
            :step="1"
            aria-label="Seek"
        >
            <SliderTrack class="h-[3px] relative grow bg-neutral-600 rounded-full">
                <SliderRange
                    class="absolute bg-white rounded-full h-full group-hover:bg-emerald-600 transition"
                />
            </SliderTrack>
            <SliderThumb v-if="props.active" class="w-3 h-3 bg-white rounded-full" />
        </SliderRoot>
        <h1 v-if="props.active">{{ convertSeconds(props.maxValue) }}</h1>
    </div>
</template>

<style scoped></style>
