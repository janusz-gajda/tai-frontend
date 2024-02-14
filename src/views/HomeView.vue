<script setup lang="ts">
    import HomeHeader from '@/components/HomeHeader.vue'
    import ListItem from '@/components/ListItem.vue'
    import likedUrl from '@/assets/images/liked.png'
    import {usePlayerStore} from '@/stores/player'
    import {useContentStore} from '@/stores/content'
    import PageContent from '@/components/PageContent.vue'

    const palyerStore = usePlayerStore()
    const contentStore = useContentStore()
</script>

<template>
    <div class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <HomeHeader>
            <div class="mb-2">
                <h1 class="tex-white text-3xl font-semibold">Welcome back</h1>
                <div
                    class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4"
                >
                    <ListItem :image="likedUrl" name="Liked songs" href="" />
                </div>
            </div>
        </HomeHeader>
        <main class="mt-2 px-6">
            <div class="flex justify-between items-center">
                <h1 class="text-white text-2xl font-semibold">Newest songs</h1>
            </div>
            <PageContent :albums="contentStore.albums" :playlists="contentStore.playlists" />
        </main>
    </div>
</template>
