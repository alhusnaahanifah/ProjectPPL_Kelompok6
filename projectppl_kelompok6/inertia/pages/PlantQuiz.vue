<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-green-100 via-white to-green-50">
    <!-- HEADER -->
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

    <!-- MAIN CONTENT -->
    <main class="flex-grow px-6 pt-32">
      <div class="container mx-auto px-4 py-8">
        <div class="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          
          <!-- Loading State -->
          <div v-if="loading" class="p-8 text-center">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">Memuat pertanyaan...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="p-8 text-center">
            <div class="text-red-500 text-6xl mb-4">⚠️</div>
            <h3 class="text-xl font-bold text-red-600 mb-2">Terjadi Kesalahan</h3>
            <p class="text-gray-600 mb-4">{{ error }}</p>
            <button @click="loadQuizData" class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Coba Lagi
            </button>
          </div>

          <!-- Quiz -->
          <div v-if="!showResult">
            <div class="bg-gradient-to-r from-green-600 to-blue-600 text-white p-8">
              <h2 class="text-3xl font-bold mb-2">Quiz Tanaman Hidroponik</h2>
              <p class="text-green-100">Temukan tanaman yang paling cocok untuk Anda!</p>

              <!-- Progress Bar -->
              <div class="mt-6 bg-white bg-opacity-20 rounded-full h-3">
                <div class="bg-white h-3 rounded-full transition-all duration-300" :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }"></div>
              </div>
              <p class="text-right text-sm mt-2 text-green-100">
                {{ currentQuestion + 1 }} dari {{ questions.length }} pertanyaan
              </p>
            </div>

            <!-- Questions -->
            <div class="p-8">
              <h3 class="text-xl font-semibold text-gray-800 mb-6">
                {{ questions.length > currentQuestion ? questions[currentQuestion]?.text : 'Pertanyaan tidak tersedia' }}
              </h3>

              <div class="space-y-3">
                <button @click="selectOption('Ya')" class="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition group">
                  <span class="text-gray-700 group-hover:text-green-700 font-medium">Ya</span>
                </button>
                <button @click="selectOption('Tidak')" class="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition group">
                  <span class="text-gray-700 group-hover:text-green-700 font-medium">Tidak</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Result -->
          <div v-else class="p-8 text-center">
            <h3 class="text-3xl font-bold text-green-700 mb-4">Hasil Quiz Anda</h3>

            <div v-if="result.length > 0">
              <div class="space-y-6">
                <div v-for="plant in result" :key="plant.tumbuhan" class="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <h4 class="text-2xl font-bold text-green-800 mb-2">{{ plant.tumbuhan }}</h4>
                  <p class="text-green-700">Tanaman yang paling cocok berdasarkan jawaban Anda.</p>
                  <div class="flex justify-center items-center space-x-2">
                    <span class="text-sm text-green-600">Tingkat Kesesuaian:</span>
                    <div class="bg-green-200 rounded-full px-3 py-1">
                      <span class="text-green-800 font-semibold">{{ plant.score }}/{{ plant.totalQuestions }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  @click="restartQuiz"
                  class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  Coba Lagi
                </button>

                <button 
                  @click="goToDashboard"
                  class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
                  </svg>
                  Kembali ke Dashboard
                </button>
              </div>
            </div>

            <p v-else class="text-gray-600">Tidak ada hasil yang cocok berdasarkan jawaban Anda.</p>
          </div>

        </div>
      </div>
    </main>
    <!-- FOOTER -->
    <footer class="bg-[#2f3828]/20 backdrop-blur-md border border-white/30 rounded-xl text-[#32690e] text-center text-sm py-4 shadow-md">
      © 2025 HidroGrow. Semua hak dilindungi.
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { router, Link, usePage } from '@inertiajs/vue3'

defineOptions({
  name: 'PlantQuiz'
})

const page = usePage()
const user = page.props.user || {}

// Reactive data
const loading = ref(true)
const error = ref(null)
const currentQuestion = ref(0)
const answers = ref([])
const showResult = ref(false)
const calculatingResult = ref(false)
const questions = ref([])
const jawabanDatabase = ref([])
const result = ref(null)
const resultError = ref(null)
const resultMessage = ref('')
const isMenuOpen = ref(false)

const props = defineProps({
    pertanyaan: { type: Array, default: () => [] },
    jawaban: { type: Array, default: () => [] },
});

onMounted(async () => {
    console.log('Props pertanyaan sebelum diisi:', props.pertanyaan);
    
    // Ambil data kuis dari API
    await loadQuizData();

    // Pastikan data pertanyaan diisi setelah load
    questions.value = props.pertanyaan;
    console.log('Data questions setelah mount:', questions.value);
});

// Methods
async function loadQuizData() {
  loading.value = true
  error.value = null
  
  try {
    // Change this line from '/plant-quiz' to '/plant-quiz/data'
    const response = await fetch('/plant-quiz/data')
    const data = await response.json()
    
    if (data.success) {
      questions.value = data.pertanyaan
      jawabanDatabase.value = data.jawaban
      
      if (questions.value.length === 0) {
        throw new Error('Tidak ada pertanyaan yang tersedia')
      }
    } else {
      throw new Error(data.message || 'Gagal memuat data quiz')
    }
  } catch (err) {
    console.error('Error loading quiz data:', err)
    error.value = err.message || 'Terjadi kesalahan saat memuat data quiz'
  } finally {
    loading.value = false
  }
}

function selectOption(answer) {
  // Simpan jawaban dengan ID pertanyaan
  answers.value.push({
    questionId: questions.value[currentQuestion.value].id,
    question: questions.value[currentQuestion.value].text,
    answer: answer
  })

  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
  } else {
    calculateResult()
  }
}

async function calculateResult() {
  showResult.value = true
  calculatingResult.value = true
  result.value = null
  resultError.value = null

  try {
    const response = await fetch('/plant-quiz/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
      },
      body: JSON.stringify({
        answers: answers.value
      })
    })

    const data = await response.json()

    if (data.success && data.result) {
      result.value = data.result
      resultMessage.value = data.message
    } else {
      throw new Error(data.message || 'Tidak dapat menentukan hasil')
    }
  } catch (err) {
    console.error('Error calculating result:', err)
    resultError.value = err.message || 'Terjadi kesalahan saat menghitung hasil'
  } finally {
    calculatingResult.value = false
  }
}

function goBack() {
  if (currentQuestion.value > 0) {
    currentQuestion.value--
    answers.value.pop() // Hapus jawaban terakhir
  }
}

function restartQuiz() {
  currentQuestion.value = 0
  answers.value = []
  showResult.value = false
  result.value = null
  resultError.value = null
  resultMessage.value = ''
  
  // Reload data jika diperlukan
  if (questions.value.length === 0) {
    loadQuizData()
  }
}

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function goToDashboard() {
  window.location.href = '/dashboard'
}

function logout() {
  if (window.$inertia) {
    window.$inertia.get('/logout')
  } else {
    window.location.href = '/logout'
  }
}
</script>

<style scoped>
/* Custom styles can be added here */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>