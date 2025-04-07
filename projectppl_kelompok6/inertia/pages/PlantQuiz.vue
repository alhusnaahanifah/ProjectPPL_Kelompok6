<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-green-100 via-white to-green-50">
  <header
     class="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl box-border flex justify-between items-center px-6 py-1 z-50 
      bg-[#2f3828]/20 text-white backdrop-blur-md border border-white/30 rounded-full shadow-md"
    >
      <div class="flex items-center space-x-4">
        <img src="../image/hlogo-samping.png" alt="Logo Project" class="w-32 h-auto">
      </div>
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
              <i class="fas fa-user text-green-600"></i> 👤 Profil
            </Link>
            <button
              @click="logout"
              class="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors whitespace-nowrap"
            >
              <i class="fas fa-sign-out-alt text-green-600"></i> ⍈ Keluar
            </button>
          </div>
        </transition>
      </div>
    </header>

    <div class="h-20"></div>
    <div class="flex-1">
    <div class="max-w-2xl mt-10 mx-auto bg-white rounded-xl shadow-md pt-12 p-6 w-full h-auto">
      <h2 class="text-3xl font-bold text-green-700 text-center">Tanaman Apa yang Cocok untuk Kamu?</h2>
      <p class="mt-2 text-gray-600 text-center">Jawab 3 pertanyaan singkat ini!</p>
      
      <!-- Quiz Progress -->
      <div class="mt-6 bg-gray-200 rounded-full h-2">
        <div 
          class="bg-green-600 h-2 rounded-full" 
          :style="{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }"
        ></div>
      </div>

      <!-- Question -->
      <div v-if="!showResult" class="mt-8">
        <h3 class="text-xl font-semibold">{{ questions[currentQuestion].text }}</h3>
        <div class="mt-4 space-y-3">
          <button 
            v-for="(option, index) in questions[currentQuestion].options" 
            :key="index"
            @click="selectOption(option.value)"
            class="w-full px-4 py-2 border border-green-600 rounded-lg hover:bg-green-100"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Result -->
      <div v-else class="mt-8 text-center">
        <h3 class="text-2xl font-bold text-green-700">Hasilnya...</h3>
        <img :src="result.image" class="mt-4 mx-auto h-40" />
        <p class="mt-4 text-lg">{{ result.description }}</p>
        <div class="mt-3 flex justify-center flex-col sm:flex-row gap-4">
          <button 
            @click="restartQuiz"
            class="mt-3 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            🔄 Coba Lagi
          </button>
          <button 
            @click="goToDashboard"
            class="mt-3 px-3 py-2 bg-gray-200 text-green-800 rounded-lg hover:bg-green-500"
          >
            🏠 Kembali ke Dashboard
          </button>
        </div>
      </div>
    </div>
    </div>
    <footer class="bg-[#2f3828]/20 backdrop-blur-md border border-white/30 rounded-xl text-[#32690e] text-center text-sm py-4 shadow-md">
      © 2025 HidroGrow. Semua hak dilindungi.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'PlantQuiz',
  data() {
    return {
      currentQuestion: 0,
      answers: [],
      showResult: false,
      questions: [
        {
          text: "Seberapa sibuk kamu?",
          options: [
            { label: "Sangat sibuk (hanya bisa rawat seminggu sekali)", value: "busy" },
            { label: "Cukup sibuk (bisa rawat 2-3 hari sekali)", value: "medium" },
            { label: "Tidak terlalu sibuk", value: "free" }
          ]
        },
        {
          text: "Kamu lebih suka tanaman di:",
          options: [
            { label: "Dalam ruangan (indoor)", value: "indoor" },
            { label: "Luar ruangan (outdoor)", value: "outdoor" }
          ]
        },
        {
          text: "Kamu suka tanaman yang:",
          options: [
            { label: "Berbunga cantik", value: "flower" },
            { label: "Berdaun hijau segar", value: "leafy" }
          ]
        }
      ],
      results: {
        busy_indoor_leafy: {
          image: "../image/tumbuhan.png",
          description: "Kamu cocok dengan sayur Sawi! Tanaman ini tahan lama dan hanya butuh perawatan minimal."
        },
        free_outdoor_flower: {
          image: "../image/tumbuhan.png",
          description: "Cobalah menanam sayur Sawi! Cocok untukmu yang punya waktu luang dan suka warna cerah."
        }
        // Tambahkan kombinasi hasil lainnya...
      }
    };
  },
  computed: {
    result() {
      const key = this.answers.join('_');
      return this.results[key] || {
        image: "https://example.com/default-plant.jpg",
        description: "Kamu cocok dengan tanaman serbaguna seperti Kaktus!"
      };
    }
  },
  methods: {
    selectOption(value) {
      this.answers.push(value);
      if (this.currentQuestion < this.questions.length - 1) {
        this.currentQuestion++;
      } else {
        this.showResult = true;
      }
    },
    restartQuiz() {
      this.currentQuestion = 0;
      this.answers = [];
      this.showResult = false;
    },
    goToDashboard() {
      window.location.href = '/dashboard';
    }
  }
};
</script>

<script setup>

import { ref } from 'vue'
import { router, Link, usePage } from '@inertiajs/vue3'

defineOptions({
  name: 'PlantQuiz'
})

const page = usePage()
const user = page.props.user || {}  // user dari controller

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logout = () => {
  router.get('/logout')
}
</script>