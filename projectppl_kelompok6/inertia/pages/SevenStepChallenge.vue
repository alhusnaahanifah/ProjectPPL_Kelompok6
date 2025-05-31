<template>
  <div class="min-h-screen bg-gradient-to-b from-green-100 via-white to-green-50 py-12 px-4">
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

    <div class="h-20"></div>

    <!-- Main Container -->
    <div class="flex-1 max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-green-700 text-center mb-8">7 Langkah Tantangan Menanam</h2>

      <!-- Main Layout Grid -->
      <div class="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        <!-- Left Sidebar - Steps (3 columns) -->
        <div class="xl:col-span-3 space-y-4">
          <div class="bg-white p-4 rounded-xl shadow-md">
            <h3 class="text-lg font-bold text-green-700 mb-4">Langkah-langkah</h3>
            <div class="space-y-3">
              <div 
                v-for="step in steps" 
                :key="step.id"
                :class="{
                  'bg-green-600 text-white': currentStep && currentStep.id === step.id,
                  'bg-gray-100 border border-gray-200 opacity-50': step.locked && (!currentStep || currentStep.id !== step.id),
                  'bg-white border border-green-300 hover:bg-green-50': !step.locked && (!currentStep || currentStep.id !== step.id)
                }"
                @click="selectStep(step)"
                class="p-3 rounded-lg shadow-sm cursor-pointer text-center relative transition-all duration-200"
              >
                <div class="font-bold text-sm">Langkah {{ step.id }}</div>
                <div class="mt-1 text-xs">{{ step.title }}</div>
                <div class="absolute top-2 right-2">
                  <span v-if="step.locked" class="text-red-500 text-lg">🔒</span>
                  <span v-else class="text-green-500 text-lg">🔓</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Content - Step Details (6 columns) -->
        <div class="xl:col-span-6 space-y-6">
          <!-- Konten Langkah Aktif -->
          <div v-if="currentStep" class="bg-white p-6 rounded-xl shadow-md">
            <h3 class="text-xl font-bold mb-4 text-green-700">Langkah {{ currentStep.id }}: {{ currentStep.title }}</h3>

            <div class="space-y-6">
              <div v-for="challenge in currentStep.challenges" :key="challenge.id" class="border border-green-200 rounded-lg p-4 bg-green-50/30">
                <h4 class="font-semibold text-green-700 text-lg">{{ challenge.title }}</h4>
                <p class="mt-1 text-gray-700">{{ challenge.description }}</p>
                <div v-if="challenge.tips && challenge.tips.length" class="mt-3 text-sm bg-green-50 p-3 rounded border-l-4 border-green-500">
                  <h5 class="font-semibold text-green-700">Tips:</h5>
                  <ul class="list-disc pl-5 mt-1 space-y-1">
                    <li v-for="(tip, index) in challenge.tips" :key="index" class="text-gray-700">{{ tip }}</li>
                  </ul>
                </div>
                <div class="mt-4 flex gap-2">
                  <button
                    @click="toggleChallengeComplete(currentStep.id, challenge.id)"
                    class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors font-medium"
                    v-if="!challenge.completed"
                  >
                    Tandai Selesai
                  </button>
                  <div v-else class="flex items-center gap-2 text-green-600 font-semibold">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                    </svg>
                    Selesai
                    <span v-if="challenge.completedAt" class="text-xs text-gray-500 ml-2">({{ new Date(challenge.completedAt).toLocaleString('id-ID') }})</span>
                  </div>
                </div>
                <div v-if="challenge.completed" class="mt-4 p-3 bg-white rounded-lg border">
                  <h5 class="font-semibold text-gray-700 mb-2">Catatan:</h5>
                  <textarea 
                    v-model="challenge.note" 
                    class="border border-gray-300 w-full p-3 rounded-lg mt-1 resize-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows="3"
                    placeholder="Tambahkan catatan Anda..."
                  ></textarea>
                  <div class="mt-2 flex gap-2">
                    <button @click="saveNote(currentStep.id, challenge.id)" class="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition-colors">Simpan</button>
                    <button @click="clearNote(currentStep.id, challenge.id)" class="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500 transition-colors">Hapus</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar - Enhanced Calendar (3 columns) -->
        <div class="xl:col-span-3 space-y-6">
          <!-- Calendar Widget -->
          <div class="bg-gradient-to-br from-green-600 to-green-800 p-5 rounded-2xl shadow-lg text-white">
            <!-- Calendar Header -->
            <div class="flex justify-between items-center mb-4">
              <button @click="prevMonth" class="p-2 rounded-full hover:bg-white/20 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <h3 class="text-lg font-bold">{{ currentMonthYear }}</h3>
              <button @click="nextMonth" class="p-2 rounded-full hover:bg-white/20 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>

            <!-- Days of Week -->
            <div class="grid grid-cols-7 gap-1 mb-2">
              <div v-for="day in daysOfWeek" :key="day" class="p-1 text-center text-xs font-medium opacity-80">
                {{ day }}
              </div>
            </div>

            <!-- Calendar Days -->
            <div class="grid grid-cols-7 gap-1">
              <div
                v-for="day in calendarDays"
                :key="`${day.date}-${day.month}`"
                :class="{
                  'opacity-30': !day.isCurrentMonth,
                  'bg-white/20 font-bold': day.isToday,
                  'bg-green-400/30': day.hasProgress && !day.isToday,
                  'ring-2 ring-white': day.isSelected
                }"
                @click="selectDate(day)"
                class="p-2 text-center text-xs rounded-lg cursor-pointer hover:bg-white/20 transition-colors relative"
              >
                {{ day.date }}
                <div v-if="day.hasProgress" class="absolute bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-300 rounded-full"></div>
              </div>
            </div>
          </div>

          <!-- Tasks for Today -->
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div class="bg-gradient-to-r from-green-500 to-green-600 p-4">
              <h3 class="text-white font-bold text-lg">Progress Hari Ini</h3>
              <p class="text-green-100 text-sm">{{ formatSelectedDate(selectedDate) }}</p>
            </div>
            
            <div class="p-4 max-h-60 overflow-y-auto">
              <div v-if="todayTasks.length === 0" class="text-center py-6 text-gray-500">
                <div class="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <p class="text-sm">Tidak ada progress</p>
              </div>
              
              <div v-else class="space-y-3">
                <div
                  v-for="task in todayTasks"
                  :key="`${task.stepId}-${task.challengeId}`"
                  class="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                >
                  <div class="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div class="flex-1 min-w-0">
                    <div class="text-sm font-medium text-gray-900 truncate">
                      Langkah {{ task.stepId }} - {{ task.stepTitle }}
                    </div>
                    <div class="text-xs text-gray-600 mt-1">
                      {{ formatTime(task.completedAt) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { router, Link, usePage } from '@inertiajs/vue3'

const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);
const currentStep = ref(null);
const page = usePage();
const progress = page.props.progress || []; 
const calendarEntries = ref([]);

// Calendar state
const currentDate = ref(new Date());
const selectedDate = ref(new Date());

const plant = page.props.plant;
const steps = ref(plant.steps || []);

// Calendar computed properties
const currentMonthYear = computed(() => {
  return currentDate.value.toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric'
  });
});

