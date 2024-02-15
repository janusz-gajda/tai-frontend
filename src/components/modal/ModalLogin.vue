<script setup lang="ts">
    import {ref, defineEmits, type Ref} from 'vue'
    import ModalTeamplate from './ModalTeamplate.vue'
    import {FaGoogle} from 'vue3-icons/fa'
    import Input from './Input.vue'
    import {useUserStore} from '@/stores/user'
    import {login, loginGoogle} from '@/api/auth'
    import type {User} from '@/types/user'
    import type {CallbackTypes} from 'vue3-google-login'
    import {useContentStore} from '@/stores/content'

    const userStore = useUserStore()
    const contentStore = useContentStore()

    const emits = defineEmits(['update:isOpen', 'register'])

    const props = defineProps<{
        isOpen: boolean
    }>()

    const username: Ref<string> = ref('')
    const password: Ref<string> = ref('')
    const error: Ref<string> = ref('')

    function handleLogin() {
        login(username.value, password.value)
            .then((user: User) => {
                error.value = ''
                emits('update:isOpen')
                userStore.setUser(user)
                contentStore.refreshContent(userStore.id)
            })
            .catch((err: Error) => {
                error.value = err.message.capitalize()
            })
    }

    function googleLoginCallback(response: CallbackTypes.TokenPopupResponse) {
        loginGoogle(response)
            .then((user: User) => {
                error.value = ''
                emits('update:isOpen')
                userStore.setUser(user)
                contentStore.refreshContent(userStore.id)
            })
            .catch((err: Error) => {
                error.value = err.message.capitalize()
            })
    }
</script>

<template>
    <ModalTeamplate
        @update:is-open="$emit('update:isOpen')"
        title="Welcome back"
        description="Log in to your account"
        :is-open="props.isOpen"
        :error="error"
    >
        <div class="gap-x-3">
            <Input
                @keyup.enter="handleLogin"
                type="text"
                placeholder="Login"
                @update:value="(value) => (username = value)"
                :err-fun="
                    (value: any) => {
                        return ''
                    }
                "
            />
            <Input
                @keyup.enter="handleLogin"
                type="password"
                placeholder="Password"
                @update:value="(value) => (password = value)"
                :err-fun="
                    (value: any) => {
                        return ''
                    }
                "
            />
            <button
                @click="handleLogin"
                class="w-full rounded-full bg-green-500 px-4 py-3 mt-10 text-white font-bold"
            >
                Log in
            </button>
            <GoogleLogin class="w-full" :callback="googleLoginCallback" popup-type="TOKEN">
                <button
                    class="w-full rounded-full bg-blue-600 px-4 py-3 my-2 mt-5 text-white font-bold flex justify-center items-center gap-x-2"
                >
                    <FaGoogle size="24" />
                    <p>Log in with Google</p>
                </button>
            </GoogleLogin>
        </div>
        <div class="flex flex-row justify-center items-center gap-x-2">
            <p class="text-neutral-400">Don't have an account?</p>
            <p @click="$emit('register')" class="text-white cursor-pointer hover:underline">
                Register here
            </p>
        </div>
    </ModalTeamplate>
</template>

<style scoped></style>
