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
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold text-green-700 text-center">Panduan Praktis</h2>

      <!-- Tabs -->
      <div class="mt-8 flex border-b border-gray-200">
        <button 
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="{
            'text-green-600 border-b-2 border-green-600': activeTab === tab.id,
            'text-gray-500 hover:text-gray-700': activeTab !== tab.id
          }"
          class="px-4 py-2 font-medium"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab Content -->
      <div class="mt-6">
        <!-- Infografis -->
        <div v-if="activeTab === 'infographic'" class="grid md:grid-cols-2 gap-6">
          <div 
            v-for="item in infographics" 
            :key="item.id"
            class="border border-gray-200 rounded-lg overflow-hidden"
          >
            <img :src="item.image" class="w-full h-48 object-cover" />
            <div class="p-4">
              <h3 class="font-bold">{{ item.title }}</h3>
              <p class="mt-2 text-sm text-gray-600">{{ item.caption }}</p>
            </div>
          </div>
        </div>

        <!-- Video -->
        <div v-else-if="activeTab === 'video'" class="grid md:grid-cols-2 gap-6">
          <div 
            v-for="video in videos" 
            :key="video.id"
            class="rounded-lg overflow-hidden shadow-md"
          >
            <iframe 
              :src="video.embedUrl"
              class="w-full h-48"
              frameborder="0"
              allowfullscreen
            ></iframe>
            <div class="p-4">
              <h3 class="font-bold">{{ video.title }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ video.duration }} · {{ video.views }}</p>
            </div>
          </div>
        </div>

        <!-- FAQ -->
        <div v-else-if="activeTab === 'faq'" class="space-y-4">
          <div 
            v-for="faq in faqs" 
            :key="faq.id"
            class="border-b border-gray-200 pb-4"
          >
            <button 
              @click="toggleFaq(faq.id)"
              class="flex justify-between items-center w-full text-left"
            >
              <span class="font-medium">{{ faq.question }}</span>
              <span>{{ expandedFaqs.includes(faq.id) ? '−' : '+' }}</span>
            </button>
            <p v-if="expandedFaqs.includes(faq.id)" class="mt-2 text-gray-600">
              {{ faq.answer }}
            </p>
          </div>
        </div>

        <!-- Komunitas -->
        <div v-else-if="activeTab === 'community'" class="space-y-6">
          <!-- Header Komunitas -->
          <div class="text-center">
            <h3 class="text-xl font-semibold text-green-700">Berbagi Pengalaman Berkebun</h3>
            <p class="text-gray-600 mt-2">Lihat dan bagikan pengalaman berkebun dengan komunitas</p>
          </div>

          <!-- Daftar Pengalaman -->
          <div v-if="experiences.length > 0" class="grid md:grid-cols-2 gap-6">
            <div 
              v-for="exp in experiences" 
              :key="exp.id"
              class="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img v-if="exp.photo" :src="exp.photo" class="w-full h-48 object-cover" />
              <div class="p-4">
                <div class="flex items-center gap-2 mb-3">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {{ exp.username.charAt(0).toUpperCase() }}
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900">{{ exp.username }}</p>
                    <p class="text-xs text-gray-500">2 jam yang lalu</p>
                  </div>
                </div>
                <p class="text-gray-700 leading-relaxed">{{ exp.story }}</p>

                <!-- Actions untuk pemilik postingan -->
                <div v-if="exp.user_id === user.id" class="mt-4 flex justify-end gap-2 pt-3 border-t border-gray-100">
                  <button 
                    @click="startEditExperience(exp)" 
                    class="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    <i class="fas fa-edit"></i> Edit
                  </button>
                  <button 
                    @click="deleteExperience(exp.id)" 
                    class="text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
                  >
                    <i class="fas fa-trash"></i> Hapus
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-seedling text-green-600 text-2xl"></i>
            </div>
            <h3 class="text-lg font-medium text-gray-900 mb-2">Belum ada pengalaman yang dibagikan</h3>
            <p class="text-gray-600">Jadilah yang pertama membagikan pengalaman berkebun Anda!</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Action Button (hanya muncul di tab komunitas) -->
    <button
      v-if="activeTab === 'community'"
      @click="showCreateForm = true"
      class="fixed bottom-6 right-6 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
    >
      <i class="fas fa-plus text-xl"></i>
    </button>

    <!-- Modal Form Tambah Pengalaman -->
    <div 
      v-if="showCreateForm" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="closeCreateForm"
    >
      <div class="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ editId ? 'Edit Pengalaman' : 'Bagikan Pengalaman' }}
            </h3>
            <button 
              @click="closeCreateForm" 
              class="text-gray-400 hover:text-gray-600"
            >
              <i class="fas fa-times text-xl"></i>
            </button>
          </div>

          <form @submit.prevent="addExperience" class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Cerita Pengalaman</label>
              <textarea 
                v-model="newExperience.story" 
                placeholder="Bagikan pengalaman berkebun Anda..." 
                rows="4"
                class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none" 
                required
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Foto (Opsional)</label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                <input 
                  type="file" 
                  @change="handleFileUpload" 
                  accept="image/*" 
                  class="hidden" 
                  ref="fileInput"
                />
                <button 
                  type="button" 
                  @click="$refs.fileInput.click()"
                  class="text-green-600 hover:text-green-700 font-medium"
                >
                  <i class="fas fa-camera mr-2"></i>
                  {{ newExperience.photo ? 'Ganti Foto' : 'Pilih Foto' }}
                </button>
                <div v-if="newExperience.photo" class="mt-3">
                  <img :src="newExperience.photo" class="w-full h-32 object-cover rounded-lg" />
                </div>
              </div>
            </div>

            <div class="flex gap-3 pt-4">
              <button 
                type="button"
                @click="closeCreateForm"
                class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button 
                type="submit"
                class="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                {{ editId ? 'Update' : 'Bagikan' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { router, Link, usePage } from '@inertiajs/vue3'
