<script setup lang="ts">
    import {ref, type Ref} from 'vue'
    import ModalTeamplate from './ModalTeamplate.vue'
    import UploadAlbum from './upload/UploadAlbum.vue'
    import * as mmb from 'music-metadata-browser'
    import type {AlbumUpload} from '@/types/album'
    import type {SongUpload} from '@/types/song'
    import {uploadSongs} from '@/api/upload'
    import {useContentStore} from '@/stores/content'

    async function fileChanged(event: Event): Promise<AlbumUpload[]> {
        const target = event.target as HTMLInputElement
        if (target && target.files) {
            const files: FileList = target.files
            let temp: AlbumUpload[] = []
            console.log(files)
            for (const file of files) {
                const metadata = await mmb.parseBlob(file)
                let song: SongUpload = {
                    name: metadata.common.title,
                    artist: metadata.common.artist,
                    trackNo: metadata.common.track.no,
                    filename: file.name
                }
                const albumIndex = temp.findIndex((album) => album.name === metadata.common.album)
                if (albumIndex === -1) {
                    const album: AlbumUpload = {
                        name: metadata.common.album,
                        artist: metadata.common.artist,
                        noOfTrack: metadata.common.track.of || 0,
                        year: metadata.common.year,
                        picture: metadata.common.picture,
                        songs: [song]
                    }
                    temp.push(album)
                } else {
                    temp[albumIndex].songs.push(song)
                }
            }
            return temp
        }
        return []
    }

    function handeFileChanged(event: Event) {
        fileChanged(event).then((result: AlbumUpload[] | null) => {
            if (!result) return

            for (const album of result) {
                album.songs.sort((a, b) => (a.trackNo || 0) - (b.trackNo || 0))
            }
            filesMetadata.value = result
            console.log(filesMetadata.value)
        })
    }

    function uploadFiles() {
        if (fileInput.value) {
            let avaliableFiles: File[] = []

            for (let i = 0; i < (fileInput.value.files?.length || 0); i++) {
                const item: File | null | undefined = fileInput.value.files?.item(i)
                if (item) avaliableFiles.push(item)
            }

            let filesToUpload: File[] = []
            for (const album of filesMetadata.value) {
                for (const song of album.songs) {
                    filesToUpload.push(
                        avaliableFiles.find((file) => file.name === song.filename) as File
                    )
                }
            }
            uploadSongs(filesToUpload)
                .then(() => {
                    console.log('File upload completed')
                    contentStore.refreshContent()
                    console.log(contentStore.songs)
                    console.log(contentStore.albums)
                })
                .catch((err) => {
                    error.value = err.message
                })
        }
    }

    const fileInput: Ref<HTMLInputElement | null> = ref(null)
    const error: Ref<string> = ref('')
    const contentStore = useContentStore()
    const filesMetadata: Ref<AlbumUpload[]> = ref([])
    const props = defineProps<{
        isOpen: boolean
    }>()

    function selectFiles() {
        fileInput.value?.click()
    }
</script>

<template>
    <ModalTeamplate
        @update:is-open="$emit('update:isOpen')"
        title="Select files to upload"
        description=""
        :is-open="props.isOpen"
        :error="error"
    >
        <div class="gap-x-3">
            <input
                ref="fileInput"
                @change="handeFileChanged($event)"
                class="hidden"
                type="file"
                multiple
            />
            <button
                @click="selectFiles"
                class="w-full rounded-full bg-neutral-700 hover:bg-neutral-600 px-4 py-3 mt-10 text-white font-bold transition"
            >
                Select files
            </button>
            <div class="my-4">
                <UploadAlbum
                    @delete-song="(songIndex) => album.songs.splice(songIndex, 1)"
                    @delete-album="filesMetadata.splice(index, 1)"
                    v-for="(album, index) in filesMetadata"
                    :key="index"
                    :album="album"
                />
            </div>
            <button
                @click="uploadFiles"
                v-if="filesMetadata.length > 0"
                class="w-full rounded-full bg-green-700 hover:bg-green-600 px-4 py-3 mt-10 text-white font-bold transition"
            >
                Upload
            </button>
        </div>
    </ModalTeamplate>
</template>

<style scoped></style>
