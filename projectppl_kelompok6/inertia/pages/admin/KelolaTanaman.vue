<template>
  <div class="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-green-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gradient-to-b from-[#2f3828] to-[#1a2014] text-white shadow-2xl fixed h-full overflow-y-auto">
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
            <Link href="/DashboardAdmin" :class="getSidebarItemClass('/admin/dashboard')">
              <i class="fas fa-tachometer-alt w-5"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/users" :class="getSidebarItemClass('/admin/users')">
              <i class="fas fa-users w-5"></i>
              <span>Kelola Pengguna</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/plants" :class="getSidebarItemClass('/admin/plants')">
              <i class="fas fa-seedling w-5"></i>
              <span>Kelola Tanaman</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/guides" :class="getSidebarItemClass('/admin/guides')">
              <i class="fas fa-book-open w-5"></i>
              <span>Kelola Panduan</span>
            </Link>
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
    <main class="flex-1 overflow-auto ml-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Kelola Tanaman</h1>
            <p class="text-gray-600 mt-1">Kelola data tanaman hidroponik HidroGrow</p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Add Plant Button -->
            <button
              @click="openAddModal"
              class="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <i class="fas fa-plus"></i>
              <span>Tambah Tanaman</span>
            </button>
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
              <div class="p-2 bg-green-100 rounded-lg">
                <i class="fas fa-seedling text-green-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Tanaman</p>
                <p class="text-2xl font-bold text-gray-900">{{ plantsList.length }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <i class="fas fa-list-alt text-blue-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Langkah</p>
                <p class="text-2xl font-bold text-gray-900">{{ getTotalSteps() }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <i class="fas fa-tasks text-purple-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Tantangan</p>
                <p class="text-2xl font-bold text-gray-900">{{ getTotalChallenges() }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Plants Grid -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Daftar Tanaman</h3>
          </div>
          
          <div v-if="plantsList.length === 0" class="p-12 text-center">
            <div class="flex flex-col items-center">
              <i class="fas fa-seedling text-6xl text-gray-300 mb-4"></i>
              <p class="text-gray-500 text-lg">Belum ada data tanaman</p>
              <p class="text-gray-400 text-sm mt-2">Klik tombol "Tambah Tanaman" untuk memulai</p>
            </div>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <div
              v-for="plant in plantsList"
              :key="plant._id || plant.id"
              class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <i class="fas fa-leaf text-white text-lg"></i>
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-gray-900">{{ plant.plant }}</h4>
                      <p class="text-sm text-gray-500">{{ plant.steps?.length || 0 }} langkah</p>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="editPlant(plant)"
                      class="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      @click="viewPlantDetail(plant)"
                      class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Lihat Detail"
                    >
                      <i class="fas fa-eye"></i>
                    </button>
                    <button
                      @click="confirmDelete(plant)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
                
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Total Tantangan:</span>
                    <span class="font-medium text-gray-900">{{ getPlantChallengesCount(plant) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add/Edit Plant Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border max-w-2xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">
              {{ showEditModal ? 'Edit Tanaman' : 'Tambah Tanaman Baru' }}
            </h3>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <form @submit.prevent="showEditModal ? updatePlant() : addPlant()" class="space-y-6">
            <!-- Nama Tanaman -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Tanaman</label>
              <input
                v-model="plantForm.plant"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Contoh: Bayam, Kangkung, Selada"
              >
            </div>

            <!-- Langkah Penanaman -->
            <div v-for="(step, stepIndex) in plantForm.steps" :key="stepIndex" class="border rounded-md p-4 space-y-4">
              <div class="flex justify-between items-center">
                <h4 class="font-semibold">Langkah {{ stepIndex + 1 }}</h4>
                <button @click.prevent="removeStep(stepIndex)" class="text-red-500 text-sm">Hapus</button>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Judul Langkah</label>
                <input
                  v-model="step.title"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Contoh: Menyemai benih"
                >
              </div>

              <div class="flex items-center space-x-2">
                <input type="checkbox" v-model="step.locked" id="locked" class="form-checkbox">
                <label for="locked" class="text-sm text-gray-700">Tandai sebagai terkunci</label>
              </div>

              <!-- Tantangan dalam langkah -->
              <div v-for="(challenge, challengeIndex) in step.challenges" :key="challengeIndex" class="bg-gray-50 p-3 rounded-md space-y-2">
                <div class="flex justify-between items-center">
                  <h5 class="font-medium text-gray-700">Tantangan {{ challengeIndex + 1 }}</h5>
                  <button @click.prevent="removeChallenge(stepIndex, challengeIndex)" class="text-red-400 text-sm">Hapus</button>
                </div>

                <input
                  v-model="challenge.title"
                  type="text"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md"
                  placeholder="Judul Tantangan"
                >
                <textarea
                  v-model="challenge.description"
                  class="w-full px-3 py-1 border border-gray-300 rounded-md"
                  rows="2"
                  placeholder="Deskripsi Tantangan"
                ></textarea>

                <!-- Tips -->
                <div v-for="(tip, tipIndex) in challenge.tips" :key="tipIndex" class="flex space-x-2 items-center">
                  <h5 class="font-medium text-gray-700">Tips {{ tipIndex + 1 }}</h5>
                  <input
                    v-model="challenge.tips[tipIndex]"
                    type="text"
                    class="w-full px-3 py-1 border border-gray-300 rounded-md"
                    placeholder="Tips"
                  >
                  <button @click.prevent="removeTip(stepIndex, challengeIndex, tipIndex)" class="text-red-400 text-sm">X</button>
                </div>
                <button @click.prevent="addTip(stepIndex, challengeIndex)" class="text-green-600 text-xs mt-1">+ Tambah Tip</button>
              </div>

              <button @click.prevent="addChallenge(stepIndex)" class="text-blue-600 text-sm">+ Tambah Tantangan</button>
            </div>

            <button @click.prevent="addStep" class="text-green-700 font-medium">+ Tambah Langkah Penanaman</button>

            <div class="pt-4 border-t">
              <button
                type="submit"
                class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                {{ showEditModal ? 'Perbarui Tanaman' : 'Tambah Tanaman' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Detail Plant Modal -->
    <div v-if="showDetailModal && selectedPlant" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-5 mx-auto p-5 border max-w-4xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-3">
              <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <i class="fas fa-leaf text-white text-lg"></i>
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900">{{ selectedPlant.plant }}</h3>
                <p class="text-gray-600">Detail langkah penanaman</p>
              </div>
            </div>
            <button @click="closeDetailModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <div class="max-h-96 overflow-y-auto">
            <div class="space-y-4">
              <div
                v-for="(step, index) in selectedPlant.steps"
                :key="step.id"
                class="border border-gray-200 rounded-lg p-4"
              >
                <div class="flex items-center space-x-3 mb-3">
                  <div class="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {{ index + 1 }}
                  </div>
                  <h4 class="text-lg font-semibold text-gray-900">{{ step.title }}</h4>
                  <span v-if="step.locked" class="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    <i class="fas fa-lock mr-1"></i>Terkunci
                  </span>
                </div>
                
                <div class="ml-11 space-y-3">
                  <div
                    v-for="challenge in step.challenges"
                    :key="challenge.id"
                    class="bg-gray-50 p-3 rounded-lg"
                  >
                    <h5 class="font-medium text-gray-900 mb-2">{{ challenge.title }}</h5>
                    <p class="text-sm text-gray-700 mb-2">{{ challenge.description }}</p>
                    
                    <div v-if="challenge.tips?.length" class="space-y-1">
                      <p class="text-xs font-medium text-gray-600">Tips:</p>
                      <ul class="text-xs text-gray-600 space-y-1">
                        <li v-for="tip in challenge.tips" :key="tip" class="flex items-start space-x-2">
                          <i class="fas fa-lightbulb text-yellow-500 mt-0.5"></i>
                          <span>{{ tip }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end pt-4 border-t border-gray-200 mt-6">
            <button
              @click="closeDetailModal"
              class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>

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
              Apakah Anda yakin ingin menghapus tanaman <strong>{{ plantToDelete?.plant }}</strong>? 
              Semua data langkah dan tantangan akan ikut terhapus. Tindakan ini tidak dapat dibatalkan.
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
              @click="deletePlant"
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
  plants: {
    type: Array,
    default: () => []
  }
})


const page = usePage()
const currentUrl = computed(() => page.url)

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDetailModal = ref(false)
const showDeleteModal = ref(false)

// Data states
const selectedPlant = ref(null)
const plantToDelete = ref(null)
const editingPlant = ref(null)
const plantForm = ref({
  plant: '',
  steps: []
})

// Computed
const plantsList = computed(() => {
  return props.plants || []
})

// Methods
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

const getTotalSteps = () => {
  return plantsList.value.reduce((total, plant) => {
    return total + (plant.steps?.length || 0)
  }, 0)
}

const getTotalChallenges = () => {
  return plantsList.value.reduce((total, plant) => {
    return total + (plant.steps?.reduce((stepTotal, step) => {
      return stepTotal + (step.challenges?.length || 0)
    }, 0) || 0)
  }, 0)
}

const getPlantChallengesCount = (plant) => {
  return plant.steps?.reduce((total, step) => {
    return total + (step.challenges?.length || 0)
  }, 0) || 0
}

const getCompletionPercentage = (plant) => {
  if (!plant.steps?.length) return 0
  const unlockedSteps = plant.steps.filter(step => !step.locked).length
  return (unlockedSteps / plant.steps.length) * 100
}

const openAddModal = () => {
  plantForm.value = {
    plant: '',
    steps: [
      {
        title: '',
        locked: false,
        challenges: [
          {
            title: '',
            description: '',
            tips: ['']
          }
        ]
      }
    ]
  }
  showAddModal.value = true
}

const editPlant = (plant) => {
  editingPlant.value = plant
  plantForm.value = {
    plant: plant.plant,
    steps: JSON.parse(JSON.stringify(plant.steps)) // Deep copy
  }
  showEditModal.value = true
}

const removeStep = (stepIndex) => {
  plantForm.value.steps.splice(stepIndex, 1)
}


const addChallenge = (stepIndex) => {
  plantForm.value.steps[stepIndex].challenges.push({
    title: '',
    description: '',
    tips: ['']
  })
}


const removeChallenge = (stepIndex, challengeIndex) => {
  plantForm.value.steps[stepIndex].challenges.splice(challengeIndex, 1)
}


const addTip = (stepIndex, challengeIndex) => {
  plantForm.value.steps[stepIndex].challenges[challengeIndex].tips.push('')
}


const removeTip = (stepIndex, challengeIndex, tipIndex) => {
  plantForm.value.steps[stepIndex].challenges[challengeIndex].tips.splice(tipIndex, 1)
}


const viewPlantDetail = (plant) => {
  selectedPlant.value = plant
  showDetailModal.value = true
}

const confirmDelete = (plant) => {
  plantToDelete.value = plant
  showDeleteModal.value = true
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingPlant.value = null
  plantForm.value = { plant: '', steps: [] }
}

const closeDetailModal = () => {
  showDetailModal.value = false
  selectedPlant.value = null
}


const addPlant = () => {
  const newName = plantForm.value.plant.trim().toLowerCase()

  const isDuplicate = plantsList.value.some(plant =>
    plant.plant.trim().toLowerCase() === newName
  )

  if (isDuplicate) {
    alert('Nama tanaman sudah ada!')
    return
  }

  router.post('/admin/plants', plantForm.value, {
    preserveState: false, // optional: kalau kamu mau reload list tanaman
    onSuccess: () => {
      closeModal()
      router.reload({ only: ['plants'] })
    },
    onError: (errors) => {
      console.error('Error adding plant:', errors)
      alert('Gagal menambah tanaman. Silakan coba lagi.')
    }
  })
}


const addStep = () => {
  plantForm.value.steps.push({
    title: '',
    locked: false,
    challenges: []
  })
}

const updatePlant = () => {
  if (editingPlant.value) {
    const plantId = editingPlant.value._id || editingPlant.value.id
    router.put(`/admin/plants/${plantId}`, plantForm.value, {
      preserveState: false, // << ini penting agar halaman direfresh
      onSuccess: () => {
        closeModal()
        router.reload({ only: ['plants'] })
      },
      onError: (errors) => {
        console.error('Error updating plant:', errors)
        alert('Gagal mengupdate tanaman. Silakan coba lagi.')
      }
    })
  }
}

const deletePlant = () => {
  if (plantToDelete.value) {
    const plantId = plantToDelete.value._id || plantToDelete.value.id
    router.delete(`/admin/plants/${plantId}`, {
      onSuccess: () => {
        showDeleteModal.value = false
        plantToDelete.value = null
      },
      onError: (errors) => {
        console.error('Error deleting plant:', errors)
        alert('Gagal menghapus tanaman. Silakan coba lagi.')
      }
    })
  }
}

const logout = () => {
  router.get('/logout')
}
</script>