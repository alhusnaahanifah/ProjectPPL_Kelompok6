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
            <a
              href="#"
              @click="setActiveMenu('dashboard')"
              :class="[
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                activeMenu === 'dashboard' 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-green-100 hover:bg-white/10 hover:text-white'
              ]"
            >
              <i class="fas fa-tachometer-alt w-5"></i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <Link href="/admin/users"
              :class="[
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                isActive('/admin/users') ? 'bg-green-600 text-white shadow-lg' : 'text-green-100 hover:bg-white/10 hover:text-white'
              ]">
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
            <a
              href="#"
              @click="setActiveMenu('guides')"
              :class="[
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                activeMenu === 'guides' 
                  ? 'bg-green-600 text-white shadow-lg' 
                  : 'text-green-100 hover:bg-white/10 hover:text-white'
              ]"
            >
              <i class="fas fa-book-open w-5"></i>
              <span>Kelola Panduan</span>
            </a>
          </li>
          <li>
            <Link href="/admin/quiz" :class="getSidebarItemClass('/admin/quiz')">
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
            <h1 class="text-2xl font-bold text-gray-800">
              {{ getPageTitle() }}
            </h1>
            <p class="text-gray-600 mt-1">{{ getPageSubtitle() }}</p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Notification Bell -->
            <button class="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <i class="fas fa-bell text-lg"></i>
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <!-- User Menu -->
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <i class="fas fa-calendar-alt"></i>
              <span>{{ getCurrentDate() }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div class="p-6">
        <!-- Dashboard Content -->
        <div v-if="activeMenu === 'dashboard'" class="space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm">Total Pengguna</p>
                  <p class="text-2xl font-bold text-gray-800">{{ stats.users }}</p>
                </div>
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-users text-green-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm">Total Tanaman</p>
                  <p class="text-2xl font-bold text-gray-800">{{ stats.plants }}</p>
                </div>
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-seedling text-blue-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm">Total Share Community</p>
                  <p class="text-2xl font-bold text-gray-800">{{ stats.experiences }}</p>
                </div>
                <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-book-open text-yellow-600 text-xl"></i>
                </div>
              </div>
            </div>
            <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-600 text-sm">Total pertanyaan</p>
                  <p class="text-2xl font-bold text-gray-800">{{ stats.questions }}</p>
                </div>
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <i class="fas fa-question-circle text-purple-600 text-xl"></i>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Activity -->
          <div class="bg-white rounded-xl shadow-md p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Aktivitas Terbaru</h3>
            <div class="space-y-4">
              <div class="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                  <i class="fas fa-user-plus text-white"></i>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">Pengguna baru mendaftar</p>
                  <p class="text-xs text-gray-600">John Doe bergabung 5 menit yang lalu</p>
                </div>
              </div>
              <div class="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                  <i class="fas fa-seedling text-white"></i>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">Tanaman baru ditambahkan</p>
                  <p class="text-xs text-gray-600">Selada Hijau ditambahkan ke katalog</p>
                </div>
              </div>
              <div class="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                <div class="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                  <i class="fas fa-book text-white"></i>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-800">Panduan baru dipublikasi</p>
                  <p class="text-xs text-gray-600">"Cara Merawat Tanaman Hidroponik" telah dipublikasi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Other Menu Content -->
        <div v-else class="bg-white rounded-xl shadow-md p-8 text-center">
          <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-tools text-gray-500 text-xl"></i>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-2">Fitur Dalam Pengembangan</h3>
          <p class="text-gray-600">Halaman {{ getPageTitle().toLowerCase() }} sedang dalam tahap pengembangan.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Link, usePage, router } from '@inertiajs/vue3'

const props = defineProps({
  user: Object,
  stats: Object,
})

const page = usePage()
const currentUrl = computed(() => page.url.value)

const isActive = (path) => {
  return typeof currentUrl.value === 'string' && currentUrl.value.startsWith(path)
}

const getSidebarItemClass = (path) => {
  const isActive = currentUrl.value === path
  return [
    'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
    isActive 
      ? 'bg-green-600 text-white shadow-lg' 
      : 'text-green-100 hover:bg-white/10 hover:text-white'
  ]
}

const activeMenu = ref('dashboard')

const setActiveMenu = (menu) => {
  activeMenu.value = menu
}

const getPageTitle = () => {
  const titles = {
    dashboard: 'Dashboard',
    plants: 'Kelola Tanaman',
    guides: 'Kelola Panduan',
    quiz: 'Kelola Quiz',
    reports: 'Laporan',
    settings: 'Pengaturan'
  }
  return titles[activeMenu.value] || 'Dashboard'
}

const getPageSubtitle = () => {
  const subtitles = {
    dashboard: 'Selamat datang di panel admin HidroGrow',
    plants: 'Kelola database tanaman hidroponik',
    guides: 'Kelola panduan dan tutorial',
    quiz: 'Kelola kuis kepribadian tanaman',
    reports: 'Lihat laporan dan analitik',
    settings: 'Pengaturan sistem dan aplikasi'
  }
  return subtitles[activeMenu.value] || ''
}

const getCurrentDate = () => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const logout = () => {
  router.get('/logout')
}
</script>

<style scoped>
/* Custom scrollbar untuk sidebar */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>