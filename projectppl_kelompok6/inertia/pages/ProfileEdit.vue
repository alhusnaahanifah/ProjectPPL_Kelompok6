<template>
  <div v-if="user" class="min-h-screen bg-green-50 py-12 px-4">
    <div class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-md">
      <h2 class="text-2xl font-bold text-green-700 mb-6 text-center">Edit Profil</h2>

      <form @submit.prevent="updateProfile" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
          <input 
            type="text" 
            v-model="form.fullName" 
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input 
            type="email" 
            v-model="form.email" 
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-200"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Kata Sandi Baru</label>
          <input 
            type="password" 
            v-model="form.password" 
            class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-green-200"
          />
          <p class="text-sm text-gray-400 mt-1">Kosongkan jika tidak ingin mengubah sandi</p>
        </div>

        <button 
          type="submit"
          class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import { defineProps } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    required: false,
    default: () => ({ fullName: '', email: '' }) // amanin nilai default
  }
})

const form = reactive({
  fullName: props.user?.fullName || '',
  email: props.user?.email || '',
  password: ''
})

const updateProfile = () => {
  router.post('/profile/update', form)
}
</script>
