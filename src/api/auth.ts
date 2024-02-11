import { ResponseError } from '@/types/responses'
import {instance, getJWT, setJWT, parseOk} from './base'
import type { User } from '@/types/user'
import { AxiosError } from 'axios'
import config from '@/config'


export async function login(username: string, password: string): Promise<User> {

    try{
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
    } catch(err){
        if(err instanceof AxiosError)
            throw new ResponseError(err)
        else 
            throw err
    }
    
}

export function loginGoogle(){
    return config.apiUrl + "auth/google/"
} 


