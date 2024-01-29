<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
    import PlayerContent from './PlayerContent.vue';
const placeholderData = {
        title: "Placeholder title", 
        author: "Placeholder author"
    }
</script>

<template>
    <div class="fixed bottom-0 bg-black w-full py-2 h[80px] px4">
        <PlayerContent :song="placeholderData" song-url="aaa.com"/>
    </div>
</template>

<style scoped>

</style>