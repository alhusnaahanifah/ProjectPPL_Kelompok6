<template>
  <div v-if="user" class="min-h-screen bg-green-50 py-12 px-4">
    <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 class="text-2xl font-bold text-green-700 mb-6 text-center">Profil Saya</h2>

      <div class="space-y-4">
        <div>
          <p class="text-sm text-gray-500">Nama Lengkap</p>
          <p class="text-lg font-semibold text-gray-800">{{ user.fullName }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-500">Email</p>
          <p class="text-lg font-semibold text-gray-800">{{ user.email }}</p>
        </div>

        <div class="pt-6 space-y-3">
          <button 
            @click="goToEdit"
            class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Edit Profil
          </button>

          <button 
            @click="goToDashboard"
            class="w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { router } from '@inertiajs/vue3'
import { defineProps } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: false,
    default: () => ({ fullName: '', email: '' }),
  }
})

const goToEdit = () => {
  router.visit('/profile/edit')
}

const goToDashboard = () => {
  router.visit('/dashboard')
}
</script>
