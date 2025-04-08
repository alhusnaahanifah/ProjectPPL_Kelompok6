<template>
  <div class="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gradient-to-b from-green-100 via-white to-green-50 p-4">

    <!-- Logo -->
    <div class="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
      <a href="/">
        <img src="../../image/hlogo-bawah.png" alt="logo" class="rounded-lg max-w-xs md:max-w-md object-contain z-10" />
      </a>
    </div>

    <!-- Sign Up Box -->
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

        <div class="relative">
          <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            :type="showPassword ? 'text' : 'password'"
            v-model="form.password"
            placeholder="Masukkan password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
            required
            autocomplete="new-password"
          />

          <button type="button" @click="showPassword = !showPassword" class="absolute right-3 top-8 text-gray-600">
            <span v-if="showPassword">
              <!-- Mata terbuka -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </span>
            <span v-else>
              <!-- Mata tertutup -->
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.966 9.966 0 012.224-3.592M6.22 6.22a9.956 9.956 0 015.78-1.22c4.478 0 8.268 2.943 9.542 7a9.969 9.969 0 01-4.27 5.362M3 3l18 18" />
              </svg>
            </span>
          </button>

          <!-- Password rules -->
          <ul class="text-sm text-gray-600 space-y-1 mb-4 mt-2">
            <li :class="passwordRules.length ? 'text-green-600' : ''">✔ Minimal 8 karakter</li>
            <li :class="passwordRules.uppercase ? 'text-green-600' : ''">✔ Huruf besar</li>
            <li :class="passwordRules.number ? 'text-green-600' : ''">✔ Angka</li>
            <li :class="passwordRules.symbol ? 'text-green-600' : ''">✔ Simbol</li>
          </ul>
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
import { ref, watch } from 'vue'
import { useForm, Link, router } from '@inertiajs/vue3'

const form = useForm({
  name: '',
  email: '',
  password: '',
})

const showPassword = ref(false)
const passwordRules = ref({
  length: false,
  uppercase: false,
  number: false,
  symbol: false,
})

const validatePassword = () => {
  const pwd = form.password
  passwordRules.value.length = pwd.length >= 8
  passwordRules.value.uppercase = /[A-Z]/.test(pwd)
  passwordRules.value.number = /[0-9]/.test(pwd)
  passwordRules.value.symbol = /[^A-Za-z0-9]/.test(pwd)
}

watch(() => form.password, validatePassword)

const handleSubmit = () => {
  validatePassword()

  // Validasi email: harus huruf kecil dan tidak ada spasi
  const email = form.email
  const isLowercase = email === email.toLowerCase()
  const hasNoSpaces = !/\s/.test(email)

  if (!isLowercase || !hasNoSpaces) {
    Swal.fire({
      icon: 'warning',
      title: 'Email tidak valid',
      text: 'Email harus menggunakan huruf kecil dan tidak boleh mengandung spasi.',
      confirmButtonColor: '#16a34a',
    })
    return
  }

  // Validasi password
  if (
    !passwordRules.value.length ||
    !passwordRules.value.uppercase ||
    !passwordRules.value.number ||
    !passwordRules.value.symbol
  ) {
    Swal.fire({
      icon: 'warning',
      title: 'Password tidak valid',
      text: 'Password harus minimal 8 karakter, mengandung huruf besar, angka, dan simbol.',
      confirmButtonColor: '#16a34a',
    })
    return
  }

  // Kirim form jika semua valid
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