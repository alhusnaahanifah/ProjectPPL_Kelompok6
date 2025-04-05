<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 p-4">
    <div class="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
      <h2 class="text-3xl font-bold text-green-700 mb-6 text-center">Masuk ke Akun</h2>

      <div v-if="form.errors.email || form.errors.password" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
        {{ form.errors.email || form.errors.password }}
      </div>
      <!-- debug -->
      <div class="text-xs text-gray-500 mb-4">Form Data: {{ form }}</div>

      <form @submit="handleSubmit">
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
            autocomplete="current-password"
          />
        </div>

        <button
          type="submit"
          :disabled="form.processing"
          class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
        >
          {{ form.processing ? 'Memproses...' : 'Masuk' }}
        </button>
      </form>

      <p class="mt-6 text-center text-sm text-gray-600">
        Belum punya akun?
        <Link href="/signup" method="get" preserve-state class="text-green-600 hover:underline font-medium">
          Daftar di sini
        </Link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useForm, router, Link } from '@inertiajs/vue3'
console.log("Vue is running")

const form = useForm({
  email: '',
  password: '',
})

const errorMessage = ref('')

const handleSubmit = (event) => {
  event.preventDefault() // tambahkan ini
  console.log("Form disubmit!")
  form.post('/login', {
    onSuccess: () => {
      router.visit('/dashboard')
    },
    onError: () => {
      errorMessage.value = 'Email atau password salah.'
    },
  })
}

</script>


<style scoped>
body {
  font-family: 'Inter', sans-serif;
}
</style>