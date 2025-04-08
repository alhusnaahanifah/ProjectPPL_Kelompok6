<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-green-100 via-white to-green-50">
    <!-- HEADER -->
    <header
      class="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl box-border flex justify-between items-center px-6 py-1 z-50 
            bg-[#2f3828]/20 text-white backdrop-blur-md border border-white/30 rounded-full shadow-md"
    >
      <div class="flex items-center space-x-4">
        <img src="../image/hlogo-samping.png" alt="Logo Project" class="w-32 h-auto">
      </div>
      <Link href="/dashboard" class="flex items-center gap-1 text-[#597036] hover:text-white">
        <i class="fas fa-home"></i>
        <span class="hidden sm:inline">Dashboard</span>
      </Link>
      <div class="relative">
        <button
          @click="toggleMenu"
          class="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg flex items-center gap-2 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <transition name="fade">
          <div
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 min-w-[8rem] bg-white rounded-lg shadow-md py-2 z-50 border border-gray-200"
          >
            <Link
              href="/profile"
              class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors whitespace-nowrap"
              @click="toggleMenu"
            >
              <i class="fas fa-user text-[#597036]"></i> Profil
            </Link>
            <button
              @click="logout"
              class="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors whitespace-nowrap"
            >
              <i class="fas fa-sign-out-alt text-[#597036]"></i> Keluar
            </button>
          </div>
        </transition>
      </div>
    </header>


    <!-- MAIN -->
    <main class="flex-grow py-10 px-6 pt-32">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-4xl font-bold text-green-800 mb-8 text-center">
          Selamat Datang {{ user.fullName }} 🌱
        </h2>
        <p class="text-center text-gray-700 mb-10">
          Mari mulai perjalanan hidroponikmu. Pilih fitur yang ingin kamu eksplorasi!
        </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Tes Kepribadian Tanaman -->
            <Link
              href="/plant-quiz"
              class="bg-white rounded-2xl shadow-md hover:shadow-xl p-6 text-center cursor-pointer block transition duration-300 transform hover:scale-105"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-green-600" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 4.5v2m0 11v2m7-7h-2m-11 0H4m13.657-5.657l-1.414 1.414M6.343 17.657l-1.414 1.414m0-13.414l1.414 1.414M17.657 17.657l1.414 1.414"/>
              </svg>
              <h3 class="text-xl font-semibold text-green-700 mb-2">Tes Kepribadian Tanaman</h3>
              <p class="text-gray-600">Temukan tanaman yang cocok dengan kepribadian dan gaya hidupmu.</p>
            </Link>

            <!-- Tantangan 7 Hari -->
            <Link
              href="/7-step-challenge"
              class="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 p-6 text-center cursor-pointer block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-green-600" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M17.657 17.657l-.707-.707M12 21v-1M6.343 17.657l.707-.707M3 12h1M6.343 6.343l.707.707M12 8a4 4 0 110 8 4 4 0 010-8z"/>
              </svg>
              <h3 class="text-xl font-semibold text-green-700 mb-2">Tantangan 7 Langkah</h3>
              <p class="text-gray-600">Ikuti tantangan untuk membangun kebiasaan menanam secara menyenangkan.</p>
            </Link>

            <!-- Panduan Praktis -->
            <Link
              href="/guides"
              class="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 p-6 text-center cursor-pointer block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-green-600" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 20h9M12 4v16m0 0h-9"/>
              </svg>
              <h3 class="text-xl font-semibold text-green-700 mb-2">Panduan Praktis</h3>
              <p class="text-gray-600">Dapatkan tutorial dan infografis yang mudah diikuti, cocok untuk pemula.</p>
            </Link>
          </div>
        </div>
    </main>

    <!-- FOOTER -->
    <footer class="mt-20 bg-[#2f3828]/20 backdrop-blur-md border border-white/30 rounded-xl text-[#32690e] text-center text-sm py-4 shadow-md">
        © 2025 HidroGrow. Semua hak dilindungi.
      </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { router, Link, usePage } from '@inertiajs/vue3'

defineOptions({
  name: 'Dashboard'
})

const page = usePage()
const user = page.props.user || {}  // user dari controller

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logout = () => {
  router.get('/logout')
}
</script>