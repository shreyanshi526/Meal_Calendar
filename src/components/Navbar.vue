<template>
  <header>
    <!-- Desktop NAv -->
    <nav class="hidden md:flex items-end justify-end pr-4 pt-6 text-white sm:gap-x-9 border-b-2 pb-5 border-gradient-to-r from-[#A264F4] to-[#EFBAD3]">
      <RouterLink class="hover:text-green-600" to="/">Home</RouterLink>
      <RouterLink class="hover:text-green-600" to="/meals">Meals</RouterLink>
      <RouterLink class="hover:text-green-600" to="/calendar">Calendar</RouterLink>
      <RouterLink class="hover:text-green-600" to="/signup">Signup</RouterLink>
      <RouterLink class="hover:text-green-600" to="/login">Login</RouterLink>
    </nav>
    
    <!-- Mobile Nav -->
    <div class="md:hidden">
      <button @click="toggleMenu" class="text-white text-2xl p-4">
        <span v-if="!isMenuOpen">☰</span>
        <span v-else>×</span>
      </button>
      <nav v-if="isMenuOpen" class="absolute top-0 right-0 bg-gray-800 text-white w-full h-screen flex flex-col items-center pt-16">
        <RouterLink class="py-4 text-lg hover:text-green-600" to="/" @click="closeMenu">Home</RouterLink>
        <RouterLink class="py-4 text-lg hover:text-green-600" to="/meals" @click="closeMenu">Meals</RouterLink>
        <RouterLink class="py-4 text-lg hover:text-green-600" to="/calendar" @click="closeMenu">Calendar</RouterLink>
        <RouterLink class="py-4 text-lg hover:text-green-600" to="/signup" @click="closeMenu">Signup</RouterLink>
        <RouterLink class="py-4 text-lg hover:text-green-600" to="/login" @click="closeMenu">Login</RouterLink>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { RouterLink } from 'vue-router'

export default defineComponent({
  name: 'Navbar',
  components: {
    RouterLink
  },
  setup() {
    const isMenuOpen = ref(false);

    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    const closeMenu = () => {
      isMenuOpen.value = false;
    };

    return {
      isMenuOpen,
      toggleMenu,
      closeMenu
    };
  }
})
</script>

<style scoped>
nav {
  transition: transform 0.3s ease-in-out;
}
</style>
