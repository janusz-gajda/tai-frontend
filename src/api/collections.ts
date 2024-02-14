import type {Collection} from '@/types/collections'
import {get} from './base'

export async function getCollections(type: string = 'ALL'): Promise<Collection[]> {
    return await get('collections', {type: type})
}
