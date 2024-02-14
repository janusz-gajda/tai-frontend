<script setup lang="ts">
    import HomeHeader from '@/components/HomeHeader.vue'
    import {ref, watch, type Ref} from 'vue'
    import Input from '@/components/modal/Input.vue'
    import { useUserStore } from '@/stores/user';
    import { put } from '@/api/base';

    const userStore = useUserStore()

    const username: Ref<string> = ref(userStore.name)
    const email: Ref<string> = ref(userStore.name)
    const password: Ref<string> = ref('')
    const newPassword: Ref<string> = ref('')
    const error: Ref<string> = ref('')
    const success: Ref<string> = ref('')

    function usernameError(value: string): string {
        if (value.length === 0) {
            return 'Username cannot be empty'
        }
        return ''
    }

    function emailError(value: string): string {
        if (value.length === 0) {
            return 'Email cannot be empty'
        } else if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return 'Invalid email format'
        }
        return ''
    }
    function passwordError(value: string): string {
        if (value.length === 0) {
            return 'Password cannot be empty'
        } else if (value.length < 8) {
            return 'Password must be at least 8 characters long'
        }
        return ''
    }

    function handleInfoChange(){
        if(usernameError(username.value) !== ''){
            error.value = usernameError(username.value)
            setTimeout(() => {
                error.value = ''
            }, 5005)
        }

        if(emailError(email.value) !== ''){
            error.value = emailError(email.value)
            setTimeout(() => {
                error.value = ''
            }, 5005)
        }

        put('user', {
            username: username.value,
            email: email.value
        }).then((res) => {
            userStore.name = username.value
            userStore.email = email.value
            success.value = 'User info has been changed'

        }).catch((err) => {
            error.value = err.message.capitalize()
        }).finally(() => {
            setTimeout(() => {
                success.value = ''
                error.value = ''
            }, 5000)
        })
    }

    function handleChangePassword(){
        put('user/password', {
            oldPassword: password.value,
            newPassword: newPassword.value
        }).then((res) => {
            success.value = 'Password has been changed'
        }).catch((err) => {
            console.log(err)
            error.value = err.message.capitalize()
        }).finally(() => {
            setTimeout(() => {
                success.value = ''
                error.value = ''
            }, 5000)
        })
    }
</script>

<template>
    <div class="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto">
        <HomeHeader>
        </HomeHeader>
        <div v-if="userStore.id" class="flex flex-col items-center w-full">
            <p class="text-red-500 font-bold text-2xl transit">{{ error }}</p>
            <p class="text-green-500 font-bold text-2xl transit">{{ success }}</p>
            <main class="mt-2 px-6 w-full max-w-[800px] flex flex-col md:flex-row justify-around">
                <div class="flex flex-col justify-center items-center w-full md:w-1/2 md:max-w-[400px] mr-10">
                    <p class="text-neutral-400 text-center">Change user info</p>
                    <Input
                        type="text"
                        placeholder="Username"
                        @update:value="(value) => (username = value)"
                        :err-fun="usernameError"
                        :value="userStore.name"
                        class="w-full max-w-[400px]"
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        @update:value="(value) => (email = value)"
                        :err-fun="emailError"
                        :value="userStore.email"
                        class="w-full max-w-[400px]"
                    />
                    <button @click="handleInfoChange" class="w-full max-w-[200px] rounded-full hover:bg-green-500 bg-green-700 px-4 py-3 mt-10 text-white font-bold transform">
                        Change info
                    </button>

                </div>
                <div class="flex flex-col justify-center items-center w-full md:w-1/2 md:max-w-[400px]">
                    <p class="text-neutral-400 text-center">Change password</p>
                    <Input
                        type="password"
                        placeholder="Old password"
                        @update:value="(value) => (password = value)"
                        :err-fun="()=> ''"
                        class="w-full max-w-[400px]"
                    />
                    <Input
                        type="password"
                        placeholder="New password"
                        @update:value="(value) => (newPassword = value)"
                        :err-fun="passwordError"
                        class="w-full max-w-[400px]"
                    />
                    <button @click="handleChangePassword" class="w-full max-w-[200px] rounded-full hover:bg-green-500 bg-green-700 px-4 py-3 mt-10 text-white font-bold transform">
                        Change password
                    </button>
                </div>
            </main>
        </div>
        
    </div>
</template>
