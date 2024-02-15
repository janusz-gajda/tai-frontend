import {ResponseError} from '@/types/responses'
import {instance, parseOk, getJWT} from './base'
import {AxiosError} from 'axios'
import {useContentStore} from '@/stores/content'

export async function uploadSongs(files: File[], access: string = 'PUBLIC'): Promise<Boolean> {
    const contentStore = useContentStore()
    contentStore.uploadProgress = 0
    contentStore.uploadMax = files.length
    for (const file of files) {
        try {
            const formData = new FormData()
            formData.append('file', file)
            const response = await instance.post('songs', formData, {
                params: {
                    access: access
                },
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${getJWT()}`
                }
            })
            parseOk(response.data)
            contentStore.uploadProgress += 1
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status == 409) {
                    contentStore.uploadProgress += 1
                    continue
                }
                contentStore.uploadProgress = 0
                contentStore.uploadMax = 0
                throw new ResponseError(err)
            } else {
                contentStore.uploadProgress = 0
                contentStore.uploadMax = 0
                throw err
            }
        }
    }
    contentStore.uploadProgress = 0
    contentStore.uploadMax = 0
    return true
}
