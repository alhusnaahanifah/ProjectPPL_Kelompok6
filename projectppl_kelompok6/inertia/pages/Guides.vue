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

      <!-- Loading State -->
      <div v-if="loading" class="mt-8 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <p class="mt-2 text-gray-600">Memuat panduan...</p>
      </div>

      <!-- Error State -->
      <div v-if="error" class="mt-8 bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-600">{{ error }}</p>
        <button @click="fetchGuides" class="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Coba Lagi
        </button>
      </div>

      <!-- Content -->
      <div v-if="!loading && !error">
        <!-- Tabs -->
        <div class="mt-8 flex border-b border-gray-200">
          <button 
            v-for="tab in tabs"
            :key="tab.id"
            @click="setActiveTab(tab.id)"
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
          <div v-if="activeTab === 'infografis'" class="grid md:grid-cols-2 gap-6">
            <div v-if="infografis.length === 0" class="col-span-2 text-center py-8 text-gray-500">
              Belum ada infografis tersedia
            </div>
            <div 
              v-for="item in infografis" 
              :key="item.id"
              class="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <img :src="item.link" :alt="item.title" class="w-full h-48 object-cover" />
              <div class="p-4">
                <h3 class="font-bold text-gray-800">{{ item.title }}</h3>
                <p v-if="item.deskripsi" class="mt-2 text-sm text-gray-600">{{ item.deskripsi }}</p>
              </div>
            </div>
          </div>

          <!-- Video -->
          <div v-else-if="activeTab === 'video'" class="grid md:grid-cols-2 gap-6">
            <div v-if="videos.length === 0" class="col-span-2 text-center py-8 text-gray-500">
              Belum ada video tersedia
            </div>
            <div 
              v-for="video in videos" 
              :key="video.id"
              class="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div class="relative">
                <iframe 
                  :src="getEmbedUrl(video.link)"
                  class="w-full h-48"
                  frameborder="0"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="p-4">
                <h3 class="font-bold text-gray-800">{{ video.title }}</h3>
                <p v-if="video.durasi" class="mt-1 text-sm text-gray-500">{{ video.durasi }}</p>
                <p v-if="video.deskripsi" class="mt-2 text-sm text-gray-600">{{ video.deskripsi }}</p>
              </div>
            </div>
          </div>

          <!-- FAQ -->
          <div v-else-if="activeTab === 'faq'" class="space-y-4">
            <div v-if="faqs.length === 0" class="text-center py-8 text-gray-500">
              Belum ada FAQ tersedia
            </div>
            <div 
              v-for="faq in faqs" 
              :key="faq.id"
              class="border-b border-gray-200 pb-4"
            >
              <button 
                @click="toggleFaq(faq.id)"
                class="flex justify-between items-center w-full text-left hover:text-green-600 transition-colors"
              >
                <span class="font-medium">{{ faq.title }}</span>
                <span class="text-xl">{{ expandedFaqs.includes(faq.id) ? '−' : '+' }}</span>
              </button>
              <div v-if="expandedFaqs.includes(faq.id)" class="mt-3 text-gray-600">
                <p v-if="faq.deskripsi">{{ faq.deskripsi }}</p>
                <a v-if="faq.link" :href="faq.link" target="_blank" class="inline-block mt-2 text-green-600 hover:text-green-700 underline">
                  Lihat Selengkapnya
                </a>
              </div>
            </div>
          </div>
          <!-- Komunitas -->
          <div v-else-if="activeTab === 'community'" class="space-y-8">
            <!-- Header Komunitas -->
            <div class="text-center mb-8">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-4 shadow-lg">
                <i class="fas fa-users text-white text-2xl"></i>
              </div>
              <h3 class="text-2xl font-bold text-gray-800 mb-2">Komunitas Berkebun</h3>
              <p class="text-gray-600 max-w-2xl mx-auto">Berbagi pengalaman, tips, dan inspirasi berkebun bersama komunitas yang peduli lingkungan</p>
            </div>

            <!-- Form Tambah Pengalaman -->
            <div class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-green-100">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                    {{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}
                  </div>
                  <div>
                    <h4 class="font-semibold text-gray-800">{{ editId ? 'Edit Pengalaman' : 'Bagikan Pengalaman Berkebun' }}</h4>
                    <p class="text-sm text-gray-600">Ceritakan perjalanan berkebun Anda kepada komunitas</p>
                  </div>
                </div>
              </div>

              <form @submit.prevent="addExperience" class="p-6 space-y-6">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    <i class="fas fa-pen-fancy text-green-600 mr-2"></i>
                    Ceritakan Pengalaman Anda
                  </label>
                  <div class="relative">
                    <textarea 
                      v-model="newExperience.story" 
                      placeholder="Bagikan tips, tantangan, atau keberhasilan berkebun Anda. Misalnya: bagaimana cara mengatasi hama, hasil panen yang memuaskan, atau eksperimen dengan tanaman baru..." 
                      rows="4"
                      class="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-all duration-200 placeholder-gray-400" 
                      required
                    ></textarea>
                    <div class="absolute bottom-3 right-3 text-xs text-gray-400">
                      {{ newExperience.story.length }}/500
                    </div>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-3">
                    <i class="fas fa-camera text-green-600 mr-2"></i>
                    Foto Pendukung (Opsional)
                  </label>
                  
                  <div v-if="!newExperience.photo" 
                      class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 hover:bg-green-50 transition-all duration-200 cursor-pointer group"
                      @click="$refs.fileInput.click()">
                    <input 
                      type="file" 
                      @change="handleFileUpload" 
                      accept="image/*" 
                      class="hidden" 
                      ref="fileInput"
                    />
                    <div class="space-y-3">
                      <div class="w-12 h-12 bg-gray-100 group-hover:bg-green-100 rounded-full flex items-center justify-center mx-auto transition-colors">
                        <i class="fas fa-cloud-upload-alt text-gray-400 group-hover:text-green-500 text-xl transition-colors"></i>
                      </div>
                      <div>
                        <p class="text-gray-600 font-medium">Klik untuk mengunggah foto</p>
                        <p class="text-sm text-gray-400 mt-1">PNG, JPG hingga 5MB</p>
                      </div>
                    </div>
                  </div>

                  <div v-else class="relative">
                    <div class="relative rounded-xl overflow-hidden">
                      <img :src="newExperience.photo" class="w-full h-48 object-cover" />
                      <div class="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                        <button 
                          type="button" 
                          @click="removePhoto"
                          class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors"
                        >
                          <i class="fas fa-trash mr-2"></i>Hapus Foto
                        </button>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      @click="$refs.fileInput.click()"
                      class="absolute top-3 right-3 bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium shadow-md transition-all"
                    >
                      <i class="fas fa-camera mr-1"></i>Ganti
                    </button>
                    <input 
                      type="file" 
                      @change="handleFileUpload" 
                      accept="image/*" 
                      class="hidden" 
                      ref="fileInput"
                    />
                  </div>
                </div>

                <div class="flex gap-3 pt-2">
                  <button 
                    v-if="editId"
                    type="button"
                    @click="cancelEdit"
                    class="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium"
                  >
                    <i class="fas fa-times mr-2"></i>Batal
                  </button>
                  <button 
                    type="submit"
                    class="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <i class="fas fa-share-alt mr-2"></i>
                    {{ editId ? 'Update Pengalaman' : 'Bagikan Pengalaman' }}
                  </button>
                </div>
              </form>
            </div>

            <!-- Daftar Pengalaman -->
            <div v-if="experiences.length > 0" class="space-y-6">
              <div class="flex items-center justify-between">
                <h4 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <i class="fas fa-comments text-green-600"></i>
                  Pengalaman Komunitas
                </h4>
                <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {{ experiences.length }} cerita
                </span>
              </div>

              <div class="grid gap-6">
                <div 
                  v-for="exp in experiences" 
                  :key="exp.id"
                  class="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200"
                >
                  <!-- Header Postingan -->
                  <div class="p-6 pb-4">
                    <div class="flex items-start justify-between">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
                          {{ exp.username.charAt(0).toUpperCase() }}
                        </div>
                        <div>
                          <p class="font-semibold text-gray-900">{{ exp.username }}</p>
                          <p class="text-sm text-gray-500 flex items-center gap-1">
                            <i class="fas fa-clock text-xs"></i>
                            {{ dayjs(exp.createdAt).fromNow() }}
                          </p>
                        </div>
                      </div>
                      
                      <!-- Actions untuk pemilik postingan -->
                      <div v-if="exp.user_id === user.id" class="relative">
                        <button 
                          @click="togglePostMenu(exp.id)"
                          class="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <i class="fas fa-ellipsis-h"></i>
                        </button>
                        
                        <div v-if="activePostMenu === exp.id" 
                            class="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10 min-w-[120px]">
                          <button 
                            @click="startEditExperience(exp)" 
                            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-2"
                          >
                            <i class="fas fa-edit"></i> Edit
                          </button>
                          <button 
                            @click="deleteExperience(exp.id)" 
                            class="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-2"
                          >
                            <i class="fas fa-trash"></i> Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Konten Postingan -->
                  <div class="px-6 pb-4">
                    <p class="text-gray-700 leading-relaxed">{{ exp.story }}</p>
                  </div>

                  <!-- Foto jika ada -->
                  <div v-if="exp.photo" class="px-6 pb-4">
                    <img :src="exp.photo" class="w-full h-64 object-cover rounded-xl" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-16">
              <div class="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <i class="fas fa-seedling text-green-600 text-3xl"></i>
              </div>
              <h3 class="text-xl font-semibold text-gray-800 mb-3">Mulai Percakapan Pertama</h3>
              <p class="text-gray-600 max-w-md mx-auto">Belum ada yang berbagi pengalaman. Jadilah yang pertama membagikan cerita berkebun Anda dan menginspirasi yang lain!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { router, Link, usePage } from '@inertiajs/vue3'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/id'

