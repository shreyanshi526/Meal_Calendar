<template>
  <div class="text-white flex items-center justify-center w-full min-h-[89vh] max-h-full">
    <!-- Login Form -->
    <div v-if="isLogin" class="w-[80%] sm:w-3/4 lg:w-1/4 min-h-[25rem] max-h-full bg-gray-700 flex flex-col py-5 flex-shrink-0">
      <h2 class="self-center text-3xl">Login</h2>
      <form @submit.prevent="submitLogin" class="pl-6 flex flex-col">
        <div class="flex flex-col w-3/4 mt-6 gap-y-3">
          <label for="login-username">Username : </label>
          <input
            class="rounded-md h-9 text-black pl-2"
            type="text"
            id="login-username"
            v-model="loginUsername"
            required
          />
        </div>
        <div class="flex flex-col w-3/4 mt-6 gap-y-3">
          <label for="login-password">Password :</label>
          <input
            class="rounded-md h-9 text-black pl-2"
            type="password"
            id="login-password"
            v-model="loginPassword"
            required
          />
        </div>
        <button
          type="submit"
          class="mt-8 bg-yellow-300 h-9 text-lg rounded-md hover:border hover:border-yellow-500 hover:text-yellow-600 hover:bg-transparent text-gray-700 w-3/4"
        >
          Login
        </button>
      </form>
      <button class="mt-8" @click="goToSignup">
        Don't have an account?<span class="pl-1 text-green-400 underline">Sign Up</span>
      </button>
    </div>

    <!-- Signup Form -->
    <div v-else class="w-[80%] sm:w-3/4 lg:w-1/4 min-h-[25rem] max-h-full bg-gray-700 flex flex-col py-5 flex-shrink-0">
      <h2 class="self-center text-3xl">Sign Up</h2>
      <form @submit.prevent="submitSignup" class="pl-6 flex flex-col">
        <div class="flex flex-col w-3/4 mt-6 gap-y-3">
          <label for="signup-username">Username : </label>
          <input
            class="rounded-md h-9 text-black pl-2"
            type="text"
            id="signup-username"
            v-model="signupUsername"
            required
          />
        </div>
        <div class="flex flex-col w-3/4 mt-4 gap-y-3">
          <label for="signup-email">Email :</label>
          <input
            class="rounded-md h-9 text-black pl-2"
            type="email"
            id="signup-email"
            v-model="signupEmail"
            required
          />
        </div>
        <div class="flex flex-col w-3/4 mt-4 gap-y-3">
          <label for="signup-password">Password :</label>
          <input
            class="rounded-md h-9 text-black pl-2"
            type="password"
            id="signup-password"
            v-model="signupPassword"
            required
          />
        </div>
        <button
          type="submit"
          class="mt-8 bg-green-300 h-9 text-lg rounded-md hover:border-2 hover:border-green-500 hover:text-green-300 hover:bg-transparent text-gray-700 w-3/4"
        >
          Sign Up
        </button>
      </form>
      <button @click="goToLogin" class="mt-8">
        Already have an account?<span class="pl-1 text-yellow-400 underline">Log In</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'LogInSignupView',
  setup() {
    const isLogin = ref(true)
    const loginUsername = ref('')
    const loginPassword = ref('')
    const signupUsername = ref('')
    const signupEmail = ref('')
    const signupPassword = ref('')

    const route = useRoute()
    const router = useRouter()
    const store = useStore()

    // Function to determine if current route is login or signup
    const checkFormType = () => {
      isLogin.value = route.path === '/login'
    }

    // Watch for route changes and update form visibility
    watch(
      () => route.path,
      checkFormType,
      { immediate: true } // Trigger immediately on component mount
    )

    const goToLogin = () => {
      router.push('/login')
    }

    const goToSignup = () => {
      router.push('/signup')
    }

    const submitLogin = () => {
      store.dispatch('login', router)
    }

    const submitSignup = () => {
      store.dispatch('signup', router)
    }

    const submitLogout = () => {
      store.dispatch('logout', router)
    }

    return {
      isLogin,
      loginUsername,
      loginPassword,
      signupUsername,
      signupEmail,
      signupPassword,
      goToLogin,
      goToSignup,
      submitLogin,
      submitSignup
    }
  }
})
</script>

<style scoped>
/* Add your styles here */
</style>
