import type {SongFrontend} from './song'

export type PlaylistFrontend = {
    id: number
    name: string
    description: string | null
    songs: SongFrontend[]
    access: string
}
