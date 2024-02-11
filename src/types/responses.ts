import type { AxiosError } from "axios"

export interface response200{
    _token: string,
    payload: {}
}

export class ResponseError extends Error{
    code: number

    constructor(error: AxiosError)
    constructor(message: string, code: number)
    constructor(...arr: any[]){
        let _message: string
        let _code: number
        if(arr.length == 1) {
            const error = arr[0]
            
            //@ts-ignore
            _message = error.response?.data?.message || error.message
            _code = error?.response?.status || 500

        } else {
            _message = arr[0]
            _code = arr[1]
        }

        super(_message)
        this.code = _code
    }
    
}