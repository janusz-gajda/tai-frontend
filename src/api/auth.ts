import {ResponseError} from '@/types/responses'
import {instance, parseOk} from './base'
import type {User} from '@/types/user'
import {AxiosError} from 'axios'
import type {CallbackTypes} from 'vue3-google-login'

export async function login(username: string, password: string): Promise<User> {
    try {
        const response = await instance.post('auth/login', {
            username,
            password
        })
        const data = parseOk(response.data)
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            googleId: data.googleId
        }
    } catch (err) {
        if (err instanceof AxiosError) throw new ResponseError(err)
        else throw err
    }
}

export async function register(username: string, email: string, password: string): Promise<User> {
    try {
        const response = await instance.post('auth/register', {
            name: username,
            email: email,
            password: password
        })
        const data = parseOk(response.data)
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            googleId: data.googleId
        }
    } catch (err) {
        if (err instanceof AxiosError) throw new ResponseError(err)
        else throw err
    }
}

export async function loginGoogle(googleResponse: CallbackTypes.TokenPopupResponse): Promise<User> {
    try {
        const response = await instance.get('auth/google/callback', {
            params: {
                code: googleResponse.access_token
            }
        })
        const data = parseOk(response.data)
        return {
            id: data.id,
            name: data.name,
            email: data.email,
            googleId: data.googleId
        }
    } catch (err) {
        if (err instanceof AxiosError) throw new ResponseError(err)
        else throw err
    }
}
