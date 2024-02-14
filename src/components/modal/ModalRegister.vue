<script setup lang="ts">
    import ModalTeamplate from './ModalTeamplate.vue'
    import {FaGoogle} from 'vue3-icons/fa'
    import {ref, watch, type Ref} from 'vue'
    import Input from './Input.vue'
    import { register } from '@/api/auth';
    import type { User } from '@/types/user';
    import { useUserStore } from '@/stores/user';
    import type { ResponseError } from '@/types/responses';

    const props = defineProps<{
        isOpen: boolean
    }>()

    const emit = defineEmits(['update:isOpen', 'login'])
    const error: Ref<string> = ref('')

    const username: Ref<string> = ref('')
    const email: Ref<string> = ref('')
    const password: Ref<string> = ref('')
    const repeatPassword: Ref<string> = ref('')

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

    function repeatPasswordError(value: string): string {
        if (value.length === 0) {
            return 'Repeat password cannot be empty'
        } else if (value !== password.value) {
            return 'Passwords do not match'
        }
        return ''
    }

    function handleRegister() {
        if(usernameError(username.value) === '' 
            && emailError(email.value) === '' 
            && passwordError(password.value) === '' 
            && repeatPasswordError(repeatPassword.value) === '') {
                register(username.value, email.value, password.value).then((user: User) => {
                    useUserStore().setUser(user)
                    emit('update:isOpen', false)
                }).catch((err: ResponseError) => {
                    error.value = err.message
                })
        }
    }
</script>

<template>
    <ModalTeamplate
        @update:is-open="$emit('update:isOpen')"
        title="Register"
        description="Register to access all features"
        :is-open="props.isOpen"
        :error="error"
    >
        <div class="gap-x-3">
            <Input
                type="text"
                placeholder="Username"
                @update:value="(value) => (username = value)"
                :err-fun="usernameError"
            />
            <Input
                type="email"
                placeholder="Email"
                @update:value="(value) => (email = value)"
                :err-fun="emailError"
            />
            <Input
                type="password"
                placeholder="Password"
                @update:value="(value) => (password = value)"
                :err-fun="passwordError"
            />
            <Input
                type="password"
                placeholder="Repeat password"
                @update:value="(value) => (repeatPassword = value)"
                :err-fun="repeatPasswordError"
            />
            <button @click="handleRegister" class="w-full rounded-full bg-green-500 px-4 py-3 mt-10 text-white font-bold">
                Register
            </button>
            <button
                class="w-full rounded-full bg-blue-600 px-4 py-3 my-2 mt-5 text-white font-bold flex justify-center items-center gap-x-2"
            >
                <FaGoogle size="24" />
                <p>Register with Google</p>
            </button>
        </div>
        <div class="flex flex-row justify-center items-center gap-x-2">
            <p class="text-neutral-400">Already have an account?</p>
            <p @click="$emit('login')" class="text-white cursor-pointer hover:underline">
                Log in here
            </p>
        </div>
    </ModalTeamplate>
</template>

<style scoped></style>
