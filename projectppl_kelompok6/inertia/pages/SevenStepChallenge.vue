<template>
  <div class="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50 py-12 px-4">
    <!-- Header -->
    <header
      class="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-5xl box-border flex justify-between items-center px-6 py-1 z-50
        bg-[#2f3828]/20 text-white backdrop-blur-md border border-white/30 rounded-full shadow-md"
    >
      <!-- Logo -->
      <div class="flex items-center space-x-4">
        <img src="../image/hlogo-samping.png" alt="Logo Project" class="w-32 h-auto">
      </div>

      <!-- Menu -->
      <div class="relative">
        <button
          @click="toggleMenu"
          class="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-2 rounded-lg flex items-center gap-2 shadow-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <transition name="fade">
          <div
            v-if="isMenuOpen"
            class="absolute right-0 mt-2 min-w-[8rem] bg-white rounded-lg shadow-md py-2 z-50 border border-gray-200"
          >
            <Link href="/profile" class="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors whitespace-nowrap" @click="toggleMenu">
              <i class="fas fa-user text-green-600"></i> 👤 Profil
            </Link>
            <button @click="logout" class="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 transition-colors whitespace-nowrap">
              <i class="fas fa-sign-out-alt text-green-600"></i> ⍈ Keluar
            </button>
          </div>
        </transition>
      </div>
    </header>

    <div class="h-20"></div>

    <!-- Main Container -->
    <div class="flex-1 max-w-5xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-green-700 text-center mb-8">7 Langkah Tantangan Menanam</h2>

      <div class="flex flex-col md:flex-row gap-6">
        <!-- Sidebar Langkah -->
        <div class="md:w-1/4 space-y-4 sticky top-28">
          <div 
            v-for="step in steps" 
            :key="step.id"
            :class="{
              'bg-green-600 text-white': currentStep && currentStep.id === step.id,
              'bg-white border border-green-300 opacity-50': step.locked && (!currentStep || currentStep.id !== step.id),
              'bg-white border border-green-300': !step.locked && (!currentStep || currentStep.id !== step.id)
            }"
            @click="selectStep(step)"
            class="p-4 rounded-lg shadow-sm cursor-pointer text-center relative"
          >
            <div class="font-bold text-lg">Langkah {{ step.id }}</div>
            <div class="mt-2 text-sm">{{ step.title }}</div>
            <div class="absolute top-2 right-2">
              <span v-if="step.locked" class="text-red-600 font-bold text-2xl">🔒</span>
              <span v-else class="text-green-600 font-bold text-2xl">🔓</span>
            </div>
          </div>
        </div>

        <!-- Konten Langkah Aktif -->
        <div class="md:w-3/4">
          <div v-if="currentStep" class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="text-xl font-bold mb-4">Langkah {{ currentStep.id }}: {{ currentStep.title }}</h3>

            <div class="space-y-6">
              <div v-for="challenge in currentStep.challenges" :key="challenge.id" class="border border-green-200 rounded-lg p-4">
                <h4 class="font-semibold text-green-700 text-lg">{{ challenge.title }}</h4>
                <p class="mt-1 text-gray-700">{{ challenge.description }}</p>
                <div v-if="challenge.tips && challenge.tips.length" class="mt-3 text-sm bg-green-50 p-3 rounded">
                  <h5 class="font-semibold">Tips:</h5>
                  <ul class="list-disc pl-5 mt-1">
                    <li v-for="(tip, index) in challenge.tips" :key="index">{{ tip }}</li>
                  </ul>
                </div>
                <div class="mt-3 flex gap-2">
                  <button
                    @click="toggleChallengeComplete(currentStep.id, challenge.id)"
                    class="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700"
                    v-if="!challenge.completed"
                  >
                    Tandai Selesai
                  </button>
                  <span v-else class="text-green-600 font-semibold">✔ Selesai</span>
                </div>
                <div v-if="challenge.completed" class="mt-4">
                  <h5 class="font-semibold">Catatan:</h5>
                  <textarea v-model="challenge.note" class="border w-full p-2 rounded mt-1"></textarea>
                  <div class="mt-2 flex gap-2">
                    <button @click="saveNote(currentStep.id, challenge.id)" class="bg-blue-600 text-white px-3 py-1 rounded">Simpan</button>
                    <button @click="clearNote(currentStep.id, challenge.id)" class="bg-gray-400 text-white px-3 py-1 rounded">Hapus</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6">
              <button @click="forceNextStep" class="text-blue-600 underline text-sm">⏩ Debug: Buka Langkah Berikutnya</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';

const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const currentStep = ref(null);

