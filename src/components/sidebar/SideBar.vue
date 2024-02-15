<script setup lang="ts">
    import {BiSearch, BiSolidHome} from 'vue3-icons/bi'
    import SideBarBox from './SideBarBox.vue'
    import SideBarItem from './SideBarItem.vue'
    import SideBarLiblary from './SideBarLiblary.vue'
</script>

<template>
    <div class="flex h-screen">
        <div class="hidden md:flex flex-col gap-y-2 bg-black h-screen w-[300px] p-2">
            <SideBarBox>
                <div class="flex flex-col gap-y-4 px-5 py-4">
                    <SideBarItem
                        to="/"
                        label="Home"
                        active-class="text-white"
                        :icon="BiSolidHome"
                    />
                    <SideBarItem
                        to="/search"
                        label="Search"
                        active-class="text-white"
                        :icon="BiSearch"
                    />
                </div>
            </SideBarBox>
            <SideBarBox class="overflow-y-auto h-full">
                <SideBarLiblary />
            </SideBarBox>
        </div>
        <div class="h-full flex-1 overflow-auto py-2">
            <slot />
        </div>
    </div>
</template>

<style scoped></style>
