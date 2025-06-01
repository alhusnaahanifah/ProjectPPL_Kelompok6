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
            <Link href="/DashboardAdmin"
              :class="getSidebarItemClass('/DashboardAdmin')">
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
            <Link href="/admin/panduan"
              :class="getSidebarItemClass('/admin/panduan')">
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
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
        <div class="flex items-center space-x-3 mb-4">
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
          class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
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
            <h1 class="text-2xl font-bold text-gray-800">Kelola Quiz</h1>
            <p class="text-gray-600 mt-1">Kelola pertanyaan dan jawaban tanaman hidroponik HidroGrow</p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Add Question Button -->
            <button
              @click="openAddQuestionModal"
              class="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <i class="fas fa-plus"></i>
              <span>Tambah Pertanyaan</span>
            </button>
            <!-- Add Plant Answer Button -->
            <button
              @click="openAddPlantModal"
              class="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <i class="fas fa-seedling"></i>
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
              <div class="p-2 bg-blue-100 rounded-lg">
                <i class="fas fa-question-circle text-blue-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Pertanyaan</p>
                <p class="text-2xl font-bold text-gray-900">{{ pertanyaan.length }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <i class="fas fa-seedling text-green-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Data Tanaman</p>
                <p class="text-2xl font-bold text-gray-900">{{ jawaban.length }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <i class="fas fa-chart-line text-purple-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Kelengkapan Data</p>
                <p class="text-2xl font-bold text-gray-900">{{ getCompletionPercentage }}%</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Questions Grid -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div class="px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">Daftar Pertanyaan</h3>
          </div>
          
          <div v-if="pertanyaan.length === 0" class="p-12 text-center">
            <div class="flex flex-col items-center">
              <i class="fas fa-question-circle text-6xl text-gray-300 mb-4"></i>
              <p class="text-gray-500 text-lg">Belum ada pertanyaan</p>
              <p class="text-gray-400 text-sm mt-2">Klik tombol "Tambah Pertanyaan" untuk memulai</p>
            </div>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <div
              v-for="(question, index) in pertanyaan"
              :key="question.id"
              class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                      <span class="text-white font-bold">{{ index + 1 }}</span>
                    </div>
                    <div class="flex-1">
                      <p class="text-gray-900 font-medium">{{ question.text }}</p>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="editQuestion(question)"
                      class="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <i class="fas fa-edit"></i>
                    </button>
                    <button
                      @click="confirmDeleteQuestion(question)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Plants Answer Grid -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 class="text-lg font-medium text-gray-900">Data Tanaman & Jawaban</h3>
            <div class="flex items-center space-x-3">
              <div class="relative">
                <input
                  v-model="searchTumbuhan"
                  type="text"
                  placeholder="Cari tanaman..."
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  @keyup.enter="cariJawaban"
                >
                <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              </div>
              <button
                @click="cariJawaban"
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                <i class="fas fa-search"></i>
              </button>
            </div>
          </div>
          
          <div v-if="jawaban.length === 0" class="p-12 text-center">
            <div class="flex flex-col items-center">
              <i class="fas fa-seedling text-6xl text-gray-300 mb-4"></i>
              <p class="text-gray-500 text-lg">Belum ada data tanaman</p>
              <p class="text-gray-400 text-sm mt-2">Klik tombol "Tambah Tanaman" untuk memulai</p>
            </div>
          </div>

          <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            <div
              v-for="plant in jawaban"
              :key="plant.id"
              class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div class="p-6">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex items-center space-x-3">
                    <div class="w-12 h-12 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <i class="fas fa-leaf text-white text-lg"></i>
                    </div>
                    <div>
                      <h4 class="text-lg font-semibold text-gray-900">{{ plant.tumbuhan }}</h4>
                      <p class="text-sm text-gray-500">{{ Object.keys(getAnswersOnly(plant)).length }} jawaban</p>
                    </div>
                  </div>
                  <div class="flex space-x-2">
                    <button
                      @click="editPlantAnswer(plant)"
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
                      @click="confirmDeletePlant(plant)"
                      class="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Hapus"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                  </div>
                </div>
                
                <div class="space-y-2">
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Jawaban "Ya":</span>
                    <span class="font-medium text-green-600">{{ countYesAnswers(plant) }}</span>
                  </div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="text-gray-600">Jawaban "Tidak":</span>
                    <span class="font-medium text-red-600">{{ countNoAnswers(plant) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Question Modal -->
    <div v-if="showAddQuestionModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border max-w-md shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Tambah Pertanyaan Baru</h3>
            <button @click="closeAddQuestionModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <form @submit.prevent="addQuestion" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Pertanyaan</label>
              <input
                v-model="newPertanyaan"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Contoh: Apakah tanaman ini memiliki bunga?"
              >
            </div>

            <div class="pt-4 border-t">
              <button
                type="submit"
                class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Tambah Pertanyaan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add Plant Modal -->
    <div v-if="showAddPlantModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-10 mx-auto p-5 border max-w-2xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Tambah Data Tanaman</h3>
            <button @click="closeAddPlantModal" class="text-gray-400 hover:text-gray-600">
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>
          
          <form @submit.prevent="addPlantAnswer" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Nama Tanaman</label>
              <input
                v-model="jawabanForm.Tumbuhan"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="Contoh: Mawar, Melati, Bayam"
              >
            </div>

            <div v-if="pertanyaan.length > 0">
              <h4 class="text-sm font-medium text-gray-700 mb-3">Jawaban untuk setiap pertanyaan:</h4>
              <div class="space-y-4">
                <div v-for="(question, index) in pertanyaan" :key="question.id" class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    {{ index + 1 }}. {{ question.text }}
                  </label>
                  <select 
                    v-model="jawabanForm.answers[question.text]" 
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Pilih Jawaban</option>
                    <option value="Ya">Ya</option>
                    <option value="Tidak">Tidak</option>
                  </select>
                </div>
              </div>
            </div>

            <div v-else class="text-center py-8 text-gray-500">
              <i class="fas fa-info-circle text-3xl text-gray-300 mb-2"></i>
              <p>Tambahkan pertanyaan terlebih dahulu untuk dapat menambah data tanaman.</p>
            </div>

            <div class="pt-4 border-t">
              <button
                v-if="pertanyaan.length > 0"
                type="submit"
                class="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                Tambah Data Tanaman
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Plant Detail Modal -->
    <div v-if="showDetailModal && selectedPlant" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-5 mx-auto p-5 border max-w-4xl shadow-lg rounded-md bg-white">
        <div class="mt-3">
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <i class="fas fa-leaf text-white text-lg"></i>
            </div>
            <div>
                <h3 class="text-xl font-bold text-gray-900">{{ selectedPlant.tumbuhan }}</h3>
                <p class="text-gray-600">Detail jawaban tanaman</p>
            </div>
            </div>
            <button @click="closeDetailModal" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times text-xl"></i>
            </button>
        </div>
        
        <div class="max-h-96 overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Perubahan utama di sini: -->
            <div
                v-for="question in pertanyaan"
                :key="question.id"
                class="bg-gray-50 p-4 rounded-lg border"
                >
                <h4 class="font-medium text-gray-900 mb-2">{{ question.text }}</h4>
                <div class="flex items-center space-x-2">
                    <template v-if="selectedPlant && selectedPlant[question.text] !== undefined">
                    <i :class="selectedPlant[question.text] === 'Ya' ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600'"></i>
                    <span :class="selectedPlant[question.text] === 'Ya' ? 'text-green-600' : 'text-red-600'" class="font-semibold">
                        {{ selectedPlant[question.text] }}
                    </span>
                    </template>
                    <template v-else>
                    <i class="fas fa-question-circle text-gray-400"></i>
                    <span class="text-gray-500 font-semibold">{{ jawaban }}</span>
                    </template>
                </div>
                </div>
        </div>
        </div>
        
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-6">
            <button
            @click="closeDetailModal"
            class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400"
            >
            Tutup
            </button>
            <button
            @click="editPlantAnswer(selectedPlant)"
            class="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-blue-700"
            >
            Edit Jawaban
            </button>
        </div>
        </div>
    </div>
    </div>

    <!-- Edit Question Modal -->
    <div v-if="showEditQuestionModal && selectedQuestion" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
    <div class="relative top-20 mx-auto p-5 border max-w-md shadow-lg rounded-md bg-white">
        <div class="mt-3">
        <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-medium text-gray-900">Edit Pertanyaan</h3>
            <button @click="closeEditQuestionModal" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times text-xl"></i>
            </button>
        </div>
        
        <form @submit.prevent="updateQuestion" class="space-y-4">
            <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Pertanyaan</label>
            <input
                v-model="editQuestionText"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
            </div>

            <div class="flex justify-end space-x-3 pt-4 border-t">
            <button
                type="button"
                @click="closeEditQuestionModal"
                class="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
            >
                Batal
            </button>
            <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
                Perbarui
            </button>
            </div>
        </form>
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
              {{ deleteMessage }}
            </p>
          </div>
          <div class="flex items-center justify-center gap-4 mt-4">
            <button
              @click="closeDeleteModal"
              class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { router, usePage, Link } from '@inertiajs/vue3'

// ===== TYPES =====
interface Question {
  id: string | number
  text: string
}

interface PlantAnswer {
  _id?: string
  tumbuhan: string
  [key: string]: any // For dynamic question-answer pairs
}

interface JawabanForm {
  Tumbuhan: string
  answers: Record<string, string>
}

// ===== DATA PROPS =====
const page = usePage()
const props = defineProps<{
  user: {
    fullName: string
    email: string
  }
  pertanyaan: Question[]
  jawaban: PlantAnswer[]
}>()

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

const getCompletionPercentage = computed(() => {
  if (props.pertanyaan.length === 0 || props.jawaban.length === 0) return 0
  
  const totalExpected = props.pertanyaan.length * props.jawaban.length
  let totalAnswered = 0
  
  props.jawaban.forEach(plant => {
    const answers = getAnswersOnly(plant)
    totalAnswered += Object.keys(answers).length
  })
  
  return Math.round((totalAnswered / totalExpected) * 100)
})

// ===== HELPER FUNCTIONS =====
const getAnswersOnly = (plant: PlantAnswer) => {
  const result: Record<string, string> = {}
  props.pertanyaan.forEach(q => {
    const matchedKey = Object.keys(plant).find(key => 
      key.trim().toLowerCase() === q.text.trim().toLowerCase()
    )
    result[q.text] = matchedKey ? plant[matchedKey] : 'Belum diisi'
  })
  return result
}

const countYesAnswers = (plant: PlantAnswer) => {
  const answers = getAnswersOnly(plant)
  return Object.values(answers).filter(answer => answer === 'Ya').length
}

const countNoAnswers = (plant: PlantAnswer) => {
  const answers = getAnswersOnly(plant)
  return Object.values(answers).filter(answer => answer === 'Tidak').length
}

const getCurrentDate = () => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const initializeAnswerForm = () => {
  jawabanForm.value = {
    Tumbuhan: '',
    answers: {}
  }
  props.pertanyaan.forEach((q) => {
    jawabanForm.value.answers[q.text] = ''
  })
}

// ===== QUESTION MANAGEMENT =====
const openAddQuestionModal = () => {
  showAddQuestionModal.value = true
  newPertanyaan.value = ''
}

const closeAddQuestionModal = () => {
  showAddQuestionModal.value = false
}

const addQuestion = () => {
  if (!newPertanyaan.value.trim()) {
    alert('Pertanyaan tidak boleh kosong!')
    return
  }

  router.post('/admin/quiz/pertanyaan', { 
    pertanyaan: newPertanyaan.value.trim() 
  }, {
    preserveScroll: true,
    onSuccess: () => {
      closeAddQuestionModal()
      router.reload()
    },
    onError: () => {
      alert('Gagal menyimpan pertanyaan!')
    }
  })
}

const editQuestion = (question: Question) => {
  selectedQuestion.value = question
  editQuestionText.value = question.text
  showEditQuestionModal.value = true
}

const closeEditQuestionModal = () => {
  showEditQuestionModal.value = false
  selectedQuestion.value = null
}

const updateQuestion = () => {
  if (!selectedQuestion.value || !editQuestionText.value.trim()) {
    alert('Pertanyaan tidak boleh kosong!')
    return
  }
  
  router.put(`/admin/quiz/pertanyaan/${selectedQuestion.value.id}`, { 
    pertanyaan: editQuestionText.value.trim() 
  }, {
    preserveScroll: true,
    onSuccess: () => {
      closeEditQuestionModal()
      router.reload()
    },
    onError: () => {
      alert('Gagal mengupdate pertanyaan!')
    }
  })
}

// ===== PLANT MANAGEMENT =====
const openAddPlantModal = () => {
  showAddPlantModal.value = true
  initializeAnswerForm()
  selectedPlant.value = null
}

const closeAddPlantModal = () => {
  showAddPlantModal.value = false
}

const addPlantAnswer = () => {
  if (!jawabanForm.value.Tumbuhan.trim()) {
    alert('Nama tumbuhan tidak boleh kosong!')
    return
  }

  const isComplete = props.pertanyaan.every(q => jawabanForm.value.answers[q.text] !== '')
  if (!isComplete) {
    alert('Harap lengkapi semua jawaban!')
    return
  }

  const method = selectedPlant.value ? 'put' : 'post'
  const url = selectedPlant.value 
    ? `/admin/quiz/jawaban/${encodeURIComponent(selectedPlant.value.tumbuhan)}`
    : '/admin/quiz/jawaban'

  router[method](url, {
    Tumbuhan: jawabanForm.value.Tumbuhan.trim(),
    answers: jawabanForm.value.answers,
  }, {
    preserveScroll: true,
    onSuccess: () => {
      closeAddPlantModal()
      router.reload()
    },
    onError: () => {
      alert(selectedPlant.value ? 'Gagal mengupdate jawaban!' : 'Gagal menyimpan jawaban!')
    }
  })
}

const viewPlantDetail = (plant: PlantAnswer) => {
  selectedPlant.value = plant
  showDetailModal.value = true
}

const editPlantAnswer = (plant: PlantAnswer) => {
  selectedPlant.value = plant
  jawabanForm.value = {
    Tumbuhan: plant.tumbuhan,
    answers: getAnswersOnly(plant)
  }
  showAddPlantModal.value = true
}

const closeDetailModal = () => {
  showDetailModal.value = false
}

// ===== DELETE MANAGEMENT =====
const confirmDeleteQuestion = (question: Question) => {
  deleteType.value = 'question'
  deleteTarget.value = question
  deleteMessage.value = `Yakin ingin menghapus pertanyaan "${question.text}"? Data jawaban terkait juga akan terpengaruh.`
  showDeleteModal.value = true
}

const confirmDeletePlant = (plant: PlantAnswer) => {
  deleteType.value = 'plant'
  deleteTarget.value = plant
  deleteMessage.value = `Yakin ingin menghapus data tanaman "${plant.tumbuhan}"?`
  showDeleteModal.value = true
}

const closeDeleteModal = () => {
  showDeleteModal.value = false
}

const confirmDelete = () => {
  if (!deleteTarget.value) return

  const url = deleteType.value === 'question'
    ? `/admin/quiz/pertanyaan/${deleteTarget.value.id}`
    : `/admin/quiz/jawaban/${encodeURIComponent((deleteTarget.value as PlantAnswer).tumbuhan)}`

// Tambahkan fungsi-fungsi berikut ke dalam script setup:

// ===== COMPUTED PROPERTIES =====
const getCompletionPercentage = computed(() => {
  if (pertanyaan.length === 0 || jawaban.length === 0) return 0
  
  // Hitung rata-rata kelengkapan data
  let totalAnswered = 0
  let totalQuestions = pertanyaan.length * jawaban.length
  
  jawaban.forEach(j => {
    pertanyaan.forEach(q => {
      if (j[q.text] && j[q.text] !== '') {
        totalAnswered++
      }
    })
  })
}

const closeAddModal = () => {
  showAddModal.value = false
}

// ===== WATCH UNTUK UPDATE FORM SAAT PERTANYAAN BERUBAH =====
import { watch } from 'vue'

watch(() => pertanyaan, (newPertanyaan) => {
  // Update form jawaban ketika ada perubahan pertanyaan
  initializeAnswerForm()
  
  // Update search edit data jika sedang dalam mode edit
  if (isEditingSearch.value && hasilJawaban.value) {
    const updatedData = {}
    newPertanyaan.forEach(q => {
      updatedData[q.text] = searchEditData.value[q.text] || ''
    })
    searchEditData.value = updatedData
  }
  
  // Update edit jawaban data jika sedang dalam mode edit
  if (editingJawaban.value) {
    const target = jawaban.find(j => j.tumbuhan === editingJawaban.value)
    if (target) {
      const updatedEditData = {}
      newPertanyaan.forEach(q => {
        updatedEditData[q.text] = target[q.text] || ''
      })
      editJawabanData.value = updatedEditData
    }
  }
}, { deep: true })

// ===== IMPROVED SEARCH FUNCTIONALITY =====
const searchJawaban = async (searchTerm) => {
  const term = searchTerm || searchTumbuhan.value
  if (!term.trim()) {
    alert('Masukkan nama tumbuhan!')
    return
  }

  searchNotFound.value = false

  try {
    const response = await fetch(`/admin/quiz/jawaban/${encodeURIComponent(searchTumbuhan.value.trim())}`)
    if (!response.ok) throw new Error('Tidak ditemukan')
    
    const data = await response.json()
    selectedPlant.value = data
  } catch (error) {
    searchNotFound.value = true
    setTimeout(() => {
      searchNotFound.value = false
    }, 3000)
  }
}

const clearSearch = () => {
  searchTumbuhan.value = ''
  searchNotFound.value = false
  selectedPlant.value = null
}

// ===== AUTH =====
const logout = () => {
  router.get('/logout')
}

// Initialize form on mount
onMounted(() => {
  initializeAnswerForm()
})
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