<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-4">
    <div class="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
      <h2 class="text-3xl font-bold text-green-700 mb-6 text-center">Daftar Akun Baru</h2>

      <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama</label>
          <input
            type="text"
            v-model="form.name"
            placeholder="Masukkan nama"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            v-model="form.email"
            placeholder="Masukkan email"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            v-model="form.password"
            placeholder="Masukkan password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          Daftar
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Sudah punya akun?
        <Link href="/login" method="get" preserve-state class="text-green-600 hover:underline font-medium">
          Masuk di sini
        </Link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'

const form = ref({
  name: '',
  email: '',
  password: '',
})

const errorMessage = ref('')

const handleSubmit = () => {
  router.post('/signup', form.value, {
    onSuccess: () => {
      errorMessage.value = ''
      router.visit('/dashboard')
    },
    onError: (errors) => {
      console.error('❌ Error:', errors)
      errorMessage.value = 'Terjadi kesalahan saat mendaftar. Coba lagi.'
    }
  })
}
</script>

<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
