<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
    <!-- Header -->
    <header
      class="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl box-border flex justify-between items-center px-6 py-1 z-50 
            bg-[#2f3828]/20 text-white backdrop-blur-md border border-white/30 rounded-full shadow-md"
    >
      <div class="flex items-center space-x-4">
        <img src="../image/hlogo-samping.png" alt="Logo Project" class="w-32 h-auto">
      </div>
      <Link href="/dashboard" class="flex items-center gap-1 text-[#597036] hover:text-white">
        <i class="fas fa-home"></i>
        <span class="hidden sm:inline">Dashboard</span>
      </Link>
      <div class="relative">
        <button
          @click="toggleMenu"
          class="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg flex items-center gap-2 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <!-- Dropdown Menu -->
        <transition name="fade">
          <div
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 min-w-[8rem] bg-white rounded-lg shadow-md py-2 z-50 border border-gray-200"
          >
            <Link
              href="/profile"
              class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors whitespace-nowrap"
              @click="toggleMenu"
            >
              <i class="fas fa-user text-[#597036]"></i> Profil
            </Link>
            <button
              @click="logout"
              class="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors whitespace-nowrap"
            >
              <i class="fas fa-sign-out-alt text-[#597036]"></i> Keluar
            </button>
          </div>
        </transition>
      </div>
    </header>

    <!-- Spacer for fixed header -->
    <div class="h-24"></div>

    <!-- Main Container -->
    <div class="flex-1 max-w-6xl mx-auto px-4">
      <!-- Page Title -->
      <div class="text-center mb-12">
        <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-800 to-emerald-600 bg-clip-text text-transparent mb-4">
          Pilih Tanaman Impianmu
        </h1>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          Temukan tanaman yang sempurna untuk kebun atau rumahmu. Setiap tanaman memiliki keunikan dan manfaat tersendiri.
        </p>
      </div>

      <!-- Plant Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div 
          v-for="plant in plants" 
          :key="plant._id" 
          @click="goToPlant(plant._id)"
          class="group cursor-pointer bg-white hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 
                 rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 hover:border-green-200
                 transition-all duration-300 transform hover:-translate-y-2"
        >
          <!-- Plant Icon/Image Placeholder -->
          <div class="mb-4 flex justify-center">
            <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <i class="fas fa-seedling text-white text-2xl"></i>
            </div>
          </div>
          
          <!-- Plant Name -->
          <h3 class="text-xl font-bold text-gray-800 text-center mb-2 group-hover:text-green-700 transition-colors">
            {{ plant.plant }}
          </h3>
          
          <!-- Subtitle or Description -->
          <p class="text-sm text-gray-500 text-center mb-4">
            Klik untuk melihat detail
          </p>
          
          <!-- Action Indicator -->
          <div class="flex justify-center">
            <span class="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full group-hover:bg-green-200 transition-colors">
              <i class="fas fa-arrow-right text-xs"></i>
              Pilih Tanaman
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!plants || plants.length === 0" class="text-center py-16">
        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <i class="fas fa-seedling text-4xl text-gray-400"></i>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Belum ada tanaman tersedia</h3>
        <p class="text-gray-500">Tanaman akan segera ditambahkan. Silakan cek kembali nanti.</p>
      </div>
    </div>

    <!-- Footer spacing -->
    <div class="h-12"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { router, Link, usePage } from '@inertiajs/vue3'

const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const page = usePage();
const plants = page.props.plant || [];

function goToPlant(plantId) {
  router.visit(`/plants/${plantId}`);
}

function logout() {
  // Close menu first
  isMenuOpen.value = false;
  
  // Perform logout - adjust this based on your authentication system
  router.post('/logout', {}, {
    onFinish: () => {
      // Optional: redirect to login page or home
      router.visit('/login');
    }
  });
}

// Close menu when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.relative')) {
      isMenuOpen.value = false;
    }
  });
});
</script>

<style scoped>
/* Dropdown Animation */
.dropdown-enter-active, .dropdown-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: top right;
}

.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(-10px);
}

.dropdown-enter-to, .dropdown-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}

/* Custom scrollbar for overflow content */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #22c55e;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #16a34a;
}

/* Ensure smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>