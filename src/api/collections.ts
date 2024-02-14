import type {Collection} from '@/types/collections'
import {get, post, put} from './base'

export async function getCollections(type: string = 'ALL'): Promise<Collection[]> {
    return await get('collections', {type: type})
}

export async function createPlaylist(name: string, description: string): Promise<Collection> {
    return await post('collections', {
        type: "PLAYLIST",
        access: 'PRIVATE',
        name: name,
        description: description,
    })
}

export async function addToPlaylist(songId: number, playlistId: number): Promise<Collection> {
    return await post(`collections/${playlistId}/song/${songId}`)
    
}

export async function removeFromPlaylist(songId: number, playlistId: number): Promise<Collection> {
    return await put(`collections/${playlistId}/song/${songId}`)
    
}