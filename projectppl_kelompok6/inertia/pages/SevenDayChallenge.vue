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
            'bg-green-600 text-white': selectedDay && selectedDay.id === day.id,
            'bg-white border border-green-300': !selectedDay || selectedDay.id !== day.id
          }"

          class="p-4 rounded-lg shadow-sm cursor-pointer text-center"
        >
          <div class="font-bold">Hari {{ day.id }}</div>
          <div v-if="day.id <= currentDay" class="mt-2 text-sm break-words leading-tight">
            {{ day.title }}
          </div>
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

        <!-- Tombol kembali ke dashboard -->
        <div class="mt-6">
          <button 
            @click="goToDashboard"
            class="px-6 py-2 bg-gray-300 text-green-800 rounded-lg hover:bg-gray-400"
          >
            ⬅ Kembali ke Dashboard
          </button>
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
      currentDay: 1,
      dayCompleted: false,
      selectedDay: null,
      lastCompletedDate: null,
      days: [
        {
          id: 1,
          title: "Pilih Tanamanmu",
          image: "https://source.unsplash.com/400x300/?plant",
          description: "Berdasarkan hasil kuis atau preferensimu, pilih tanaman yang akan kamu tanam selama 7 hari ke depan.",
          tips: [
            "Gunakan rekomendasi dari kuis kepribadian",
            "Pertimbangkan ruang dan waktu perawatan yang tersedia"
          ]
        },
        {
          id: 2,
          title: "Siapkan Media Tanam",
          image: "https://source.unsplash.com/400x300/?hydroponics,tools",
          description: "Waktunya menyiapkan media tanam seperti rockwool, netpot, atau spons hidroponik.",
          tips: [
            "Potong media tanam sesuai ukuran netpot",
            "Basahi media tanam agar tetap lembap"
          ]
        },
        {
          id: 3,
          title: "Semai Benih",
          image: "https://source.unsplash.com/400x300/?seeds,planting",
          description: "Letakkan benih tanaman di media tanam dan pastikan mendapatkan kelembapan yang cukup.",
          tips: [
            "Gunakan pinset untuk meletakkan benih",
            "Tutup benih dengan plastik transparan hingga tumbuh"
          ]
        },
        {
          id: 4,
          title: "Pindahkan ke Sistem",
          image: "https://source.unsplash.com/400x300/?hydroponic,setup",
          description: "Setelah benih berkecambah, pindahkan ke sistem hidroponik seperti NFT atau wick system.",
          tips: [
            "Pastikan akar sudah cukup panjang",
            "Gunakan air bersih dan cek pH larutan"
          ]
        },
        {
          id: 5,
          title: "Rawat Tanamanmu",
          image: "https://source.unsplash.com/400x300/?watering,plantcare",
          description: "Pantau pertumbuhan tanaman dan pastikan nutrisinya cukup.",
          tips: [
            "Cek air dan larutan nutrisi setiap hari",
            "Pastikan pencahayaan cukup (natural atau lampu growlight)"
          ]
        },
        {
          id: 6,
          title: "Cegah Hama dan Penyakit",
          image: "https://source.unsplash.com/400x300/?plant,pest",
          description: "Periksa tanaman dari hama atau jamur, dan bersihkan daun jika ada tanda-tanda penyakit.",
          tips: [
            "Gunakan pestisida alami jika perlu",
            "Jaga lingkungan sekitar tetap bersih dan kering"
          ]
        },
        {
          id: 7,
          title: "Panen & Evaluasi",
          image: "https://source.unsplash.com/400x300/?harvest,lettuce",
          description: "Selamat! Hari ini waktunya panen. Evaluasi hasilnya dan rencanakan penanaman berikutnya!",
          tips: [
            "Panen dengan hati-hati agar akar tidak rusak",
            "Bagikan hasil tanammu ke media sosial 😄"
          ]
        }
      ]

    };
  },
  created() {
    this.loadProgress();
  },
  methods: {
    selectDay(day) {
      if (day.id <= this.currentDay) {
        this.selectedDay = day;
        this.checkIfDayCompleted();
      }
    },
    completeDay() {
      if (typeof window === 'undefined') return;

      const today = new Date();
      this.dayCompleted = true;
      localStorage.setItem('lastCompletedDate', today.toISOString());
      localStorage.setItem('dayCompleted', 'true');
    },
    checkIfDayCompleted() {
      if (typeof window === 'undefined') return;

      const storedDay = parseInt(localStorage.getItem('currentDay')) || 1;
      const lastCompleted = localStorage.getItem('lastCompletedDate');
      const completedFlag = localStorage.getItem('dayCompleted') === 'true';

      const now = new Date();
      const last = lastCompleted ? new Date(lastCompleted) : null;

      const afterMidnight = now.getHours() > 0 || (now.getHours() === 0 && now.getMinutes() >= 1);
      const isNewDay = last && now.toDateString() !== last.toDateString() && afterMidnight;

      if (isNewDay && completedFlag && storedDay < 7) {
        this.currentDay = storedDay + 1;
        localStorage.setItem('currentDay', this.currentDay);
        localStorage.setItem('dayCompleted', 'false');
        this.dayCompleted = false;
      } else {
        this.currentDay = storedDay;
        this.dayCompleted = !isNewDay && completedFlag;
      }
    },

    loadProgress() {
      if (typeof window === 'undefined') return; // Cegah error SSR

      const storedDay = parseInt(localStorage.getItem('currentDay')) || 1;
      const lastCompleted = localStorage.getItem('lastCompletedDate');
      this.currentDay = storedDay;
      this.lastCompletedDate = lastCompleted;
      this.selectedDay = this.days[storedDay - 1];
      this.checkIfDayCompleted();
    },
    goToDashboard() {
      this.$inertia.visit('/dashboard');
    }
  }
};
</script>

