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
    <div class="flex-1 max-w-4xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-green-700 text-center">7 Langkah Tantangan Menanam</h2>

      <!-- Step Cards -->
      <div class="mt-8 grid gap-6 md:grid-cols-3">
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
            <span v-if="step.locked" class="text-red-600 font-bold">🔒</span>
            <span v-else class="text-green-600 font-bold">🔓</span>
          </div>
        </div>
      </div>

      <!-- Step Detail -->
      <div v-if="currentStep" class="mt-10 bg-white p-6 rounded-xl shadow-md">
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
        title: 'Siapkan Pot',
        description: 'Cari pot atau wadah untuk menanam.',
        tips: ['Gunakan pot berlubang di bagian bawah', 'Bisa pakai barang bekas seperti botol plastik'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Siapkan Media Tanam',
        description: 'Gunakan tanah subur atau media tanam siap pakai.',
        tips: ['Campur dengan kompos agar lebih subur'],
        completed: false,
        note: ''
      }
    ]
  },
  {
    id: 2,
    title: 'Pemilihan Bibit',
    locked: true,
    challenges: [
      {
        id: 1,
        title: 'Pilih Bibit Sesuai Iklim',
        description: 'Pilih bibit yang cocok dengan kondisi lingkunganmu.',
        tips: ['Cek bibit di toko pertanian terdekat'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Periksa Kualitas Bibit',
        description: 'Pastikan bibit sehat dan bebas dari hama.',
        tips: ['Bibit yang baik biasanya tidak layu dan warnanya segar'],
        completed: false,
        note: ''
      }
    ]
  },
  {
    id: 3,
    title: 'Penanaman',
    locked: true,
    challenges: [
      {
        id: 1,
        title: 'Buat Lubang Tanam',
        description: 'Lubangi media tanam sesuai ukuran bibit.',
        tips: ['Jangan terlalu dalam', 'Sesuai dengan panjang akar'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Tanam Bibit',
        description: 'Letakkan bibit dan tutup dengan tanah secara hati-hati.',
        tips: ['Tekan perlahan agar akar menempel', 'Siram sedikit air setelah menanam'],
        completed: false,
        note: ''
      }
    ]
  },
  {
    id: 4,
    title: 'Penyiraman',
    locked: true,
    challenges: [
      {
        id: 1,
        title: 'Jadwal Penyiraman',
        description: 'Buat jadwal rutin untuk menyiram tanaman.',
        tips: ['Pagi atau sore hari adalah waktu terbaik'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Gunakan Air Bersih',
        description: 'Pastikan air tidak tercemar bahan kimia.',
        tips: ['Air hujan bisa jadi pilihan baik'],
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
        title: 'Pilih Pupuk yang Sesuai',
        description: 'Gunakan pupuk organik atau kimia sesuai kebutuhan.',
        tips: ['Pupuk organik lebih ramah lingkungan'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Pupuk dengan Takaran Tepat',
        description: 'Jangan berlebihan dalam memberi pupuk.',
        tips: ['Ikuti petunjuk pada kemasan pupuk'],
        completed: false,
        note: ''
      }
    ]
  },
  {
    id: 6,
    title: 'Perawatan Rutin',
    locked: true,
    challenges: [
      {
        id: 1,
        title: 'Cek Hama dan Penyakit',
        description: 'Periksa tanaman secara berkala.',
        tips: ['Gunakan pestisida alami jika perlu'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Potong Daun Layu',
        description: 'Pangkas daun yang kering atau rusak.',
        tips: ['Gunakan gunting tajam dan bersih'],
        completed: false,
        note: ''
      }
    ]
  },
  {
    id: 7,
    title: 'Panen dan Refleksi',
    locked: true,
    challenges: [
      {
        id: 1,
        title: 'Panen dengan Hati-hati',
        description: 'Petik tanaman saat sudah matang.',
        tips: ['Gunakan alat yang bersih dan tajam'],
        completed: false,
        note: ''
      },
      {
        id: 2,
        title: 'Catat Hasil dan Pembelajaran',
        description: 'Tuliskan pengalamanmu selama menanam.',
        tips: ['Apa yang berhasil dan apa yang bisa ditingkatkan?'],
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
