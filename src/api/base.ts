import axios, { type AxiosInstance } from 'axios'
import { type response200 } from '@/types/responses'
import config from '@/config'

let jwt: string;

export function getJWT() {
    return jwt
}

export function setJWT(token: string) {
    jwt = token
}

export const instance: AxiosInstance = axios.create({
    baseURL: config.apiUrl
})

export function parseOk(response: response200): any {
    setJWT(response._token)
    return response.payload
}

export async function get(route: string, param: any = {}): Promise<any> {
    const response = await instance.get(route, {
        params: param,
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    return parseOk(response.data)
}

export async function post(route: string, payload: any = {}): Promise<any> {
    const response = await instance.post(route, {
        body: payload,
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    })
    return parseOk(response.data)
}