const daysOfWeek = ['SEN', 'SEL', 'RAB', 'KAM', 'JUM', 'SAB', 'MIN'];

const calendarDays = computed(() => {
  const year = currentDate.value.getFullYear();
  const month = currentDate.value.getMonth();
  
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDate = new Date(firstDay);
  
  // Adjust to start from Monday
  const dayOfWeek = (firstDay.getDay() + 6) % 7;
  startDate.setDate(firstDay.getDate() - dayOfWeek);
  
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 42; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    
    const dateStr = date.toDateString();
    const hasProgress = calendarEntries.value.some(entry => {
      const entryDate = new Date(entry.completedAt);
      return entryDate.toDateString() === dateStr;
    });
    
    days.push({
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
      fullDate: date,
      isCurrentMonth: date.getMonth() === month,
      isToday: date.toDateString() === today.toDateString(),
      isSelected: date.toDateString() === selectedDate.value.toDateString(),
      hasProgress
    });
  }
  
  return days;
});

const todayTasks = computed(() => {
  const selectedDateStr = selectedDate.value.toDateString();
  return calendarEntries.value.filter(entry => {
    const entryDate = new Date(entry.completedAt);
    return entryDate.toDateString() === selectedDateStr;
  });
});

const sortedCalendarEntries = computed(() => {
  return [...calendarEntries.value].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
});

