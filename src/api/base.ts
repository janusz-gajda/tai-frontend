import axios, {AxiosError, type AxiosInstance} from 'axios'
import {ResponseError, type response200} from '@/types/responses'
import {useUserStore} from '@/stores/user'
//@ts-ignore
const backendUrl = import.meta.env.VITE_API_URL
let userStore: any

export function getJWT() {
    if (!userStore) {
        userStore = useUserStore()
    }
    return userStore.getJWT()
}

export function setJWT(token: string) {
    if (!userStore) {
        userStore = useUserStore()
    }
    return userStore.setJWT(token)
}

export const instance: AxiosInstance = axios.create({
    baseURL: backendUrl
})

export function parseOk(response: response200): any {
    if(response._token)
        setJWT(response._token)
    return response.payload
}

export async function get(route: string, param: any = {}): Promise<any> {
    try{
        const response = await instance.get(route, {
            params: param,
            headers: {
                Authorization: `Bearer ${getJWT()}`
            }
        })
        return parseOk(response.data)
    } catch(err) {
        if (err instanceof AxiosError) throw new ResponseError(err)
        else throw err
    }
    
}

export async function post(route: string, payload: any = {}): Promise<any> {
    try{
        const response = await instance.post(route, payload, {
            headers: {
                Authorization: `Bearer ${getJWT()}`
            }
        })
        return parseOk(response.data)
    } catch(err) {
        if (err instanceof AxiosError) throw new ResponseError(err)
        else throw err
    }
    
}

export async function put(route: string, payload: any = {}): Promise<any> {
    try{
        const response = await instance.put(route, payload, {
            headers: {
                Authorization: `Bearer ${getJWT()}`
            }
        })
        return parseOk(response.data)
    } catch(err) {
        if (err instanceof AxiosError) throw new ResponseError(err)
        else throw err
    }
    
    
}
