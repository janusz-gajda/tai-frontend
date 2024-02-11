import {ref, computed} from 'vue'
import {defineStore} from 'pinia'
import {type User} from '@/types/user'

export const useUserStore = defineStore('user', () => {
    const id = ref(0)
    const name = ref('')
    const email = ref('')
    const googleId = ref('')

    function setUser(user: User) {
        id.value = user.id
        name.value = user.name
        email.value = user.email
        googleId.value = user.googleId || ''
    }

    function getUser(): User {
        return {
            id: id.value, 
            name: name.value, 
            email: email.value, 
            googleId: googleId.value
        }
    }
    return {setUser, getUser, id, name, email, googleId}
})