dayjs.extend(relativeTime)
dayjs.locale('id') // Gunakan locale Bahasa Indonesia

defineOptions({
  name: 'Guides'
})

const page = usePage()
const user = page.props.user || {}

const isMenuOpen = ref(false)
const activeTab = ref('infographic')
const expandedFaqs = ref([])
const activePostMenu = ref(null)

const tabs = [
  { id: 'infographic', label: 'Infografis' },
  { id: 'video', label: 'Video' },
  { id: 'faq', label: 'FAQ' },
  { id: 'community', label: 'Komunitas' }
]

const newExperience = ref({
  story: '',
  photo: null,
  photoFile: null
})

const editId = ref(null)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const togglePostMenu = (postId) => {
  activePostMenu.value = activePostMenu.value === postId ? null : postId
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

const removePhoto = () => {
  newExperience.value.photo = null
  newExperience.value.photoFile = null
}

const cancelEdit = () => {
  editId.value = null
  newExperience.value = { story: '', photo: null, photoFile: null }
}

const addExperience = () => {
  const form = new FormData()
  form.append('story', newExperience.value.story)
  if (newExperience.value.photoFile) {
    form.append('photo', newExperience.value.photoFile)
  }

  if (editId.value) {
    form.append('_method', 'PUT')
    
    router.put(`/guides/${editId.value}`, form, {
      forceFormData: true,
      onSuccess: () => {
        cancelEdit()
      },
      onError: (errors) => {
        console.error('Error updating experience:', errors)
        router.post(`/guides/${editId.value}/edit`, form, {
          forceFormData: true,
          onSuccess: () => {
            cancelEdit()
          },
          onError: (fallbackErrors) => {
            console.error('Fallback edit also failed:', fallbackErrors)
            alert('Gagal mengupdate pengalaman. Silakan coba lagi.')
          }
        })
      }
    })
  } else {
    router.post('/guides', form, {
      forceFormData: true,
      onSuccess: () => {
        newExperience.value = { story: '', photo: null, photoFile: null }
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
        activePostMenu.value = null
      }
    })
  }
}

const startEditExperience = (exp) => {
  newExperience.value = {
    story: exp.story,
    photo: exp.photo,
    photoFile: null
  }
  editId.value = exp.id
  activePostMenu.value = null
  
  // Scroll to form
  document.querySelector('form').scrollIntoView({ behavior: 'smooth', block: 'center' })
}

import { ref, onMounted, computed } from 'vue'
import { Link } from '@inertiajs/vue3'

// State
const loading = ref(true)
const error = ref(null)
const guides = ref([])

// Computed properties
const infografis = computed(() => 
  guides.value.filter(guide => guide.tipe === 'infografis')
)

const videos = computed(() => 
  guides.value.filter(guide => guide.tipe === 'video')
)

const faqs = computed(() => 
  guides.value.filter(guide => guide.tipe === 'faq')
)

// Methods
const fetchGuides = async () => {
  try {
    loading.value = true
    error.value = null
    
    const response = await fetch('/api/guides')
    if (!response.ok) {
      throw new Error('Gagal memuat data panduan')
    }
    
    guides.value = await response.json()
  } catch (err) {
    error.value = err.message
    console.error('Error fetching guides:', err)
  } finally {
    loading.value = false
  }
}

const setActiveTab = (tabId) => {
  activeTab.value = tabId
  expandedFaqs.value = [] // Reset expanded FAQs when switching tabs
}

const getEmbedUrl = (url) => {
  // Convert YouTube URLs to embed format
  if (url.includes('youtube.com/watch?v=')) {
    const videoId = url.split('v=')[1].split('&')[0]
    return `https://www.youtube.com/embed/${videoId}`
  } else if (url.includes('youtu.be/')) {
    const videoId = url.split('youtu.be/')[1].split('?')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }
  
  // Return original URL if it's already an embed URL or different platform
  return url
}

const logout = () => {
  router.get('/logout')
}
// Lifecycle
onMounted(() => {
  fetchGuides()
})

</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>