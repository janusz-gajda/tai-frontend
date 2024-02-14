import {ResponseError} from '@/types/responses'
import {instance, parseOk, setJWT, getJWT} from './base'
import {AxiosError} from 'axios'

export async function uploadSongs(files: File[], access: string = 'PUBLIC'): Promise<Boolean> {
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
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status == 409) {
                    continue
                }
                throw new ResponseError(err)
            } else throw err
        }
    }

    return true
}