import { onMounted } from 'vue'

defineOptions({
  name: 'Guides'
})

const page = usePage()
const user = page.props.user || {}

const isMenuOpen = ref(false)
const activeTab = ref('infographic')
const expandedFaqs = ref([])
const showCreateForm = ref(false)

const tabs = [
  { id: 'infographic', label: 'Infografis' },
  { id: 'video', label: 'Video' },
  { id: 'faq', label: 'FAQ' },
  { id: 'community', label: 'Komunitas' }
]

const infographics = ref([
  {
    id: 1,
    title: "Cara Menyemai Benih",
    caption: "Langkah-langkah sederhana untuk pemula",
    image: "https://placehold.co/600x400/green/white?text=Infografis+1"
  }
])

const videos = ref([
  {
    id: "abc123",
    title: "Cara Setup Hidroponik Sederhana",
    embedUrl: "https://www.youtube.com/embed/PxmZ-_YP1dM?si=oWTzOslUhY5JrD4n",
    duration: "1:30",
    views: "10K ditonton"
  }
])

const faqs = ref([
  {
    id: 1,
    question: "Tanaman apa yang cocok untuk kamar tidur?",
    answer: "Lidah mertua atau Peace Lily bisa jadi pilihan..."
  }
])

const experiences = ref(page.props.experiences || [
  {
    id: 1,
    username: "Ali",
    story: "Saya mulai menanam sayur organik di balkon rumah.",
    photo: null
  }
])

const newExperience = ref({
  username: '',
  story: '',
  photo: null
})

const editId = ref(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const logout = () => {
  router.get('/logout')
}

const toggleFaq = (id) => {
  if (expandedFaqs.value.includes(id)) {
    expandedFaqs.value = expandedFaqs.value.filter(faqId => faqId !== id)
  } else {
    expandedFaqs.value.push(id)
  }
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    newExperience.value.photoFile = file
    newExperience.value.photo = URL.createObjectURL(file)
  }
}

const closeCreateForm = () => {
  showCreateForm.value = false
  editId.value = null
  newExperience.value = { username: '', story: '', photo: null, photoFile: null }
}

const addExperience = () => {
  const form = new FormData()
  form.append('story', newExperience.value.story)
  if (newExperience.value.photoFile) {
    form.append('photo', newExperience.value.photoFile)
  }

  if (editId.value) {
    // Untuk edit, gunakan route khusus POST dengan flag edit
    form.append('_method', 'PUT')
    
    // Option 1: Gunakan Inertia router.put langsung
    router.put(`/guides/${editId.value}`, form, {
      forceFormData: true,
      onSuccess: () => {
        closeCreateForm()
      },
      onError: (errors) => {
        console.error('Error updating experience:', errors)
        // Fallback: coba dengan POST ke route edit khusus
        router.post(`/guides/${editId.value}/edit`, form, {
          forceFormData: true,
          onSuccess: () => {
            closeCreateForm()
          },
          onError: (fallbackErrors) => {
            console.error('Fallback edit also failed:', fallbackErrors)
            alert('Gagal mengupdate pengalaman. Silakan coba lagi.')
          }
        })
      }
    })
  } else {
    // Untuk create baru
    router.post('/guides', form, {
      forceFormData: true,
      onSuccess: () => {
        closeCreateForm()
      },
      onError: (errors) => {
        console.error('Error creating experience:', errors)
        alert('Gagal membuat pengalaman. Silakan coba lagi.')
      }
    })
  }
}

const deleteExperience = (id) => {
  if (confirm('Apakah Anda yakin ingin menghapus pengalaman ini?')) {
    router.delete(`/guides/${id}`, {
      onSuccess: () => {
        // Server akan render ulang
      }
    })
  }
}

const startEditExperience = (exp) => {
  newExperience.value = {
    username: exp.username,
    story: exp.story,
    photo: exp.photo
  }
  editId.value = exp.id
  showCreateForm.value = true
}

</script>