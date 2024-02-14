import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '@/views/SearchView.vue'
import QueueView from '@/views/QueueView.vue'
import AlbumView from '@/views/AlbumView.vue'
import PlaylistView from '@/views/PlaylistView.vue'
import SettingsView from '@/views/SettingsView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/search',
            name: 'search',
            component: SearchView
        },
        {
            path: '/queue',
            name: 'queue',
            component: QueueView
        },
        {
            path: '/album/:id',
            name: 'album',
            props: true,
            component: AlbumView
        },
        {
            path: '/palylist/:id',
            name: 'playlist',
            props: true,
            component: PlaylistView
        },
        {
            path: '/settings',
            name: 'settings',
            component: SettingsView
        }
    ]
})

export default router
