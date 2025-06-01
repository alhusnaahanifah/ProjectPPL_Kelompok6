<template>
  <div class="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-green-100">
    <!-- Sidebar -->
     <aside class="w-64 bg-gradient-to-b from-[#2f3828] to-[#1a2014] text-white shadow-2xl">
      <!-- Logo Section -->
      <div class="p-6 border-b border-white/20">
        <div class="flex items-center space-x-3">
          <div>
             <img src="../../image/plogo-samping.png" alt="Logo Project" class="w-40 h-auto">
            <p class="text-green-200 text-sm pl-12">Admin Panel</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="mt-6 px-4">
        <ul class="space-y-2">
          <li>
            <Link href="/DashboardAdmin"
              :class="getSidebarItemClass('/admin/dashboard')">
              <i class="fas fa-tachometer-alt w-5"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/users"
              :class="getSidebarItemClass('/admin/users')">
              <i class="fas fa-users w-5"></i>
              <span>Kelola Pengguna</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/plants"
              :class="getSidebarItemClass('/admin/plants')">
              <i class="fas fa-seedling w-5"></i>
              <span>Kelola Tanaman</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/guides"
              :class="getSidebarItemClass('/admin/guides')">
              <i class="fas fa-book-open w-5"></i>
              <span>Kelola Panduan</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/quiz"
              :class="getSidebarItemClass('/admin/quiz')">
              <i class="fas fa-question-circle w-5"></i>
              <span>Kelola Quiz</span>
            </Link>
          </li>
        </ul>
      </nav>

      <!-- Admin Profile Section -->
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
        <div class="flex items-center space-x-3 mb-3">
          <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <i class="fas fa-user-shield text-white"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">{{ user.fullName }}</p>
            <p class="text-xs text-green-200 truncate">{{ user.email }}</p>
          </div>
        </div>
        <button
          @click="logout"
          class="w-60 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <i class="fas fa-sign-out-alt"></i>
          <span>Keluar</span> 
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Kelola Pengguna</h1>
            <p class="text-gray-600 mt-1">Kelola data pengguna aplikasi HidroGrow</p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Notification Bell -->
            <button class="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <i class="fas fa-bell text-lg"></i>
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <!-- Date -->
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <i class="fas fa-calendar-alt"></i>
              <span>{{ getCurrentDate() }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div class="p-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <i class="fas fa-users text-blue-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Pengguna</p>
                <p class="text-2xl font-bold text-gray-900">{{ usersList.length }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <i class="fas fa-user-check text-green-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pengguna Aktif</p>
                <p class="text-2xl font-bold text-gray-900">{{ usersList.filter(u => u.role === 'user').length }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <i class="fas fa-user-shield text-purple-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Admin</p>
                <p class="text-2xl font-bold text-gray-900">{{ usersList.filter(u => u.role === 'admin').length }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Users Table -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Daftar Pengguna</h3>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pengguna
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bergabung
                  </th>
                  <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-if="usersList.length === 0">
                  <td colspan="5" class="px-6 py-4 text-center text-gray-500">
                    <div class="flex flex-col items-center">
                      <i class="fas fa-users text-4xl text-gray-300 mb-2"></i>
                      <p>Belum ada data pengguna</p>
                    </div>
                  </td>
                </tr>
                <tr v-for="user in usersList" :key="user._id || user.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                      <div class="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                        <span class="text-white font-medium text-sm">
                          {{ getInitials(user.fullName) }}
                        </span>
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                          {{ user.fullName }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">{{ user.email }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span :class="getRoleBadgeClass(user.role)">
                      {{ getRoleLabel(user.role) }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ formatDate(user.createdAt) }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      @click="confirmDelete(user)"
                      :disabled="user.role === 'admin' && (user._id === $page.props.auth?.user?._id || user.id === $page.props.auth?.user?.id)"
                      class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <i class="fas fa-trash-alt mr-2"></i>
                      Hapus
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-4">Konfirmasi Hapus</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Apakah Anda yakin ingin menghapus pengguna <strong>{{ userToDelete?.fullName }}</strong>? 
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
          <div class="flex items-center justify-center gap-4 mt-4">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Batal
            </button>
            <button
              @click="deleteUser"
              class="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Link, usePage, router } from '@inertiajs/vue3'

const props = defineProps({ 
    user: Object,
    users: {
        type: Array,
        default: () => []
    }
})

// Computed untuk memastikan users selalu array
const usersList = computed(() => {
  return props.users || []
})

const page = usePage()
const currentUrl = computed(() => page.url)
const showDeleteModal = ref(false)
const userToDelete = ref(null)

const getSidebarItemClass = (path) => {
  const isActive = currentUrl.value === path
  return [
    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
    isActive 
      ? 'bg-green-600 text-white shadow-lg' 
      : 'text-green-100 hover:bg-white/10 hover:text-white'
  ]
}

const getCurrentDate = () => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getInitials = (name) => {
  return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'
}

const getRoleLabel = (role) => {
  const labels = {
    admin: 'Administrator',
    user: 'Pengguna'
  }
  return labels[role] || role
}

const getRoleBadgeClass = (role) => {
  const baseClass = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full'
  const roleClasses = {
    admin: 'bg-purple-100 text-purple-800',
    user: 'bg-green-100 text-green-800'
  }
  return `${baseClass} ${roleClasses[role] || 'bg-gray-100 text-gray-800'}`
}

const formatDate = (dateString) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const confirmDelete = (user) => {
  userToDelete.value = user
  showDeleteModal.value = true
}

const deleteUser = () => {
  if (userToDelete.value) {
    const userId = userToDelete.value._id || userToDelete.value.id
    router.delete(`/admin/users/${userId}`, {
      onSuccess: () => {
        showDeleteModal.value = false
        userToDelete.value = null
      },
      onError: (errors) => {
        console.error('Error deleting user:', errors)
        // Optional: show error message to user
        alert('Gagal menghapus pengguna. Silakan coba lagi.')
      }
    })
  }
}

const logout = () => {
  router.get('/logout')
}
</script>