// Calendar methods
const prevMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() - 1, 1);
};

const nextMonth = () => {
  currentDate.value = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 1);
};

const selectDate = (day) => {
  selectedDate.value = day.fullDate;
};

const formatSelectedDate = (date) => {
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const formatTime = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Initialize progress data
steps.value.forEach((step) => {
  step.challenges.forEach((challenge) => {
    const userProgress = progress.find(
      (p) => p.step_id === step.id && p.challenge_id === challenge.id
    );
    challenge.completed = !!userProgress?.completed;
    challenge.note = userProgress?.note || '';
    challenge.completedAt = userProgress?.completedAt || null;

    if (challenge.completed && challenge.completedAt) {
      calendarEntries.value.push({
        completedAt: challenge.completedAt,
        stepId: step.id,
        stepTitle: step.title,
        challengeId: challenge.id,
        challengeTitle: challenge.title
      });
    }
  });
});

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const plantId = plant._id;

const selectStep = (step) => {
  if (!step.locked) currentStep.value = step;
};

const toggleChallengeComplete = async (stepId, challengeId) => {
  const step = steps.value.find(s => s.id === stepId);
  const challenge = step.challenges.find(c => c.id === challengeId);
  challenge.completed = true;
  challenge.completedAt = new Date().toISOString();

  // Add to calendar entries
  calendarEntries.value.push({
    completedAt: challenge.completedAt,
    stepId: step.id,
    stepTitle: step.title,
    challengeId: challenge.id,
    challengeTitle: challenge.title
  });

  await router.post(`/plants/${plantId}/steps/${stepId}/challenges/${challengeId}/complete`, {}, {
    preserveScroll: true,
    onSuccess: () => checkStepCompletion(stepId),
  });
};

const saveNote = async (stepId, challengeId) => {
  const step = steps.value.find(s => s.id === stepId);
  const challenge = step.challenges.find(c => c.id === challengeId);
  await router.post(`/plants/${plantId}/steps/${stepId}/challenges/${challengeId}/note`, {
    note: challenge.note
  }, {
    preserveScroll: true,
    onSuccess: () => alert('Catatan disimpan!'),
  });
};

const clearNote = async (stepId, challengeId) => {
  const step = steps.value.find(s => s.id === stepId);
  const challenge = step.challenges.find(c => c.id === challengeId);
  challenge.note = '';

  await router.post(`/plants/${plantId}/steps/${stepId}/challenges/${challengeId}/note`, {
    note: ''
  }, {
    preserveScroll: true,
    onSuccess: () => alert('Catatan dihapus!'),
  });
};

const checkStepCompletion = (stepId) => {
  const step = steps.value.find(s => s.id === stepId);
  const allDone = step.challenges.every(c => c.completed);
  if (allDone) {
    const nextStep = steps.value.find(s => s.id === stepId + 1);
    if (nextStep) nextStep.locked = false;
  }
};

onMounted(() => {
  // Lock all steps except the first incomplete one
  for (let i = 0; i < steps.value.length; i++) {
    const step = steps.value[i];
    const allDone = step.challenges.every(c => c.completed);
    if (i === 0 || steps.value[i - 1].challenges.every(c => c.completed)) {
      step.locked = false;
    } else {
      step.locked = true;
    }
  }

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

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #16a34a;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #15803d;
}
</style>