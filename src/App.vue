<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import LoginModal from './components/LoginModal.vue'
</script>

<template>
  <div class="bg-[#1A2028] w-[100%] min-h-screen max-h-[100%]">
    <Navbar />
    <RouterView />
  </div>
</template>
