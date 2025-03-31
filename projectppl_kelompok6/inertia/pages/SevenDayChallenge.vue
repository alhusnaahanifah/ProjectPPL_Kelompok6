<template>
  <div class="min-h-screen bg-gradient-to-b from-green-100 to-white py-12">
    <div class="max-w-3xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-green-700 text-center">Tantangan 7 Hari Menanam</h2>
      
      <!-- Day Cards -->
      <div class="mt-8 grid gap-6 md:grid-cols-7">
        <div 
          v-for="day in days" 
          :key="day.id"
          @click="selectDay(day)"
          :class="{
            'bg-green-600 text-white': selectedDay.id === day.id,
            'bg-white border border-green-300': selectedDay.id !== day.id
          }"
          class="p-4 rounded-lg shadow-sm cursor-pointer text-center"
        >
          <div class="font-bold">Hari {{ day.id }}</div>
          <div v-if="day.id <= currentDay" class="mt-2 text-sm">{{ day.title }}</div>
          <div v-else class="mt-2 text-sm opacity-50">Terkunci</div>
        </div>
      </div>

      <!-- Day Detail -->
      <div v-if="selectedDay" class="mt-8 bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-bold">{{ selectedDay.title }}</h3>
        <img :src="selectedDay.image" class="mt-4 mx-auto rounded-lg max-h-48" />
        <p class="mt-4">{{ selectedDay.description }}</p>
        <div v-if="selectedDay.tips" class="mt-4 p-3 bg-green-50 rounded-lg">
          <h4 class="font-semibold">Tips Hari Ini:</h4>
          <ul class="list-disc pl-5 mt-2">
            <li v-for="(tip, index) in selectedDay.tips" :key="index">{{ tip }}</li>
          </ul>
        </div>
        <button 
          v-if="selectedDay.id === currentDay && !dayCompleted"
          @click="completeDay"
          class="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Tandai Selesai
        </button>
        <div v-else-if="selectedDay.id < currentDay" class="mt-6 text-green-600 font-semibold">
          ✔ Sudah selesai
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SevenDayChallenge',
  data() {
    return {
      currentDay: 1, // Simpan di localStorage/session untuk persistensi
      dayCompleted: false,
      selectedDay: null,
      days: [
        {
          id: 1,
          title: "Pilih Tanamanmu",
          image: "https://example.com/choose-plant.jpg",
          description: "Berdasarkan hasil kuis atau preferensimu, pilih tanaman yang akan kamu tanam...",
          tips: [
            "Gunakan rekomendasi dari kuis kepribadian",
            "Pertimbangkan ruang yang tersedia"
          ]
        },
        // Tambahkan hari 2-7...
      ]
    };
  },
  created() {
    this.selectedDay = this.days[0];
  },
  methods: {
    selectDay(day) {
      if (day.id <= this.currentDay) {
        this.selectedDay = day;
        this.dayCompleted = false;
      }
    },
    completeDay() {
      this.dayCompleted = true;
      // Simpan progress ke localStorage
    }
  }
};
</script>