<template>
  <div class="min-h-screen flex bg-gradient-to-br from-green-50 to-green-200">
    <!-- MAIN CONTENT -->
    <div class="flex-1 flex flex-col">
      <!-- HEADER -->
      <header class="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 class="text-2xl font-bold text-green-700">HidroGrow 🌿</h1>
        <button
          @click="toggleSidebar"
          class="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg flex items-center gap-2 shadow-sm"
        >
          <i class="fas fa-bars"></i> Menu
        </button>
      </header>

      <!-- CONTENT -->
      <main class="flex-grow py-10 px-6">
        <div class="max-w-5xl mx-auto">
          <h2 class="text-4xl font-bold text-green-800 mb-8 text-center">Selamat Datang di Dashboard HidroGrow 🌱</h2>

          <p class="text-center text-gray-700 mb-10">
            Mari mulai perjalanan hidroponikmu. Pilih fitur yang ingin kamu eksplorasi!
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <!-- Tes Kepribadian Tanaman -->
            <Link
              href="/plant-quiz"
              class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 text-center cursor-pointer block"
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
              href="/7-day-challenge"
              class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 text-center cursor-pointer block"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto mb-4 text-green-600" fill="none"
                   viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M12 3v1m6.364 1.636l-.707.707M21 12h-1M17.657 17.657l-.707-.707M12 21v-1M6.343 17.657l.707-.707M3 12h1M6.343 6.343l.707.707M12 8a4 4 0 110 8 4 4 0 010-8z"/>
              </svg>
              <h3 class="text-xl font-semibold text-green-700 mb-2">Tantangan 7 Hari</h3>
              <p class="text-gray-600">Ikuti tantangan untuk membangun kebiasaan menanam secara menyenangkan.</p>
            </Link>

            <!-- Panduan Praktis -->
            <Link
              href="/guides"
              class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 text-center cursor-pointer block"
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
      <footer class="bg-white py-4 text-center text-sm text-gray-500 border-t">
        © 2025 HidroGrow. Semua hak dilindungi.
      </footer>
    </div>

    <!-- SIDEBAR -->
    <transition name="slide">
      <div v-if="isSidebarOpen" class="fixed inset-0 z-50">
        <!-- Overlay -->
        <div 
          class="absolute inset-0 bg-black/30"
          @click="toggleSidebar"
        ></div>
        
        <!-- Sidebar Content -->
        <div class="absolute top-0 right-0 w-64 h-full bg-white shadow-lg flex flex-col">
          <div class="p-4 border-b flex justify-between items-center">
            <h2 class="text-lg font-semibold">Menu</h2>
            <button @click="toggleSidebar" class="text-gray-500 hover:text-red-500">
              <i class="fas fa-times"></i>
            </button>
          </div>

          <div class="flex-grow p-2">
            <!-- Menu Items -->
            <Link
              href="/profile"
              class="flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors mb-2"
              @click="toggleSidebar"
            >
              <i class="fas fa-user mr-3 text-green-600"></i>
              <span>Profil</span>
            </Link>

            <button
              @click="logout"
              class="w-full flex items-center p-3 rounded-lg hover:bg-green-50 transition-colors text-left"
            >
              <i class="fas fa-sign-out-alt mr-3 text-green-600"></i>
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { router, Link } from '@inertiajs/vue3'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const logout = () => {
  router.post('/logout')
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from .absolute.right-0,
.slide-leave-to .absolute.right-0 {
  transform: translateX(100%);
}
</style>