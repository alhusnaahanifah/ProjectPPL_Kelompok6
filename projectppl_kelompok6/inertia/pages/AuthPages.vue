<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-4">
    <div class="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
      <h2 class="text-3xl font-bold text-green-700 mb-6 text-center">
        {{ isLogin ? 'Masuk ke Akun' : 'Daftar Akun Baru' }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <div v-if="!isLogin" class="mb-4">
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
          {{ isLogin ? 'Masuk' : 'Daftar' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        {{ isLogin ? 'Belum punya akun?' : 'Sudah punya akun?' }}
        <Link
            :href="isLogin ? '/signup' : '/login'"
            class="text-green-600 hover:underline font-medium"
        >
            {{ isLogin ? 'Daftar di sini' : 'Masuk di sini' }}
        </Link>
        </p>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { router, usePage } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'

const page = usePage()

// Deteksi URL
const isLogin = computed(() => page.url === '/login')

// Form data
const form = ref({
  name: '',
  email: '',
  password: '',
})

// Submit handler
const handleSubmit = () => {
  if (isLogin.value) {
    router.post('/login', {
      email: form.value.email,
      password: form.value.password,
    })
  } else {
    router.post('/signup', form.value)
  }
}

// Pindah ke route berbeda
const switchPage = () => {
  router.visit(isLogin.value ? '/signup' : '/login')
}
</script>


<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>