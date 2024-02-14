import type {accessType} from './access'

export type SongBackend = {
    id: number
    access: accessType
    author: string
    title: string
}

export type SongFrontend = {
    id: number
    access: accessType
    author: string
    title: string
    url: string
    coverUrl: string
    isLiked: boolean
    album: string
    albumId: number
}

export type SongUpload = {
    name: string | undefined
    artist: string | undefined
    trackNo: number | null
    filename: string | undefined
}

export enum SongQuality {
    low = '128k.aac',
    medium = '192k.aac',
    high = '256k.aac',
    ultra = '320k.aac'
}
