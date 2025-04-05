<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-green-200 py-10 px-6">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-4xl font-bold text-green-800 mb-8 text-center">Selamat Datang di Dashboard HidroGrow 🌱</h1>
      
      <p class="text-center text-gray-700 mb-10">
        Mari mulai perjalanan hidroponikmu. Pilih fitur yang ingin kamu eksplorasi!
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Tes Kepribadian Tanaman -->
        <div
          class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 text-center cursor-pointer"
          @click="router.visit('/plant-quiz')"
        >
          <img src="/images/quiz-icon.png" class="w-16 h-16 mx-auto mb-4" alt="Tes Icon" />
          <h3 class="text-xl font-semibold text-green-700 mb-2">Tes Kepribadian Tanaman</h3>
          <p class="text-gray-600">Temukan tanaman yang cocok dengan kepribadian dan gaya hidupmu.</p>
        </div>

        <!-- Tantangan 7 Hari -->
        <div
          class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 text-center cursor-pointer"
          @click="router.visit('/7-day-challenge')"
        >
          <img src="/images/challenge-icon.png" class="w-16 h-16 mx-auto mb-4" alt="Challenge Icon" />
          <h3 class="text-xl font-semibold text-green-700 mb-2">Tantangan 7 Hari</h3>
          <p class="text-gray-600">Ikuti tantangan untuk membangun kebiasaan menanam secara menyenangkan.</p>
        </div>

        <!-- Panduan Praktis -->
        <div
          class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow p-6 text-center cursor-pointer"
          @click="router.visit('/guides')"
        >
          <img src="/images/guide-icon.png" class="w-16 h-16 mx-auto mb-4" alt="Guide Icon" />
          <h3 class="text-xl font-semibold text-green-700 mb-2">Panduan Praktis</h3>
          <p class="text-gray-600">Dapatkan tutorial dan infografis yang mudah diikuti, cocok untuk pemula.</p>
        </div>
      </div>

      <div class="mt-12 text-center">
        <button
          class="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          @click="logout"
        >
          Keluar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { router } from '@inertiajs/vue3'

function logout() {
  router.post('/logout')
}
</script>

<style scoped>
/* Tambahan gaya jika perlu */
</style>
