<script setup lang="ts">
import { twMerge } from 'tailwind-merge';

    interface Props {
        disabled?: boolean,
        type?: "button" | "submit" | "reset" | undefined
    }
    const props = withDefaults(defineProps<Props>(), {
        disabled: false,
        type: "button"
    })
</script>

<template>
    <button :type="props.type" :disabled="props.disabled"
        :class="twMerge(`w-full rounded-full  border border-transparent px-3 py-3 
        disabled:coursor-not-allowed disabled:opacity-50 text-black font-bold hover:opacity-75 transition`)">
        <slot />
        <!--bg-green-500-->
    </button>
</template>

<style scoped>

</style>