const steps = ref([
  {
    id: 1,
    title: 'Persiapan Alat dan Bahan',
    locked: false,
    challenges: [
      {
        id: 1,
        title: 'Siapkan Wadah Tanam',
        description: 'Gunakan wadah seperti pot, baskom, atau barang bekas yang sesuai untuk tanaman hidroponik.',
        tips: ['Pastikan wadah memiliki lubang drainase', 'Bersihkan wadah sebelum digunakan'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Siapkan Nutrisi dan Media Tanam',
        description: 'Gunakan larutan nutrisi khusus hidroponik dan media tanam seperti rockwool atau hidroton.',
        tips: ['Larutan nutrisi bisa dibeli di toko pertanian', 'Gunakan media tanam steril'],
        completed: false,
        note: ''
      }
    ]
  },
  {
    id: 2,
    title: 'Pemilihan Bibit Tanaman',
    locked: true,
    challenges: [
      {
        id: 1,
        title: 'Pilih Jenis Tanaman yang Tepat',
        description: 'Cari tanaman yang cocok untuk hidroponik, seperti kangkung, selada, atau bayam.',
        tips: ['Pertimbangkan iklim dan kebutuhan ruang tumbuh', 'Mulai dengan tanaman yang mudah dirawat'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Periksa Kualitas Benih',
        description: 'Pastikan benih yang dipilih berkualitas tinggi, tidak cacat, dan memiliki daya tumbuh yang baik.',
        tips: ['Beli benih di toko terpercaya', 'Uji daya tumbuh dengan merendam benih dalam air selama 24 jam'],
        completed: false,
        note: ''
      }
    ]
  },
  {
    id: 3,
    title: 'Proses Penanaman',
    locked: true,
    challenges: [
      {
        id: 1,
        title: 'Siapkan Media Tanam',
        description: 'Tempatkan media tanam seperti rockwool dalam wadah, dan pastikan ada ruang untuk akar berkembang.',
        tips: ['Potong rockwool sesuai ukuran wadah', 'Buat lubang kecil di media untuk meletakkan benih'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Tanam Benih dengan Tepat',
        description: 'Letakkan benih di lubang media tanam dan siram sedikit air untuk merangsang pertumbuhan.',
        tips: ['Jangan tanam terlalu dalam', 'Gunakan pinset jika benih sulit dijangkau'],
        completed: false,
        note: ''
      }
    ]
  },
  {
    id: 4,
    title: 'Perawatan Harian',
    locked: true,
    challenges: [
      {
        id: 1,
        title: 'Kontrol Nutrisi dan pH',
        description: 'Pastikan larutan nutrisi memiliki pH yang sesuai (5.5-6.5) dan tambahkan jika nutrisi berkurang.',
        tips: ['Gunakan alat pengukur pH', 'Cek larutan nutrisi setiap 2-3 hari'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Pantau Kondisi Tanaman',
        description: 'Periksa daun, batang, dan akar untuk memastikan tanaman tumbuh sehat.',
        tips: ['Segera buang daun yang layu atau rusak', 'Pastikan tanaman terkena cahaya yang cukup'],
        completed: false,
        note: ''
      }
    ]
  },
  {
    id: 5,
    title: 'Pemupukan',
    locked: true,
    challenges: [
      {
        id: 1,
        title: 'Pilih Jenis Pupuk yang Tepat',
        description: 'Gunakan pupuk cair yang mudah diserap oleh akar tanaman hidroponik.',
        tips: ['Pupuk organik cair adalah pilihan ramah lingkungan', 'Ikuti dosis pada kemasan'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Pemupukan Berkala',
        description: 'Berikan pupuk sesuai jadwal dan kebutuhan tanaman.',
        tips: ['Siram pupuk secara merata', 'Hentikan pemberian pupuk mendekati waktu panen'],
        completed: false,
        note: ''
      }
    ]
  },
  {
    id: 6,
    title: 'Panen dan Refleksi',
    locked: true,
    challenges: [
      {
        id: 1,
        title: 'Panen dengan Hati-hati',
        description: 'Petik tanaman saat ukurannya sudah sesuai dan sebelum daun terlalu tua.',
        tips: ['Gunakan gunting tajam', 'Panen di pagi atau sore hari'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Catat Pengalaman Bertanam',
        description: 'Tuliskan proses, keberhasilan, dan kendala selama menanam.',
        tips: ['Identifikasi apa yang berhasil', 'Cari solusi untuk kendala yang dihadapi'],
        completed: false,
        note: ''
      }
    ]
  },
  {
    id: 7,
    title: 'Merancang Tanaman Berikutnya',
    locked: true,
    challenges: [
      {
        id: 1,
        title: 'Rencanakan Tanaman Baru',
        description: 'Pilih tanaman baru yang ingin ditanam berdasarkan hasil evaluasi.',
        tips: ['Coba variasi tanaman untuk tantangan baru', 'Riset metode hidroponik lainnya'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Siapkan Alat dan Media Tanam Kembali',
        description: 'Bersihkan dan siapkan kembali alat tanam untuk musim berikutnya.',
        tips: ['Sterilkan alat yang digunakan', 'Pastikan nutrisi dan media baru tersedia'],
        completed: false,
        note: ''
      }
    ]
  }
]);


const selectStep = (step) => {
  if (!step.locked) currentStep.value = step;
};

const toggleChallengeComplete = (stepId, challengeId) => {
  const step = steps.value.find(s => s.id === stepId);
  const challenge = step.challenges.find(c => c.id === challengeId);
  challenge.completed = true;
  checkStepCompletion(stepId);
};

const saveNote = (stepId, challengeId) => {
  const step = steps.value.find(s => s.id === stepId);
  const challenge = step.challenges.find(c => c.id === challengeId);
  alert('Catatan disimpan: ' + challenge.note);
};

const clearNote = (stepId, challengeId) => {
  const step = steps.value.find(s => s.id === stepId);
  const challenge = step.challenges.find(c => c.id === challengeId);
  challenge.note = '';
};

const checkStepCompletion = (stepId) => {
  const step = steps.value.find(s => s.id === stepId);
  const allDone = step.challenges.every(c => c.completed);
  if (allDone) {
    const nextStep = steps.value.find(s => s.id === stepId + 1);
    if (nextStep) nextStep.locked = false;
  }
};

const forceNextStep = () => {
  const current = currentStep.value;
  const next = steps.value.find(s => s.id === current.id + 1);
  if (next) next.locked = false;
};

onMounted(() => {
  currentStep.value = steps.value.find(s => !s.locked);
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
