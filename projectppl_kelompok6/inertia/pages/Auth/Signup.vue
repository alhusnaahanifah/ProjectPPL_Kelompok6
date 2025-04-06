<template>
  <div class="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-green-100 via-white to-green-50 p-4">

    <!-- Logo -->
    <div class="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
      <img src="../../image/hlogo-bawah.png" alt="logo" class="rounded-lg max-w-xs md:max-w-md object-contain z-10" />
    </div>
    <div class="w-full md:w-1/2 max-w-md mx-auto backdrop-blur-md bg-[#2f3828]/20 shadow-2xl rounded-3xl p-8 md:p-10">
      <h2 class="text-3xl font-bold text-green-700 mb-6 text-center">Daftar Akun</h2>

      <!-- Menampilkan error dari validasi -->
      <div v-if="form.errors.name || form.errors.email || form.errors.password" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
        {{ form.errors.name || form.errors.email || form.errors.password }}
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
            autocomplete="new-password"
          />
        </div>

        <button
          type="submit"
          :disabled="form.processing"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          {{ form.processing ? 'Memproses...' : 'Daftar' }}
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
import Swal from 'sweetalert2'
import { useForm, Link, router } from '@inertiajs/vue3'

const form = useForm({
  name: '',
  email: '',
  password: '',
})

const handleSubmit = () => {
  form.post('/signup', {
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Akun berhasil dibuat. Silakan login.',
        confirmButtonColor: '#16a34a',
        confirmButtonText: 'OK'
      }).then(() => {
        router.visit('/login')
      })
    },
    onError: (errors) => {
      console.error('Validasi gagal:', errors)
    }
  })
}
</script>


<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>
