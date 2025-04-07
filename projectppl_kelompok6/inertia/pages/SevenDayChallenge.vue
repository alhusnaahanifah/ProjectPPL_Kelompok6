<template>
  <div class="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50 py-12 px-4">
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
    <div class="flex-1 max-w-3xl mx-auto px-4">
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

          <!-- Edit / Delete (CRUD) -->
          <div class="mt-2 flex justify-center gap-2 text-xs">
            <button @click.stop="editDay(day)" class="text-blue-600 hover:underline">Edit</button>
            <button @click.stop="deleteDay(day.id)" class="text-red-600 hover:underline">Hapus</button>
          </div>
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
        <!-- Tambah di bawah -->
        <button 
          v-if="currentDay < 7"
          @click="forceNextDay"
          class="mt-4 px-4 py-1 text-sm text-blue-600 underline"
        >
          ⏩ Debug: Lanjut Hari Berikutnya
        </button>

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

      <!-- Form Tambah/Edit Hari -->
      <div class="mt-12 bg-white p-6 rounded-xl shadow-md">
        <h3 class="text-xl font-bold mb-4">{{ editMode ? 'Edit Hari Tantangan' : 'Tambah Hari Tantangan' }}</h3>

        <div class="grid gap-4">
          <input v-model="newDay.title" type="text" placeholder="Judul Hari" class="border p-2 rounded w-full" />
          <input v-model="newDay.image" type="text" placeholder="URL Gambar" class="border p-2 rounded w-full" />
          <textarea v-model="newDay.description" placeholder="Deskripsi" class="border p-2 rounded w-full"></textarea>
          <input v-model="newDay.tipsString" type="text" placeholder="Tips (pisahkan dengan koma)" class="border p-2 rounded w-full" />
        </div>

        <div class="mt-4 flex gap-2">
          <button @click="saveDay" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            {{ editMode ? 'Update' : 'Simpan' }}
          </button>
          <button v-if="editMode" @click="cancelEdit" class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Batal</button>
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
      isSimulated: true,
      days: [],
      newDay: {
        id: null,
        title: '',
        image: '',
        description: '',
        tips: [],
        tipsString: ''
      },
      editMode: false
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
      const today = new Date();
      this.dayCompleted = true;
      localStorage.setItem('lastCompletedDate', today.toISOString());
      localStorage.setItem('dayCompleted', 'true');
    },
    checkIfDayCompleted() {
      const storedDay = parseInt(localStorage.getItem('currentDay')) || 1;
      const lastCompleted = localStorage.getItem('lastCompletedDate');
      const completedFlag = localStorage.getItem('dayCompleted') === 'true';

      const now = new Date();
      const last = lastCompleted ? new Date(lastCompleted) : null;

      const afterMidnight = now.getHours() > 0 || (now.getHours() === 0 && now.getMinutes() >= 1);
      const isNewDay = this.isSimulated || (last && now.toDateString() !== last.toDateString() && afterMidnight);


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
    forceNextDay() {
      this.currentDay += 1;
      this.dayCompleted = false;
      this.selectedDay = this.days[this.currentDay - 1];
      localStorage.setItem('currentDay', this.currentDay);
      localStorage.setItem('dayCompleted', 'false');
      localStorage.setItem('lastCompletedDate', new Date().toISOString());
    },
    loadProgress() {
      const storedDay = parseInt(localStorage.getItem('currentDay')) || 1;
      const lastCompleted = localStorage.getItem('lastCompletedDate');
      const storedDays = JSON.parse(localStorage.getItem('days'));
      this.days = storedDays || this.defaultDays();
      this.currentDay = storedDay;
      this.lastCompletedDate = lastCompleted;
      this.selectedDay = this.days[storedDay - 1] || null;
      this.checkIfDayCompleted();
    },
    saveDay() {
      const tipsArray = this.newDay.tipsString?.split(',').map(t => t.trim()).filter(Boolean);

      if (this.editMode) {
        const index = this.days.findIndex(d => d.id === this.newDay.id);
        if (index !== -1) {
          this.days[index] = { ...this.newDay, tips: tipsArray };
        }
      } else {
        const newId = this.days.length ? Math.max(...this.days.map(d => d.id)) + 1 : 1;
        this.days.push({ ...this.newDay, id: newId, tips: tipsArray });
      }

      this.resetForm();
      this.saveToStorage();
    },
    editDay(day) {
      this.editMode = true;
      this.newDay = {
        ...day,
        tipsString: day.tips?.join(', ') || ''
      };
    },
    deleteDay(id) {
      this.days = this.days.filter(day => day.id !== id);
      if (this.selectedDay && this.selectedDay.id === id) {
        this.selectedDay = null;
      }
      this.saveToStorage();
    },
    cancelEdit() {
      this.resetForm();
    },
    resetForm() {
      this.editMode = false;
      this.newDay = {
        id: null,
        title: '',
        image: '',
        description: '',
        tips: [],
        tipsString: ''
      };
    },
    saveToStorage() {
      localStorage.setItem('days', JSON.stringify(this.days));
    },
    defaultDays() {
      return [
        {
          id: 1,
          title: "Pilih Tanamanmu",
          image: "https://source.unsplash.com/400x300/?plant",
          description: "Berdasarkan hasil kuis atau preferensimu, pilih tanaman yang akan kamu tanam selama 7 hari ke depan.",
          tips: ["Gunakan rekomendasi dari kuis kepribadian", "Pertimbangkan ruang dan waktu perawatan yang tersedia"]
        },
        {
          id: 2,
          title: "Siapkan Media Tanam",
          image: "https://source.unsplash.com/400x300/?hydroponics,tools",
          description: "Waktunya menyiapkan media tanam seperti rockwool, netpot, atau spons hidroponik.",
          tips: ["Potong media tanam sesuai ukuran netpot", "Basahi media tanam agar tetap lembap"]
        },
        {
          id: 3,
          title: "Semai Benih",
          image: "https://source.unsplash.com/400x300/?seeds,planting",
          description: "Letakkan benih tanaman di media tanam dan pastikan mendapatkan kelembapan yang cukup.",
          tips: ["Gunakan pinset untuk meletakkan benih", "Tutup benih dengan plastik transparan hingga tumbuh"]
        },
        {
          id: 4,
          title: "Pindahkan ke Sistem",
          image: "https://source.unsplash.com/400x300/?hydroponic,setup",
          description: "Setelah benih berkecambah, pindahkan ke sistem hidroponik seperti NFT atau wick system.",
          tips: ["Pastikan akar sudah cukup panjang", "Gunakan air bersih dan cek pH larutan"]
        },
        {
          id: 5,
          title: "Rawat Tanamanmu",
          image: "https://source.unsplash.com/400x300/?watering,plantcare",
          description: "Pantau pertumbuhan tanaman dan pastikan nutrisinya cukup.",
          tips: ["Cek air dan larutan nutrisi setiap hari", "Pastikan pencahayaan cukup (natural atau lampu growlight)"]
        },
        {
          id: 6,
          title: "Cegah Hama dan Penyakit",
          image: "https://source.unsplash.com/400x300/?plant,pest",
          description: "Periksa tanaman dari hama atau jamur, dan bersihkan daun jika ada tanda-tanda penyakit.",
          tips: ["Gunakan pestisida alami jika perlu", "Jaga lingkungan sekitar tetap bersih dan kering"]
        },
        {
          id: 7,
          title: "Panen & Evaluasi",
          image: "https://source.unsplash.com/400x300/?harvest,lettuce",
          description: "Selamat! Hari ini waktunya panen. Evaluasi hasilnya dan rencanakan penanaman berikutnya!",
          tips: ["Panen dengan hati-hati agar akar tidak rusak", "Bagikan hasil tanammu ke media sosial 😄"]
        }
      ];
    },
    goToDashboard() {
      this.$inertia.visit('/dashboard');
    }
  }
};
</script>


<script setup>
import { ref, onMounted } from 'vue';

const progress = ref(0);

onMounted(() => {
  // Ini akan dipanggil hanya di sisi browser
  const saved = localStorage.getItem('sevenDayProgress');
  if (saved) {
    progress.value = parseInt(saved, 10);
  }
});

function saveProgress(newProgress) {
  progress.value = newProgress;
  localStorage.setItem('sevenDayProgress', newProgress.toString());
}
</script>
