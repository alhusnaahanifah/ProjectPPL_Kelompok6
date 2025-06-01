<template>
  <div class="min-h-screen flex bg-gradient-to-br from-green-50 via-white to-green-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-gradient-to-b from-[#2f3828] to-[#1a2014] text-white shadow-2xl fixed h-full overflow-y-auto">
      <!-- Logo Section -->
      <div class="p-6 border-b border-white/20">
        <div class="flex items-center space-x-3">
          <div>
            <img src="../../image/plogo-samping.png" alt="Logo Project" class="w-40 h-auto">
            <p class="text-green-200 text-sm pl-12">Admin Panel</p>
          </div>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="mt-6 px-4">
        <ul class="space-y-2">
          <li>
            <Link href="/DashboardAdmin"
              :class="getSidebarItemClass('/admin/dashboard')">
              <i class="fas fa-tachometer-alt w-5"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/users"
              :class="getSidebarItemClass('/admin/users')">
              <i class="fas fa-users w-5"></i>
              <span>Kelola Pengguna</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/plants"
              :class="getSidebarItemClass('/admin/plants')">
              <i class="fas fa-seedling w-5"></i>
              <span>Kelola Tanaman</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/panduan"
              :class="getSidebarItemClass('/admin/panduan')">
              <i class="fas fa-book-open w-5"></i>
              <span>Kelola Panduan</span>
            </Link>
          </li>
          <li>
            <Link href="/admin/quiz"
              :class="getSidebarItemClass('/admin/quiz')">
              <i class="fas fa-question-circle w-5"></i>
              <span>Kelola Quiz</span>
            </Link>
          </li>
        </ul>
      </nav>

      <!-- Admin Profile Section -->
      <div class="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
        <div class="flex items-center space-x-3 mb-4">
          <div class="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <i class="fas fa-user-shield text-white"></i>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-white truncate">{{ user.fullName }}</p>
            <p class="text-xs text-green-200 truncate">{{ user.email }}</p>
          </div>
        </div>
        <button
          @click="logout"
          class="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
        >
          <i class="fas fa-sign-out-alt"></i>
          <span>Keluar</span> 
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-auto ml-64">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">Kelola Panduan</h1>
            <p class="text-gray-600 mt-1">Kelola infografis, video, FAQ, dan pengalaman komunitas</p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Notification Bell -->
            <button class="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
              <i class="fas fa-bell text-lg"></i>
              <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <!-- Date -->
            <div class="flex items-center space-x-2 text-sm text-gray-600">
              <i class="fas fa-calendar-alt"></i>
              <span>{{ getCurrentDate() }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div class="p-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <i class="fas fa-image text-blue-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Infografis</p>
                <p class="text-2xl font-bold text-gray-900">{{ infographics.length }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-red-100 rounded-lg">
                <i class="fas fa-video text-red-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Video</p>
                <p class="text-2xl font-bold text-gray-900">{{ videos.length }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <i class="fas fa-question-circle text-green-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total FAQ</p>
                <p class="text-2xl font-bold text-gray-900">{{ faqs.length }}</p>
              </div>
            </div>
          </div>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <i class="fas fa-comments text-purple-600 text-xl"></i>
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Pengalaman Komunitas</p>
                <p class="text-2xl font-bold text-gray-900">{{ experiences.length }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div class="border-b border-gray-200">
            <nav class="flex space-x-8 px-6" aria-label="Tabs">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="[
                  'py-4 px-1 border-b-2 font-medium text-sm',
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                <i :class="tab.icon" class="mr-2"></i>
                {{ tab.label }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Tab Content -->
        <div class="space-y-6">
          <!-- Infografis Tab -->
          <div v-if="activeTab === 'infographic'">
            <!-- Add New Infographic Button -->
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-medium text-gray-900">Kelola Infografis</h3>
              <button
                @click="showAddInfographicModal = true"
                class="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <i class="fas fa-plus mr-2"></i>
                Tambah Infografis
              </button>
            </div>

            <!-- Infographics Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-if="infographics.length === 0" class="col-span-full">
                <div class="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <i class="fas fa-image text-4xl text-gray-300 mb-4"></i>
                  <p class="text-gray-500 font-medium">Belum ada infografis</p>
                  <p class="text-sm text-gray-400 mt-1">Tambahkan infografis pertama untuk komunitas</p>
                </div>
              </div>

              <div v-for="item in infographics" :key="item.id" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div class="relative">
                  <img 
                    :src="item.link" 
                    :alt="item.title"
                    class="w-full h-48 object-cover"
                    @error="handleImageError"
                  />
                  <div class="absolute top-2 right-2 flex space-x-2">
                    <button
                      @click="editInfographic(item)"
                      class="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <i class="fas fa-edit text-sm"></i>
                    </button>
                    <button
                      @click="confirmDeleteInfographic(item)"
                      class="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <i class="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <h4 class="font-semibold text-gray-900 mb-2">{{ item.title }}</h4>
                  <p class="text-sm text-gray-600 line-clamp-2">{{ item.deskripsi }}</p>
                  <div class="mt-3 flex items-center justify-between text-xs text-gray-500">
                    <span>{{ formatDate(item.createdAt) }}</span>
                    <span class="flex items-center">
                      <i class="fas fa-eye mr-1"></i>
                      Publik
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Video Tab -->
          <div v-if="activeTab === 'video'">
            <!-- Add New Video Button -->
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-medium text-gray-900">Kelola Video</h3>
              <button
                @click="showAddVideoModal = true"
                class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <i class="fas fa-plus mr-2"></i>
                Tambah Video
              </button>
            </div>

            <!-- Videos Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-if="videos.length === 0" class="col-span-full">
                <div class="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <i class="fas fa-video text-4xl text-gray-300 mb-4"></i>
                  <p class="text-gray-500 font-medium">Belum ada video</p>
                  <p class="text-sm text-gray-400 mt-1">Tambahkan video tutorial untuk komunitas</p>
                </div>
              </div>

              <div v-for="video in videos" :key="video.id" class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div class="relative">
                  <iframe 
                    :src="getEmbedUrl(video.link)"
                    class="w-full h-48"
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                  <div class="absolute top-2 right-2 flex space-x-2">
                    <button
                      @click="editVideo(video)"
                      class="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <i class="fas fa-edit text-sm"></i>
                    </button>
                    <button
                      @click="confirmDeleteVideo(video)"
                      class="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <i class="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                </div>
                <div class="p-4">
                  <h4 class="font-semibold text-gray-900 mb-2">{{ video.title }}</h4>
                  <div class="flex items-center justify-between text-sm text-gray-600">
                    <span class="flex items-center">
                      <i class="fas fa-clock mr-1"></i>
                      {{ video.durasi }}
                    </span>
                    <span>{{ formatDate(video.createdAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Tab -->
          <div v-if="activeTab === 'faq'">
            <!-- Add New FAQ Button -->
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-medium text-gray-900">Kelola FAQ</h3>
              <button
                @click="showAddFaqModal = true"
                class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
              >
                <i class="fas fa-plus mr-2"></i>
                Tambah FAQ
              </button>
            </div>

            <!-- FAQ List -->
            <div class="space-y-4">
              <div v-if="faqs.length === 0">
                <div class="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <i class="fas fa-question-circle text-4xl text-gray-300 mb-4"></i>
                  <p class="text-gray-500 font-medium">Belum ada FAQ</p>
                  <p class="text-sm text-gray-400 mt-1">Tambahkan pertanyaan yang sering diajukan</p>
                </div>
              </div>

              <div v-for="faq in faqs" :key="faq.id" class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6">
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <h4 class="font-semibold text-gray-900 mb-2">{{ faq.pertanyaan }}</h4>
                      <p class="text-gray-600 text-sm">{{ faq.jawaban }}</p>
                      <div class="mt-3 text-xs text-gray-500">
                        Dibuat: {{ formatDate(faq.createdAt) }}
                      </div>
                    </div>
                    <div class="flex space-x-2 ml-4">
                      <button
                        @click="editFaq(faq)"
                        class="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <i class="fas fa-edit text-sm"></i>
                      </button>
                      <button
                        @click="confirmDeleteFaq(faq)"
                        class="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                      >
                        <i class="fas fa-trash text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Community Experiences Tab -->
          <div v-if="activeTab === 'community'">
            <div class="flex justify-between items-center mb-6">
              <h3 class="text-lg font-medium text-gray-900">Pengalaman Komunitas</h3>
              <div class="text-sm text-gray-500">
                Total: {{ experiences.length }} pengalaman
              </div>
            </div>

            <!-- Experiences List -->
            <div class="space-y-6">
              <div v-if="experiences.length === 0">
                <div class="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <i class="fas fa-comments text-4xl text-gray-300 mb-4"></i>
                  <p class="text-gray-500 font-medium">Belum ada pengalaman yang dibagikan</p>
                  <p class="text-sm text-gray-400 mt-1">Pengguna akan dapat berbagi pengalaman mereka di sini</p>
                </div>
              </div>

              <div v-for="exp in experiences" :key="exp.id" class="bg-white rounded-lg shadow-sm border border-gray-200">
                <div class="p-6">
                  <div class="flex items-start justify-between">
                    <div class="flex items-center space-x-3">
                      <div class="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {{ exp.username.charAt(0).toUpperCase() }}
                      </div>
                      <div>
                        <p class="font-semibold text-gray-900">{{ exp.username }}</p>
                        <p class="text-sm text-gray-500">{{ formatDate(exp.createdAt) }}</p>
                      </div>
                    </div>
                    <button
                      @click="confirmDeleteExperience(exp)"
                      class="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                      <i class="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                  
                  <div class="mt-4">
                    <p class="text-gray-700">{{ exp.story }}</p>
                    <div v-if="exp.photo" class="mt-4">
                      <img :src="exp.photo" class="w-full max-w-md h-48 object-cover rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Add Infographic Modal -->
    <div v-if="showAddInfographicModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingInfographic ? 'Edit Infografis' : 'Tambah Infografis' }}
          </h3>
          <form @submit.prevent="saveInfographic">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Judul</label>
              <input
                v-model="infographicForm.title"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Deskripsi</label>
              <textarea
                v-model="infographicForm.deskripsi"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              ></textarea>
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">URL Gambar</label>
              <input
                v-model="infographicForm.link"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div class="flex items-center justify-end gap-4">
              <button
                type="button"
                @click="closeInfographicModal"
                class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-green-600 text-white text-base font-medium rounded-md hover:bg-green-700"
              >
                {{ editingInfographic ? 'Update' : 'Simpan' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add Video Modal -->
    <div v-if="showAddVideoModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingVideo ? 'Edit Video' : 'Tambah Video' }}
          </h3>
          <form @submit.prevent="saveVideo">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Judul</label>
              <input
                v-model="videoForm.title"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">URL Video (YouTube)</label>
              <input
                v-model="videoForm.link"
                type="url"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Durasi</label>
              <input
                v-model="videoForm.durasi"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="5 menit"
                required
              />
            </div>
            <div class="flex items-center justify-end gap-4">
              <button
                type="button"
                @click="closeVideoModal"
                class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md hover:bg-red-700"
              >
                {{ editingVideo ? 'Update' : 'Simpan' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Add FAQ Modal -->
    <div v-if="showAddFaqModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3">
          <h3 class="text-lg font-medium text-gray-900 mb-4">
            {{ editingFaq ? 'Edit FAQ' : 'Tambah FAQ' }}
          </h3>
          <form @submit.prevent="saveFaq">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Pertanyaan</label>
              <input
                v-model="faqForm.pertanyaan"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-2">Jawaban</label>
              <textarea
                v-model="faqForm.jawaban"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <div class="flex items-center justify-end gap-4">
              <button
                type="button"
                @click="closeFaqModal"
                class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                type="submit"
                class="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md hover:bg-blue-700"
              >
                {{ editingFaq ? 'Update' : 'Simpan' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div class="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div class="mt-3 text-center">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <i class="fas fa-exclamation-triangle text-red-600 text-xl"></i>
          </div>
          <h3 class="text-lg font-medium text-gray-900 mt-4">Konfirmasi Hapus</h3>
          <div class="mt-2 px-7 py-3">
            <p class="text-sm text-gray-500">
              Apakah Anda yakin ingin menghapus item ini? 
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
          <div class="flex items-center justify-center gap-4 mt-4">
            <button
              @click="showDeleteModal = false"
              class="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md hover:bg-gray-400"
            >
              Batal
            </button>
            <button
              @click="confirmDelete"
              class="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md hover:bg-red-700"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue'
import { Link, usePage, router } from '@inertiajs/vue3'

// Types
interface User {
  id: number
  fullName: string
  email: string
}

interface Infographic {
  id: number
  title: string
  deskripsi: string
  link: string
  createdAt: string
}

interface Video {
  id: number
  title: string
  link: string
  durasi: string
  createdAt: string
}

interface FAQ {
  id: number
  pertanyaan: string
  jawaban: string
  createdAt: string
}

interface Experience {
  id: number
  username: string
  story: string
  photo?: string
  createdAt: string
}

interface Tab {
  id: string
  label: string
  icon: string
}

// Props (from Inertia) - Make arrays optional
interface Props {
  user: User
  infographics?: Infographic[]
  videos?: Video[]
  faqs?: FAQ[]
  experiences?: Experience[]
}

const props = defineProps<Props>()

// Reactive state
const activeTab = ref('infographic')
const showAddInfographicModal = ref(false)
const showAddVideoModal = ref(false)
const showAddFaqModal = ref(false)
const showDeleteModal = ref(false)

// Editing states
const editingInfographic = ref<Infographic | null>(null)
const editingVideo = ref<Video | null>(null)
const editingFaq = ref<FAQ | null>(null)
const itemToDelete = ref<any>(null)
const deleteType = ref('')

// Data arrays - Initialize with props data (with proper null checks)
const infographics = ref<Infographic[]>(props.infographics ? [...props.infographics] : [])
const videos = ref<Video[]>(props.videos ? [...props.videos] : [])
const faqs = ref<FAQ[]>(props.faqs ? [...props.faqs] : [])
const experiences = ref<Experience[]>(props.experiences ? [...props.experiences] : [])

// Form states
const infographicForm = reactive({
  title: '',
  deskripsi: '',
  link: ''
})

const videoForm = reactive({
  title: '',
  link: '',
  durasi: ''
})

const faqForm = reactive({
  pertanyaan: '',
  jawaban: ''
})

// Tab configuration
const tabs: Tab[] = [
  { id: 'infographic', label: 'Infografis', icon: 'fas fa-image' },
  { id: 'video', label: 'Video', icon: 'fas fa-video' },
  { id: 'faq', label: 'FAQ', icon: 'fas fa-question-circle' },
  { id: 'community', label: 'Pengalaman Komunitas', icon: 'fas fa-comments' }
]

// Computed properties
const user = computed(() => props.user)

// Watch for props changes and update local data
watch(() => props.infographics, (newVal) => {
  if (newVal && Array.isArray(newVal)) {
    infographics.value = [...newVal]
  }
}, { deep: true })

watch(() => props.videos, (newVal) => {
  if (newVal && Array.isArray(newVal)) {
    videos.value = [...newVal]
  }
}, { deep: true })

watch(() => props.faqs, (newVal) => {
  if (newVal && Array.isArray(newVal)) {
    faqs.value = [...newVal]
  }
}, { deep: true })

watch(() => props.experiences, (newVal) => {
  if (newVal && Array.isArray(newVal)) {
    experiences.value = [...newVal]
  }
}, { deep: true })

// Methods
const getSidebarItemClass = (path: string) => {
  const currentPath = usePage().url
  const isActive = currentPath === path || currentPath.startsWith(path + '/')
  
  return [
    'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
    isActive
      ? 'bg-green-500/20 text-green-300 border-l-4 border-green-400'
      : 'text-gray-300 hover:bg-white/10 hover:text-white'
  ]
}

const getCurrentDate = () => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Infographic methods
const resetInfographicForm = () => {
  infographicForm.title = ''
  infographicForm.deskripsi = ''
  infographicForm.link = ''
}

const editInfographic = (item: Infographic) => {
  editingInfographic.value = item
  infographicForm.title = item.title
  infographicForm.deskripsi = item.deskripsi
  infographicForm.link = item.link
  showAddInfographicModal.value = true
}

const closeInfographicModal = () => {
  showAddInfographicModal.value = false
  editingInfographic.value = null
  resetInfographicForm()
}

const confirmDeleteInfographic = (item: Infographic) => {
  itemToDelete.value = item
  deleteType.value = 'infographic'
  showDeleteModal.value = true
}

// Video methods
const resetVideoForm = () => {
  videoForm.title = ''
  videoForm.link = ''
  videoForm.durasi = ''
}

const editVideo = (item: Video) => {
  editingVideo.value = item
  videoForm.title = item.title
  videoForm.link = item.link
  videoForm.durasi = item.durasi
  showAddVideoModal.value = true
}

// Updated Video methods that stay on current tab
const saveVideo = async () => {
  try {
    const formData = { ...videoForm }
    
    if (editingVideo.value) {
      const videoId = editingVideo.value.id // Store ID to avoid null issues
      
      // Update existing video
      await router.put(`/admin/panduan/videos/${videoId}`, formData, {
        preserveState: true, // Keep current state
        preserveScroll: true,
        onSuccess: (page) => {
          // Update local state directly
          const idx = videos.value.findIndex(video => video.id === videoId)
          if (idx !== -1) {
            videos.value[idx] = {
              ...videos.value[idx],
              title: formData.title,
              link: formData.link,
              durasi: formData.durasi
            }
          }
          closeVideoModal()
          // Tab stays the same because we use preserveState: true
        },
        onError: (errors) => {
          console.error('Error updating video:', errors)
          alert('Gagal mengupdate video. Silakan coba lagi.')
        }
      })
    } else {
      // Create new video
      await router.post('/admin/panduan/videos', formData, {
        preserveState: true, // Keep current state
        preserveScroll: true,
        onSuccess: (page) => {
          // Add new video to local state
          const newVideo = Array.isArray(page.props.videos) ? page.props.videos.slice(-1)[0] : null
          if (newVideo && !videos.value.some(v => v.id === newVideo.id)) {
            videos.value.push(newVideo)
          }
          closeVideoModal()
          // Tab stays the same because we use preserveState: true
        },
        onError: (errors) => {
          console.error('Error creating video:', errors)
          alert('Gagal membuat video. Silakan coba lagi.')
        }
      })
    }
  } catch (error) {
    console.error('Error saving video:', error)
  }
}

const confirmDelete = async () => {
  try {
    const item = itemToDelete.value
    const type = deleteType.value
    
    switch (type) {
      case 'infographic':
        await router.delete(`/admin/panduan/infographics/${item.id}`, {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            // Remove from local state
            infographics.value = infographics.value.filter(infographic => infographic.id !== item.id)
            
            showDeleteModal.value = false
            itemToDelete.value = null
            deleteType.value = ''
          },
          onError: (errors) => {
            console.error('Error deleting infographic:', errors)
            alert('Gagal menghapus infografis. Silakan coba lagi.')
          }
        })
        break
        
      case 'video':
        await router.delete(`/admin/panduan/videos/${item.id}`, {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            // Remove from local state
            videos.value = videos.value.filter(video => video.id !== item.id)
            
            showDeleteModal.value = false
            itemToDelete.value = null
            deleteType.value = ''
          },
          onError: (errors) => {
            console.error('Error deleting video:', errors)
            alert('Gagal menghapus video. Silakan coba lagi.')
          }
        })
        break
        
      case 'faq':
        await router.delete(`/admin/panduan/faqs/${item.id}`, {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            // Remove from local state
            faqs.value = faqs.value.filter(faq => faq.id !== item.id)
            
            showDeleteModal.value = false
            itemToDelete.value = null
            deleteType.value = ''
          },
          onError: (errors) => {
            console.error('Error deleting FAQ:', errors)
            alert('Gagal menghapus FAQ. Silakan coba lagi.')
          }
        })
        break
        
      case 'experience':
        await router.delete(`/admin/panduan/experiences/${item.id}`, {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            // Remove from local state
            experiences.value = experiences.value.filter(experience => experience.id !== item.id)
            
            showDeleteModal.value = false
            itemToDelete.value = null
            deleteType.value = ''
          },
          onError: (errors) => {
            console.error('Error deleting experience:', errors)
            alert('Gagal menghapus pengalaman. Silakan coba lagi.')
          }
        })
        break
        
      default:
        console.error('Unknown delete type:', type)
        alert('Tipe penghapusan tidak dikenali.')
    }
  } catch (error) {
    console.error('Error deleting item:', error)
    alert('Terjadi kesalahan saat menghapus item.')
  }
}

// Apply the same pattern to infographic methods
const saveInfographic = async () => {
  try {
    const formData = { ...infographicForm }
    
    if (editingInfographic.value) {
      const infographicId = editingInfographic.value.id // Store ID to avoid null issues
      
      // Update existing infographic
      await router.put(`/admin/panduan/infographics/${infographicId}`, formData, {
        preserveState: true, // Keep current state
        preserveScroll: true,
        onSuccess: () => {
          // Update local state directly
          const idx = infographics.value.findIndex(item => item.id === infographicId)
          if (idx !== -1) {
            infographics.value[idx] = {
              ...infographics.value[idx],
              title: formData.title,
              deskripsi: formData.deskripsi,
              link: formData.link
            }
          }
          closeInfographicModal()
        },
        onError: (errors) => {
          console.error('Error updating infographic:', errors)
          alert('Gagal mengupdate infografis. Silakan coba lagi.')
        }
      })
    } else {
      // Create new infographic
      await router.post('/admin/panduan/infographics', formData, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: (page) => {
          const newInfographic = Array.isArray(page.props.infographics) ? page.props.infographics.slice(-1)[0] : null
          if (newInfographic) {
            infographics.value.push(newInfographic)
          }
          closeInfographicModal()
        },
        onError: (errors) => {
          console.error('Error creating infographic:', errors)
          alert('Gagal membuat infografis. Silakan coba lagi.')
        }
      })
    }
  } catch (error) {
    console.error('Error saving infographic:', error)
  }
}

// Apply the same pattern to FAQ methods
const saveFaq = async () => {
  try {
    const formData = { ...faqForm }
    
    if (editingFaq.value) {
      const faqId = editingFaq.value.id // Store ID to avoid null issues
      
      // Update existing FAQ
      await router.put(`/admin/panduan/faqs/${faqId}`, formData, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
          const idx = faqs.value.findIndex(item => item.id === faqId)
          if (idx !== -1) {
            faqs.value[idx] = {
              ...faqs.value[idx],
              pertanyaan: formData.pertanyaan,
              jawaban: formData.jawaban
            }
          }
          closeFaqModal()
        },
        onError: (errors) => {
          console.error('Error updating FAQ:', errors)
          alert('Gagal mengupdate FAQ. Silakan coba lagi.')
        }
      })
    } else {
      // Create new FAQ
      await router.post('/admin/panduan/faqs', formData, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: (page) => {
          const newFaq = Array.isArray(page.props.faqs) ? page.props.faqs.slice(-1)[0] : null
          if (newFaq) {
            faqs.value.push(newFaq)
          }
          closeFaqModal()
        },
        onError: (errors) => {
          console.error('Error creating FAQ:', errors)
          alert('Gagal membuat FAQ. Silakan coba lagi.')
        }
      })
    }
  } catch (error) {
    console.error('Error saving FAQ:', error)
  }
}

const closeVideoModal = () => {
  showAddVideoModal.value = false
  editingVideo.value = null
  resetVideoForm()
}

const confirmDeleteVideo = (item: Video) => {
  itemToDelete.value = item
  deleteType.value = 'video'
  showDeleteModal.value = true
}

const getEmbedUrl = (url: string) => {
  // Convert YouTube URL to embed format
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
  return videoId ? `https://www.youtube.com/embed/${videoId[1]}` : url
}

// FAQ methods
const resetFaqForm = () => {
  faqForm.pertanyaan = ''
  faqForm.jawaban = ''
}

const editFaq = (item: FAQ) => {
  editingFaq.value = item
  faqForm.pertanyaan = item.pertanyaan
  faqForm.jawaban = item.jawaban
  showAddFaqModal.value = true
}

const closeFaqModal = () => {
  showAddFaqModal.value = false
  editingFaq.value = null
  resetFaqForm()
}

const confirmDeleteFaq = (item: FAQ) => {
  itemToDelete.value = item
  deleteType.value = 'faq'
  showDeleteModal.value = true
}

// Experience methods
const confirmDeleteExperience = (item: Experience) => {
  itemToDelete.value = item
  deleteType.value = 'experience'
  showDeleteModal.value = true
}

// Utility methods
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/images/placeholder-image.jpg' // Fallback image
}

// Initialize data on component mount
onMounted(() => {
  // Initialize local data with props data (with proper null checks)
  if (props.infographics && Array.isArray(props.infographics)) {
    infographics.value = [...props.infographics]
  }
  if (props.videos && Array.isArray(props.videos)) {
    videos.value = [...props.videos]
  }
  if (props.faqs && Array.isArray(props.faqs)) {
    faqs.value = [...props.faqs]
  }
  if (props.experiences && Array.isArray(props.experiences)) {
    experiences.value = [...props.experiences]
  }
})
const logout = () => {
  router.get('/logout')
}
</script>