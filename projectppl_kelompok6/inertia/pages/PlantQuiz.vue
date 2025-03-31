<template>
  <div class="min-h-screen bg-green-50 py-12 px-4">
    <div class="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8">
      <!-- Header -->
      <h2 class="text-3xl font-bold text-green-700 text-center">Tanaman Apa yang Cocok untuk Kamu?</h2>
      <p class="mt-2 text-gray-600 text-center">Jawab 3 pertanyaan singkat ini!</p>
      
      <!-- Quiz Progress -->
      <div class="mt-6 bg-gray-200 rounded-full h-2">
        <div 
          class="bg-green-600 h-2 rounded-full" 
          :style="{ width: `${(currentQuestion / questions.length) * 100}%` }"
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
        <button 
          @click="restartQuiz"
          class="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Coba Lagi
        </button>
      </div>
    </div>
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
          image: "https://example.com/snake-plant.jpg",
          description: "Kamu cocok dengan Lidah Mertua! Tanaman ini tahan lama dan hanya butuh perawatan minimal."
        },
        free_outdoor_flower: {
          image: "https://example.com/sunflower.jpg",
          description: "Cobalah menanam Bunga Matahari! Cocok untukmu yang punya waktu luang dan suka warna cerah."
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
    }
  }
};
</script>