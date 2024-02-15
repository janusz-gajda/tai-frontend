import {ref} from 'vue'
import {defineStore} from 'pinia'
import {type User} from '@/types/user'

export const useUserStore = defineStore(
    'user',
    () => {
        const id = ref(0)
        const name = ref('')
        const email = ref('')
        const googleId = ref('')
        const jwt = ref('')

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

        function logout(): void {
            id.value = 0
            name.value = ''
            email.value = ''
            googleId.value = ''
        }

        function getJWT(): string {
            return jwt.value
        }

        function setJWT(token: string): void {
            jwt.value = token
        }

        function clear() {
            id.value = 0
            name.value = ''
            email.value = ''
            googleId.value = ''
            jwt.value = ''
        }
        return {setUser, getUser, id, name, email, googleId, jwt, logout, getJWT, setJWT, clear}
    },
    {
        persist: true
    }
)
