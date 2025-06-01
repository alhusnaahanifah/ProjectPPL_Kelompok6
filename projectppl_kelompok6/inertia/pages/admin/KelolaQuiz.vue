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
              :class="getSidebarItemClass('/DashboardAdmin')">
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
      <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-white/20">
        <div class="flex items-center space-x-3 mb-3">
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
          class="w-60 flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
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
            <h1 class="text-2xl font-bold text-gray-800">Kelola Quiz</h1>
            <p class="text-gray-600 mt-1">Kelola pertanyan dan jawaban tanaman hidroponik HidroGrow</p>
          </div>
          <div class="flex items-center space-x-4">
            <!-- Add Question Button -->
            <button
              @click="openAddModal"
              class="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <i class="fas fa-plus"></i>
              <span>Tambah Pertanyaan</span>
            </button>
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
      <div class="p-6 space-y-6">
        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Total Pertanyaan</p>
                <p class="text-2xl font-bold text-gray-800">{{ pertanyaan.length }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-question-circle text-blue-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Data Tanaman</p>
                <p class="text-2xl font-bold text-gray-800">{{ jawaban.length }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-seedling text-green-600 text-xl"></i>
              </div>
            </div>
          </div>
          <div class="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-gray-600 text-sm">Kelengkapan Data</p>
                <p class="text-2xl font-bold text-gray-800">{{ getCompletionPercentage }}%</p>
              </div>
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i class="fas fa-chart-line text-purple-600 text-xl"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Manajemen Pertanyaan -->
        <section class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4 text-white">
            <h2 class="text-xl font-semibold flex items-center">
              <i class="fas fa-question-circle mr-3"></i>
              Manajemen Pertanyaan
            </h2>
          </div>
          
          <div class="p-6 space-y-6">
            <!-- Form Tambah Pertanyaan -->
            <div class="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 border border-gray-200">
              <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-plus-circle text-blue-500 mr-2"></i>
                Tambah Pertanyaan Baru
              </h3>
              <form @submit.prevent="submitPertanyaan" class="flex gap-3">
                <input
                  v-model="newPertanyaan"
                  type="text"
                  class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Contoh: Apakah tanaman ini memiliki bunga?"
                  required
                />
                <button 
                  type="submit" 
                  class="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md"
                >
                  <i class="fas fa-save mr-2"></i>
                  Simpan
                </button>
              </form>
            </div>

            <!-- Daftar Pertanyaan -->
            <div>
              <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <i class="fas fa-list text-gray-600 mr-2"></i>
                Daftar Pertanyaan ({{ pertanyaan.length }})
              </h3>
              
              <div v-if="pertanyaan.length === 0" class="text-center py-12 text-gray-500">
                <i class="fas fa-question-circle text-4xl text-gray-300 mb-4"></i>
                <p class="text-lg">Belum ada pertanyaan</p>
                <p class="text-sm">Tambahkan pertanyaan pertama Anda!</p>
              </div>

              <div v-else class="space-y-3">
                <div
                  v-for="(q, index) in pertanyaan"
                  :key="q.id"
                  class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <!-- Mode Edit -->
                  <div v-if="editingId === q.id" class="flex items-center gap-3">
                    <span class="text-sm font-medium text-gray-500 min-w-0 flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                      {{ index + 1 }}
                    </span>
                    <input 
                      v-model="editText" 
                      class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                    <div class="flex gap-2">
                      <button 
                        @click="updatePertanyaan(q.id)" 
                        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm transition-all"
                      >
                        <i class="fas fa-check mr-1"></i>
                        Simpan
                      </button>
                      <button 
                        @click="cancelEdit" 
                        class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 text-sm transition-all"
                      >
                        <i class="fas fa-times mr-1"></i>
                        Batal
                      </button>
                    </div>
                  </div>

                  <!-- Mode View -->
                  <div v-else class="flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <span class="text-sm font-medium text-white bg-blue-500 w-8 h-8 rounded-full flex items-center justify-center">
                        {{ index + 1 }}
                      </span>
                      <span class="text-gray-900 font-medium">{{ q.text }}</span>
                    </div>
                    <div class="flex gap-2">
                      <button 
                        @click="startEdit(q.id, q.text)" 
                        class="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded-md hover:bg-blue-50 transition-all"
                      >
                        <i class="fas fa-edit mr-1"></i>
                        Edit
                      </button>
                      <button 
                        @click="deletePertanyaan(q.id)" 
                        class="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded-md hover:bg-red-50 transition-all"
                      >
                        <i class="fas fa-trash mr-1"></i>
                        Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Section: Pencarian & Edit Tanaman -->
        <section class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 text-white">
            <h2 class="text-xl font-semibold flex items-center">
              <i class="fas fa-search mr-3"></i>
              Pencarian & Edit Tanaman
            </h2>
          </div>
          
          <div class="p-6">
            <div class="flex gap-3 mb-6">
              <div class="flex-1 relative">
                <input 
                  v-model="searchTumbuhan" 
                  placeholder="Masukkan nama tumbuhan..." 
                  class="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  @keyup.enter="cariJawaban"
                />
                <i class="fas fa-search absolute left-3 top-3.5 text-gray-400"></i>
              </div>
              <button 
                @click="cariJawaban" 
                class="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-medium shadow-md"
              >
                <i class="fas fa-search mr-2"></i>
                Cari
              </button>
            </div>

            <!-- Hasil Pencarian & Edit -->
            <div v-if="hasilJawaban" class="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl overflow-hidden shadow-sm">
              <!-- Header Hasil -->
              <div class="bg-gradient-to-r from-green-100 to-blue-100 px-6 py-4 flex justify-between items-center border-b border-green-200">
                <h3 class="font-bold text-green-900 text-lg flex items-center">
                  <i class="fas fa-seedling mr-2"></i>
                  {{ hasilJawaban.tumbuhan }}
                </h3>
                <div class="flex gap-2">
                  <button 
                    v-if="!isEditingSearch"
                    @click="startEditSearch" 
                    class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-sm transition-all shadow-sm"
                  >
                    <i class="fas fa-edit mr-1"></i>
                    Edit Data
                  </button>
                  <button 
                    @click="clearSearch" 
                    class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 font-medium text-sm transition-all shadow-sm"
                  >
                    <i class="fas fa-times mr-1"></i>
                    Tutup
                  </button>
                </div>
              </div>

              <div class="p-6">
                <!-- Mode View -->
                <div v-if="!isEditingSearch">
                  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div 
                      v-for="(val, key) in hasilJawaban.answers" 
                      :key="key"
                      class="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div class="text-sm font-medium text-gray-700 mb-2">{{ key }}</div>
                      <div 
                        class="text-lg font-bold flex items-center"
                        :class="val === 'Ya' ? 'text-green-600' : 'text-red-600'"
                      >
                        <i :class="val === 'Ya' ? 'fas fa-check-circle mr-2' : 'fas fa-times-circle mr-2'"></i>
                        {{ val }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Mode Edit -->
                <div v-else class="space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div v-for="(q, qIndex) in pertanyaan" :key="q.id" class="space-y-2">
                      <label class="block text-sm font-medium text-gray-700">
                        {{ qIndex + 1 }}. {{ q.text }}
                      </label>
                      <select 
                        v-model="searchEditData[q.text]" 
                        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 transition-all"
                      >
                        <option value="">Pilih Jawaban</option>
                        <option value="Ya">Ya</option>
                        <option value="Tidak">Tidak</option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="flex gap-3 pt-4 border-t border-gray-200">
                    <button 
                      @click="submitSearchEdit" 
                      class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium transition-all shadow-md"
                    >
                      <i class="fas fa-save mr-2"></i>
                      Simpan Perubahan
                    </button>
                    <button 
                      @click="cancelSearchEdit" 
                      class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 font-medium transition-all shadow-md"
                    >
                      <i class="fas fa-times mr-2"></i>
                      Batal Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Pesan jika tidak ditemukan -->
            <div v-if="searchNotFound" class="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-6 text-center">
              <i class="fas fa-exclamation-triangle text-red-500 text-3xl mb-3"></i>
              <p class="text-red-700 font-semibold text-lg">
                Tanaman <strong>"{{ searchTumbuhan }}"</strong> tidak ditemukan
              </p>
              <p class="text-sm text-red-600 mt-2">
                Pastikan nama tanaman sudah benar atau tambahkan data tanaman baru di bawah
              </p>
            </div>
          </div>
        </section>

        <!-- Section: Tambah Jawaban -->
        <section class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4 text-white">
            <h2 class="text-xl font-semibold flex items-center">
              <i class="fas fa-plus-square mr-3"></i>
              Tambah Jawaban Tanaman
            </h2>
          </div>
          
          <div class="p-6">
            <form @submit.prevent="submitJawaban" class="space-y-6">
              <!-- Input Nama Tumbuhan -->
              <div class="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                <label class="block text-sm font-semibold text-gray-800 mb-3 flex items-center">
                  <i class="fas fa-seedling text-purple-600 mr-2"></i>
                  Nama Tumbuhan
                </label>
                <input
                  v-model="jawabanForm.Tumbuhan"
                  type="text"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="Contoh: Mawar, Melati, Bayam"
                  required
                />
              </div>

              <!-- Jawaban untuk setiap pertanyaan -->
              <div v-if="pertanyaan.length > 0">
                <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <i class="fas fa-clipboard-list text-purple-600 mr-2"></i>
                  Karakteristik Tanaman
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div v-for="(q, index) in pertanyaan" :key="q.id" class="space-y-3">
                    <label class="block text-sm font-medium text-gray-700 flex items-center">
                      <span class="bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                        {{ index + 1 }}
                      </span>
                      {{ q.text }}
                    </label>
                    <select 
                      v-model="jawabanForm.answers[q.text]" 
                      class="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
                      required
                    >
                      <option value="">Pilih Jawaban</option>
                      <option value="Ya">✓ Ya</option>
                      <option value="Tidak">✗ Tidak</option>
                    </select>
                  </div>
                </div>
              </div>

              <div v-else class="text-center py-12 text-gray-500">
                <i class="fas fa-info-circle text-4xl text-gray-300 mb-4"></i>
                <p class="text-lg">Tambahkan pertanyaan terlebih dahulu</p>
                <p class="text-sm">untuk dapat menambah jawaban tanaman.</p>
              </div>

              <button 
                v-if="pertanyaan.length > 0"
                type="submit" 
                class="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 px-6 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all font-semibold shadow-lg"
              >
                <i class="fas fa-save mr-2"></i>
                Simpan Jawaban Tanaman
              </button>
            </form>
          </div>
        </section>

        <!-- Section: Daftar Jawaban -->
        <section class="bg-white rounded-xl shadow-md overflow-hidden">
          <div class="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4 text-white">
            <h2 class="text-xl font-semibold flex items-center">
              <i class="fas fa-database mr-3"></i>
              Daftar Jawaban Tumbuhan ({{ jawaban.length }})
            </h2>
          </div>
          
          <div class="p-6">
            <div v-if="jawaban.length === 0" class="text-center py-12 text-gray-500">
              <i class="fas fa-seedling text-4xl text-gray-300 mb-4"></i>
              <p class="text-lg">Belum ada data tanaman</p>
              <p class="text-sm">Tambahkan tanaman pertama Anda!</p>
            </div>

            <div v-else class="space-y-4">
              <div 
                v-for="(j, index) in jawaban" 
                :key="j.id" 
                class="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <!-- Header Tanaman -->
                <div class="bg-gradient-to-r from-gray-50 to-orange-50 px-6 py-4 flex justify-between items-center border-b border-gray-200">
                  <h3 class="text-lg font-semibold text-gray-900 flex items-center">
                    <i class="fas fa-seedling text-orange-500 mr-2"></i>
                    {{ j.tumbuhan }}
                  </h3>
                  <div class="flex gap-2">
                    <button 
                      @click="startEditJawaban(j.tumbuhan)" 
                      class="text-blue-600 hover:text-blue-800 font-medium text-sm px-3 py-1 rounded-md hover:bg-blue-50 transition-all"
                    >
                      <i class="fas fa-edit mr-1"></i>
                      Edit
                    </button>
                    <button 
                      @click="deleteJawaban(j.tumbuhan)" 
                      class="text-red-600 hover:text-red-800 font-medium text-sm px-3 py-1 rounded-md hover:bg-red-50 transition-all"
                    >
                      <i class="fas fa-trash-alt mr-1"></i>
                      Hapus
                    </button>
                  </div>
                </div>

                <!-- Content -->
                <div class="p-6">
                  <!-- Mode Edit -->
                  <div v-if="editingJawaban === j.tumbuhan" class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div v-for="(q, qIndex) in pertanyaan" :key="q.id" class="space-y-2">
                        <label class="block text-sm font-medium text-gray-700 flex items-center">
                          <span class="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                            {{ qIndex + 1 }}
                          </span>
                          {{ q.text }}
                        </label>
                        <select 
                          v-model="editJawabanData[q.text]" 
                          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                          <option value="">Pilih Jawaban</option>
                          <option value="Ya">✓ Ya</option>
                          <option value="Tidak">✗ Tidak</option>
                        </select>
                      </div>
                    </div>
                    
                    <div class="flex gap-3 pt-4 border-t border-gray-200">
                      <button 
                        @click="submitEditJawaban(j.tumbuhan)" 
                        class="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium transition-all shadow-md"
                      >
                        <i class="fas fa-save mr-2"></i>
                        Simpan Perubahan
                      </button>
                      <button 
                        @click="cancelEditJawaban" 
                        class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 font-medium transition-all shadow-md"
                      >
                        <i class="fas fa-times mr-2"></i>
                        Batal
                      </button>
                    </div>
                  </div>

                  <!-- Mode View -->
                  <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div 
                      v-for="(val, key) in getAnswersOnly(j)" 
                      :key="key"
                      class="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200 hover:shadow-sm transition-shadow"
                    >
                      <div class="text-sm font-medium text-gray-700 mb-2">{{ key }}</div>
                      <div 
                        class="text-lg font-bold flex items-center"
                        :class="val === 'Ya' ? 'text-green-600' : 'text-red-600'"
                      >
                        <i :class="val === 'Ya' ? 'fas fa-check-circle mr-2' : 'fas fa-times-circle mr-2'"></i>
                        {{ val }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { Link, router, usePage } from '@inertiajs/vue3'

// ===== DATA PROPS =====
const page = usePage()
const { user, pertanyaan, jawaban } = usePage().props
const currentUrl = computed(() => page.url.value)

// Updated getSidebarItemClass method - consistent with User management
const getSidebarItemClass = (path) => {
  const page = usePage()
  const currentPath = page.url
  
  // Add null/undefined check
  if (!currentPath) {
    return [
      'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
      'text-gray-300 hover:bg-white/10 hover:text-white'
    ]
  }
  
  const isActive = currentPath === path || currentPath.startsWith(path + '/')
  
  return [
    'flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
    isActive
      ? 'bg-green-500/20 text-green-300 border-l-4 border-green-400'
      : 'text-gray-300 hover:bg-white/10 hover:text-white'
  ]
}

// ===== PERTANYAAN MANAGEMENT =====
const newPertanyaan = ref('')
const editingId = ref(null)
const editText = ref('')

// Fungsi untuk mengelola pertanyaan
const startEdit = (id, text) => {
  editingId.value = id
  editText.value = text
}

const cancelEdit = () => {
  editingId.value = null
  editText.value = ''
}

const updatePertanyaan = (id) => {
  if (!editText.value.trim()) {
    alert('Pertanyaan tidak boleh kosong!')
    return
  }
  
  router.put(`/admin/quiz/pertanyaan/${id}`, { 
    pertanyaan: editText.value.trim() 
  }, {
    preserveScroll: true,
    onSuccess: () => {
      cancelEdit()
      router.reload({ only: ['pertanyaan'] })
    },
    onError: () => {
      alert('Gagal mengupdate pertanyaan!')
    }
  })
}

const deletePertanyaan = (id) => {
  if (confirm('Yakin ingin menghapus pertanyaan ini?\nData jawaban terkait juga akan terpengaruh.')) {
    router.delete(`/admin/quiz/pertanyaan/${id}`, {
      preserveScroll: true,
      onSuccess: () => router.reload({ only: ['pertanyaan', 'jawaban'] }),
      onError: () => {
        alert('Gagal menghapus pertanyaan!')
      }
    })
  }
}

const submitPertanyaan = () => {
  if (!newPertanyaan.value.trim()) {
    alert('Pertanyaan tidak boleh kosong!')
    return
  }

  router.post('/admin/quiz/pertanyaan', { 
    pertanyaan: newPertanyaan.value.trim() 
  }, {
    preserveScroll: true,
    onSuccess: () => {
      newPertanyaan.value = ''
      router.reload({ only: ['pertanyaan'] })
    },
    onError: () => {
      alert('Gagal menyimpan pertanyaan!')
    }
  })
}

// ===== PENCARIAN & EDIT JAWABAN =====
const searchTumbuhan = ref('')
const hasilJawaban = ref(null)
const searchNotFound = ref(false)
const isEditingSearch = ref(false)
const searchEditData = ref({})

const cariJawaban = async () => {
  if (!searchTumbuhan.value.trim()) {
    alert('Masukkan nama tumbuhan!')
    return
  }

  // Reset states
  searchNotFound.value = false
  hasilJawaban.value = null
  isEditingSearch.value = false

  try {
    const response = await fetch(`/admin/quiz/jawaban/${encodeURIComponent(searchTumbuhan.value.trim())}`)
    if (!response.ok) throw new Error('Tidak ditemukan')
    
    const data = await response.json()
    hasilJawaban.value = data
    searchNotFound.value = false
  } catch (error) {
    hasilJawaban.value = null
    searchNotFound.value = true
    // Reset search input setelah 3 detik
    setTimeout(() => {
      searchNotFound.value = false
    }, 3000)
  }
}

const startEditSearch = () => {
  if (!hasilJawaban.value) return
  
  isEditingSearch.value = true
  // Copy data jawaban untuk editing
  searchEditData.value = { ...hasilJawaban.value.answers }
}

const cancelSearchEdit = () => {
  isEditingSearch.value = false
  searchEditData.value = {}
}

const submitSearchEdit = () => {
  if (!hasilJawaban.value) return

  // Validasi semua jawaban sudah diisi
  const isComplete = pertanyaan.every(q => searchEditData.value[q.text] !== '')
  if (!isComplete) {
    alert('Harap lengkapi semua jawaban!')
    return
  }

  const tumbuhan = hasilJawaban.value.tumbuhan

  router.put(`/admin/quiz/jawaban/${encodeURIComponent(tumbuhan)}`, {
    answers: searchEditData.value,
  }, {
    preserveScroll: true,
    onSuccess: () => {
      // Update hasil pencarian dengan data baru
      hasilJawaban.value.answers = { ...searchEditData.value }
      isEditingSearch.value = false
      searchEditData.value = {}
      
      // Reload data jawaban di section lain
      router.reload({ only: ['jawaban'] })
      
      alert('Data berhasil diperbarui!')
    },
    onError: () => {
      alert('Gagal mengupdate jawaban!')
    }
  })
}

const clearSearch = () => {
  hasilJawaban.value = null
  searchNotFound.value = false
  isEditingSearch.value = false
  searchEditData.value = {}
  searchTumbuhan.value = ''
}

// ===== JAWABAN MANAGEMENT =====
const jawabanForm = ref({
  Tumbuhan: '',
  answers: {}
})

// Inisialisasi form jawaban
const initializeAnswerForm = () => {
  jawabanForm.value.answers = {}
  pertanyaan.forEach((q) => {
    jawabanForm.value.answers[q.text] = ''
  })
}

// Inisialisasi saat pertama kali load
initializeAnswerForm()

const submitJawaban = () => {
  if (!jawabanForm.value.Tumbuhan.trim()) {
    alert('Nama tumbuhan tidak boleh kosong!')
    return
  }

  // Validasi semua jawaban sudah diisi
  const isComplete = pertanyaan.every(q => jawabanForm.value.answers[q.text] !== '')
  if (!isComplete) {
    alert('Harap lengkapi semua jawaban!')
    return
  }

  router.post('/admin/quiz/jawaban', {
    Tumbuhan: jawabanForm.value.Tumbuhan.trim(),
    answers: jawabanForm.value.answers,
  }, {
    preserveScroll: true,
    onSuccess: () => {
      jawabanForm.value.Tumbuhan = ''
      initializeAnswerForm()
      router.reload({ only: ['jawaban'] })
    },
    onError: () => {
      alert('Gagal menyimpan jawaban!')
    }
  })
}

// ===== EDIT JAWABAN =====
const editingJawaban = ref(null)
const editJawabanData = ref({})

const startEditJawaban = (tumbuhan) => {
  editingJawaban.value = tumbuhan
  const target = jawaban.find(j => j.tumbuhan === tumbuhan)
  
  if (target) {
    const copy = { ...target }
    delete copy.id
    delete copy.tumbuhan
    editJawabanData.value = { ...copy }
  }
}

const submitEditJawaban = (tumbuhan) => {
  router.put(`/admin/quiz/jawaban/${encodeURIComponent(tumbuhan)}`, {
    answers: editJawabanData.value,
  }, {
    preserveScroll: true,
    onSuccess: () => {
      cancelEditJawaban()
      router.reload({ only: ['jawaban'] })
    },
    onError: () => {
      alert('Gagal mengupdate jawaban!')
    }
  })
}

const cancelEditJawaban = () => {
  editingJawaban.value = null
  editJawabanData.value = {}
}

const deleteJawaban = (tumbuhan) => {
  if (confirm(`Yakin ingin menghapus data tanaman "${tumbuhan}"?`)) {
    router.delete(`/admin/quiz/jawaban/${encodeURIComponent(tumbuhan)}`, {
      preserveScroll: true,
      onSuccess: () => router.reload({ only: ['jawaban'] }),
      onError: () => {
        alert('Gagal menghapus data tanaman!')
      }
    })
  }
}

// ===== HELPER FUNCTIONS =====
const getAnswersOnly = (jawaban) => {
  const result = { ...jawaban }
  delete result.id
  delete result.tumbuhan
  return result
}

const getCurrentDate = () => {
  return new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const logout = () => {
  router.get('/logout')
}

// ===== COMPUTED PROPERTIES =====
const getCompletionPercentage = computed(() => {
  if (pertanyaan.length === 0 || jawaban.length === 0) return 0
  
  // Hitung rata-rata kelengkapan data
  let totalAnswered = 0
  let totalQuestions = pertanyaan.length * jawaban.length
  
  jawaban.forEach(j => {
    pertanyaan.forEach(q => {
      if (j[q.text] && j[q.text] !== '') {
        totalAnswered++
      }
    })
  })
  
  return totalQuestions > 0 ? Math.round((totalAnswered / totalQuestions) * 100) : 0
})

// ===== MODAL MANAGEMENT =====
const showAddModal = ref(false)

const openAddModal = () => {
  showAddModal.value = true
}

const closeAddModal = () => {
  showAddModal.value = false
}

// ===== WATCH UNTUK UPDATE FORM SAAT PERTANYAAN BERUBAH =====
watch(() => pertanyaan, (newPertanyaan) => {
  // Update form jawaban ketika ada perubahan pertanyaan
  initializeAnswerForm()
  
  // Update search edit data jika sedang dalam mode edit
  if (isEditingSearch.value && hasilJawaban.value) {
    const updatedData = {}
    newPertanyaan.forEach(q => {
      updatedData[q.text] = searchEditData.value[q.text] || ''
    })
    searchEditData.value = updatedData
  }
  
  // Update edit jawaban data jika sedang dalam mode edit
  if (editingJawaban.value) {
    const target = jawaban.find(j => j.tumbuhan === editingJawaban.value)
    if (target) {
      const updatedEditData = {}
      newPertanyaan.forEach(q => {
        updatedEditData[q.text] = target[q.text] || ''
      })
      editJawabanData.value = updatedEditData
    }
  }
}, { deep: true })

// ===== IMPROVED SEARCH FUNCTIONALITY =====
const searchJawaban = async (searchTerm) => {
  const term = searchTerm || searchTumbuhan.value
  if (!term.trim()) {
    alert('Masukkan nama tumbuhan!')
    return
  }

  try {
    const response = await fetch(`/admin/quiz/search/${encodeURIComponent(term.trim())}`)
    const data = await response.json()
    
    if (data.found) {
      hasilJawaban.value = data.jawaban
      searchNotFound.value = false
    } else {
      hasilJawaban.value = null
      searchNotFound.value = true
      setTimeout(() => searchNotFound.value = false, 3000)
    }
  } catch (error) {
    console.error('Search error:', error)
    hasilJawaban.value = null
    searchNotFound.value = true
    setTimeout(() => searchNotFound.value = false, 3000)
  }
}

// ===== VALIDATION HELPERS =====
const validateForm = (formData) => {
  const errors = []
  
  if (!formData.Tumbuhan || !formData.Tumbuhan.trim()) {
    errors.push('Nama tumbuhan wajib diisi')
  }
  
  pertanyaan.forEach(q => {
    if (!formData.answers[q.text] || formData.answers[q.text] === '') {
      errors.push(`Jawaban untuk "${q.text}" wajib diisi`)
    }
  })
  
  return errors
}

const showValidationErrors = (errors) => {
  alert('Terdapat kesalahan:\n' + errors.join('\n'))
}

// ===== ENHANCED SUBMIT FUNCTIONS =====
const submitJawabanEnhanced = () => {
  const errors = validateForm(jawabanForm.value)
  if (errors.length > 0) {
    showValidationErrors(errors)
    return
  }

  // Check if plant already exists
  const exists = jawaban.some(j => 
    j.tumbuhan.toLowerCase() === jawabanForm.value.Tumbuhan.trim().toLowerCase()
  )
  
  if (exists) {
    if (!confirm('Tanaman dengan nama ini sudah ada. Apakah Anda ingin melanjutkan?')) {
      return
    }
  }

  router.post('/admin/quiz/jawaban', {
    Tumbuhan: jawabanForm.value.Tumbuhan.trim(),
    answers: jawabanForm.value.answers,
  }, {
    preserveScroll: true,
    onSuccess: () => {
      jawabanForm.value.Tumbuhan = ''
      initializeAnswerForm()
      router.reload({ only: ['jawaban'] })
      alert('Data tanaman berhasil disimpan!')
    },
    onError: (errors) => {
      console.error('Submit error:', errors)
      alert('Gagal menyimpan jawaban! Silakan coba lagi.')
    }
  })
}
</script>

<style scoped>
/* Custom scrollbar untuk sidebar */
aside::-webkit-scrollbar {
  width: 4px;
}

aside::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

aside::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}
</style>