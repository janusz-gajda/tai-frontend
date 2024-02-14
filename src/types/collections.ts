import type {accessType} from './access'
import type {SongBackend, SongFrontend} from './song'
export enum collectionType {
    playlist = 'PLAYLIST',
    album = 'ALBUM'
}

export type Collection = {
    id: number
    access: accessType.private | accessType.shared
    creatorId: number
    name: string
    description: string | null
    type: collectionType.playlist | collectionType.album
    songs: SongBackend[]
}
