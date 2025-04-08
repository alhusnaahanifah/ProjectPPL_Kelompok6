<template>
  <div class="min-h-screen bg-cover bg-center">
    <!-- Header -->
    <header class="fixed top-4 left-4 right-4 mx-auto max-w-5xl box-border flex justify-between items-center px-6 py-2 z-50 
                bg-[#2f3828]/70 text-white backdrop-blur-md border border-white/30 rounded-full shadow-md">
      <div class="flex items-center space-x-4 sm:space-x-4">
        <img src="../image/plogo-samping.png" alt="Logo Project" class="w-40 h-auto">
      </div>
      <nav>
        <ul class="flex flex-wrap text-[#CCFFAA] justify-end items-center space-x-4 sm:space-x-6">
          <li><a href="#about" class="hover:text-green-300">Tentang</a></li>
          <li><a href="#features" class="hover:text-green-300">Fitur</a></li>
          <li><a href="#contact" class="hover:text-green-300">Kontak</a></li>
          <li><a href="/login" class="hover:text-green-300">Masuk</a></li>
        </ul>
      </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero-section relative h-screen w-full flex flex-col md:flex-row items-center z-10 bg-gradient-to-r from-black/30 to-transparent pt-24">
      <div class="absolute inset-0 bg-black/30 backdrop-blur-sm z-0"></div>

      <!-- Konten -->
      <div class="w-full md:w-2/3 h-2/3 md:h-full relative flex items-center justify-center">
        <div class="relative mx-4 md:mx-12 max-w-2xl">
          <h3 class="text-3xl md:text-6xl font-extrabold text-[#CCFFAA] mb-6 tracking-tight leading-snug font-serif transition duration-300 transform hover:scale-105">
            HidroGrow
          </h3>
          <h3 class="text-xl md:text-3xl font-extrabold text-[#CCFFAA] mb-6 tracking-tight leading-snug font-serif transition duration-300 transform hover:scale-105">
            "Satu Tanaman, Satu Langkah untuk Masa Depan"
          </h3>
          <button 
            class="flex items-center gap-2 px-6 py-3 border border-white/30  text-white rounded-lg shadow-md hover:bg-green-800 transition duration-300 transform hover:scale-105"
            onclick="window.location.href='/login'"
          >
            Mulai Sekarang
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Gambar -->
      <div class="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-2xl transition duration-300 transform hover:scale-105">
        <img src="../image/tumbuhan.png" alt="Hidroponik" class="rounded-lg max-w-full h-auto object-contain" />
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-24 px-6 bg-gradient-to-b from-green-100 via-white to-green-50">
      <div class="max-w-6xl mx-auto text-center">
        <p class="text-base md:text-lg text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          Banyak orang ingin mulai menanam tapi bingung harus mulai dari mana. HidroGrow hadir untuk mengubah itu—
          <span class="text-green-700 font-semibold">dengan panduan praktis, dan tantangan seru</span>,
          kami membuat kegiatan menanam terasa personal, ringan, dan bisa dilakukan siapa saja di mana saja.
        </p>

        <div class="grid md:grid-cols-3 gap-6 text-left transition duration-300 transform hover:scale-105">
          <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 text-center">
            <div class="text-4xl mb-3 text-green-600">🌱</div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Menanam Tidak Harus Sulit</h4>
            <p class="text-gray-600 mb-4">HidroGrow membimbing kamu mulai dari memilih tanaman, menyiapkan media tanam, sampai merawatnya—semuanya bisa dilakukan dari rumah.</p>
          </div>

          <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 text-center">
            <div class="text-4xl mb-3 text-green-600">🧘‍♂️</div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Bermanfaat untuk Kesehatan Mental</h4>
            <p class="text-gray-600 mb-4">Menanam terbukti mengurangi stres dan memberi rasa damai. HidroGrow menjadikan menanam sebagai rutinitas kecil yang menenangkan.</p>
          </div>

          <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 text-center">
            <div class="text-4xl mb-3 text-green-600">🌍</div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Aksi Kecil untuk Perubahan Besar</h4>
            <p class="text-gray-600 mb-4">Dengan satu pot tanaman, kamu ikut menjaga bumi. HidroGrow ingin menunjukkan bahwa perubahan bisa dimulai dari rumahmu sendiri.</p>
          </div>
        </div>

        <div class="mt-16 max-w-4xl mx-auto text-center">
          <p class="text-base md:text-lg text-gray-700 leading-relaxed">
            Di HidroGrow, kami percaya bahwa setiap orang bisa menanam—baik kamu tinggal di apartemen, kos, rumah kecil, atau bahkan belum pernah menyentuh tanah sekalipun.
            Kami membuat prosesnya terasa seperti petualangan kecil yang menyegarkan dan penuh makna.
          </p>
        </div>
      </div>
    </section>

    <div class="w-full flex justify-center my-12">
      <div class="w-24 h-1 bg-green-500 rounded-full"></div>
    </div>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-green-50">
      <div class="container mx-auto px-4">
        <h3 class="text-4xl font-extrabold text-green-800 mb-6 tracking-tight text-center leading-snug font-serif">Fitur Utama</h3>
        <p class="text-lg text-gray-700 mb-12 max-w-3xl mx-auto text-center leading-relaxed">Temukan cara mudah memulai menanam dengan fitur-fitur unggulan kami</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center">
            <div class="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Tes Kepribadian Tanaman</h4>
            <p class="text-gray-600 mb-4">Cari tahu tanaman yang cocok dengan gaya hidupmu hanya dalam 1 menit!</p>
            <a href="/login" class="text-green-600 font-medium hover:text-green-800">Coba Sekarang →</a>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center">
            <div class="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Tantangan 7 Langkah</h4>
            <p class="text-gray-600 mb-4">Ikuti panduan setiap langkah untuk memulai hidroponik dari nol hingga panen pertama</p>
            <a href="/login" class="text-green-600 font-medium hover:text-green-800">Mulai Tantangan →</a>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 text-center">
            <div class="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Panduan Praktis</h4>
            <p class="text-gray-600 mb-4">Video tutorial singkat dan infografis yang mudah dipahami pemula</p>
            <a href="/login" class="text-green-600 font-medium hover:text-green-800">Lihat Panduan →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="w-full flex justify-center my-12">
      <div class="w-24 h-1 bg-green-500 rounded-full"></div>
    </div>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gradient-to-t from-white to-green-50">
      <h3 class="text-4xl font-extrabold text-green-800 mb-6 text-center font-serif">Hubungi Kami</h3>
      <p class="text-lg text-gray-700 mb-12 max-w-3xl mx-auto text-center">Jika ada pertanyaan atau masukan, silakan hubungi kami melalui email atau telepon.</p>

      <div class="max-w-sm mx-auto bg-white p-6 shadow-lg rounded-xl border border-gray-300 transition duration-300 transform hover:scale-105">
        <div class="flex items-center gap-3 mb-4">
          <svg class="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm3 3v1h14V7H5zm0 3v8h14v-8H5z"/>
          </svg>
          <p class="text-gray-800 text-base font-medium"><span class="text-gray-500">Email:</span> <strong>hidrogrow@gmail.com</strong></p>
        </div>
        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21 11.72 11.72 0 003.69.59 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.72 11.72 0 00.59 3.69 1 1 0 01-.21 1.11l-2.2 2.2z"/>
          </svg>
          <p class="text-gray-800 text-base font-medium"><span class="text-gray-500">Telepon:</span> <strong>+62 812-3456-7890</strong></p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  methods: {
    navigateTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<script setup>
import { Link } from '@inertiajs/vue3'

import AOS from 'aos'
import 'aos/dist/aos.css'
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  font-family: 'Arial', sans-serif;
}
.hero-section {
  background-image: url('../image/back2.jpg');
  background-size: cover;
  background-position: center;
}
</style>