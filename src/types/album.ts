import type {SongFrontend, SongUpload} from './song'
import * as mmb from 'music-metadata-browser'

export type AlbumUpload = {
    name: string | undefined
    artist: string | undefined
    noOfTrack: number | null
    year: number | undefined
    picture: mmb.IPicture[] | undefined
    songs: SongUpload[]
}

export type AlbumFrontend = {
    id: number
    name: string
    author: string
    coverUrl: string | undefined
    songs: SongFrontend[]
}
