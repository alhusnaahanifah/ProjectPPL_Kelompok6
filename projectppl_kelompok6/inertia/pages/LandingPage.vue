<template>
  <div class="container mx-auto overflow-x-hidden">
    <!-- Header -->
    <header class="absolute top-0 left-0 w-full max-w-screen flex justify-between items-center py-4 px-4 sm:px-6 md:px-8 bg-opacity-80 z-50 overflow-x-hidden">
      <h1 class="text-2xl sm:text-3xl font-bold text-green-600">HidroGrow</h1>
      <nav>
        <ul class="flex flex-wrap justify-end items-center space-x-4 sm:space-x-6">
          <li><a href="#about" class="text-gray-700 hover:text-green-600">About</a></li>
          <li><a href="#features" class="text-gray-700 hover:text-green-600">Features</a></li>
          <li><a href="#contact" class="text-gray-700 hover:text-green-600">Contact</a></li>
          <li><a href="/login" class="text-gray-700 hover:text-green-600">Login</a></li>
        </ul>
      </nav>
    </header>

    
    <!-- Hero Section -->
    <section class="relative h-screen w-full flex items-center z-10">
        <div class="w-2/3 h-full relative flex items-center justify-center">
          <!-- Gambar background -->
          <img
            src="../image/leaves.png"
            alt="Daun"
            class="absolute inset-0 w-100 h-100 top-20 object-cover z-0"
          />

          <!-- Konten di atas gambar -->
          <div class="relative z-10 text-center bg-white bg-opacity-80 p-6 rounded-lg">
            <h2 class="text-5xl font-bold text-green-700">Mulai Hidroponikmu Hari Ini!</h2>
            <p class="mt-4 text-lg text-gray-600">
              Temukan tanaman yang cocok untukmu dan mulai bertanam dengan mudah.
            </p>
            <button 
              class="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
              onclick="window.location.href='/login'"
            >
              Coba Kuis
            </button>

          </div>
        </div>

        <!-- SVG Pemisah Melengkung -->
        <div class="relative hidden md:block w-[3%] h-full flex overflow-hidden">
            <svg class="absolute inset-0 w-full h-full -right-px" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="gradienContoh" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#CCFFAA" />
                        <stop offset="100%" stop-color="#1E5B53" />
                    </linearGradient>
                </defs>
                 <path d="M20 0 C50 10, 70 90, 100 100 L0 100 L0 0 Z" fill="url(#gradienContoh)" transform="scale(-1,1) translate(-110,0)" />
            </svg>
        </div>

        <!-- Bagian Kanan (Lebih Kecil, Warna Hijau) -->
        <div class="w-1/3 h-full bg-gradient-to-b from-[#CCFFAA] to-[#1E5B53] flex items-center justify-center">
            <img src="../image/tumbuhan.png" alt="Hidroponik" class="rounded-lg max-w-full h-auto object-contain">
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-24 px-6 bg-gradient-to-b from-green-100 via-white to-green-50">
      <div class="max-w-6xl mx-auto text-center">
        
        <h3 class="text-4xl md:text-4xl font-extrabold text-green-800 mb-6 tracking-tight leading-snug font-serif">
          HidroGrow: Menanam Itu Mudah, Berdampak, dan Menyenangkan
        </h3>

        <p class="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
          Banyak orang ingin mulai menanam tapi bingung harus mulai dari mana. HidroGrow hadir untuk mengubah itu—
          <span class="text-green-700 font-semibold">dengan panduan praktis, kuis interaktif, dan tantangan seru</span>,
          kami membuat kegiatan menanam terasa personal, ringan, dan bisa dilakukan siapa saja di mana saja.
        </p>

        <div class="grid md:grid-cols-3 gap-6 text-left">
          <!-- Card 1 -->
          <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 text-center">
            <div class="text-4xl mb-3 text-green-600">🌱</div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Menanam Tidak Harus Sulit</h4>
            <p class="text-gray-600 mb-4">
              HidroGrow membimbing kamu mulai dari memilih tanaman, menyiapkan media tanam, sampai merawatnya—semuanya bisa dilakukan dari rumah.
            </p>
          </div>

          <!-- Card 2 -->
          <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 text-center">
            <div class="text-4xl mb-3 text-green-600">🧘‍♂️</div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Bermanfaat untuk Kesehatan Mental</h4>
            <p class="text-gray-600 mb-4">
              Menanam terbukti mengurangi stres dan memberi rasa damai. HidroGrow menjadikan menanam sebagai rutinitas kecil yang menenangkan.
            </p>
          </div>

          <!-- Card 3 -->
          <div class="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300 text-center">
            <div class="text-4xl mb-3 text-green-600">🌍</div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Aksi Kecil untuk Perubahan Besar</h4>
            <p class="text-gray-600 mb-4">
              Dengan satu pot tanaman, kamu ikut menjaga bumi. HidroGrow ingin menunjukkan bahwa perubahan bisa dimulai dari rumahmu sendiri.
            </p>
          </div>
        </div>

        <!-- Penutup -->
        <div class="mt-16 max-w-4xl mx-auto text-center">
          <p class="text-md md:text-lg text-gray-700 leading-relaxed">
            Di HidroGrow, kami percaya bahwa setiap orang bisa menanam—baik kamu tinggal di apartemen, kos, rumah kecil, atau bahkan belum pernah menyentuh tanah sekalipun.
            Kami membuat prosesnya terasa seperti petualangan kecil yang menyegarkan dan penuh makna.
          </p>
        </div>
      </div>
    </section>

    <!-- Garis Divider -->
    <div class="w-full flex justify-center my-12">
      <div class="w-24 h-1 bg-green-500 rounded-full"></div>
    </div>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-green-50">
      <div class="container mx-auto px-4">
        <h3 class="text-4xl md:text-4xl font-extrabold text-green-800 mb-6 tracking-tight text-center leading-snug font-serif">Fitur Utama</h3>
        <p class="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto text-center leading-relaxed">
          Temukan cara mudah memulai hidroponik dengan fitur-fitur unggulan kami
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Feature 1: Personality Test -->
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div class="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Tes Kepribadian Tanaman</h4>
            <p class="text-gray-600 mb-4">
              Cari tahu tanaman yang cocok dengan gaya hidupmu hanya dalam 1 menit!
            </p>
            <Link href="/login" class="text-green-600 font-medium hover:text-green-800 transition-colors">
              Coba Sekarang →
            </Link>
          </div>

          <!-- Feature 2: 7-Day Challenge -->
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div class="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Tantangan 7 Hari</h4>
            <p class="text-gray-600 mb-4">
              Ikuti panduan harian untuk memulai hidroponik dari nol hingga panen pertama
            </p>
            <Link href="/login" class="text-green-600 font-medium hover:text-green-800 transition-colors">
              Mulai Tantangan →
            </Link>
          </div>

          <!-- Feature 3: Practical Guide -->
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div class="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 class="text-xl font-semibold text-green-800 mb-2">Panduan Praktis</h4>
            <p class="text-gray-600 mb-4">
              Video tutorial singkat dan infografis yang mudah dipahami pemula
            </p>
            <Link href="/login" class="text-green-600 font-medium hover:text-green-800 transition-colors">
              Lihat Panduan →
            </Link>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Garis Divider -->
    <div class="w-full flex justify-center my-12">
      <div class="w-24 h-1 bg-green-500 rounded-full"></div>
    </div>

    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-gradient-to-t from-white to-green-50">
      <h3 class="text-4xl md:text-4xl font-extrabold text-green-800 mb-6 tracking-tight text-center leading-snug font-serif">Hubungi Kami</h3>
      <p class="text-lg md:text-xl text-gray-700 mb-12 max-w-3xl mx-auto text-center leading-relaxed">Jika ada pertanyaan atau masukan, silakan hubungi kami melalui email atau telepon.</p>

      <div class="max-w-sm mx-auto mt-6 bg-white p-6 shadow-lg rounded-xl border border-gray-300">
        <div class="flex items-center gap-3 mb-4">
          <svg class="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 4a2 2 0 012-2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm3 3v1h14V7H5zm0 3v8h14v-8H5z"/>
          </svg>
          <p class="text-gray-800 text-base font-medium">
            <span class="text-gray-500">Email:</span> <strong>support@example.com</strong>
          </p>
        </div>

        <div class="flex items-center gap-3">
          <svg class="w-6 h-6 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.2-.2 10.05 10.05 0 003.88.77 1 1 0 011 1v3.5a1 1 0 01-1 1A19 19 0 012 4a1 1 0 011-1H6.5a1 1 0 011 1 10.05 10.05 0 00.77 3.88 1 1 0 01-.2 1.2l-2.2 2.21z"/>
          </svg>
          <p class="text-gray-800 text-base font-medium">
            <span class="text-gray-500">Telepon:</span> <strong>+62 812-3456-7890</strong>
          </p>
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
</script>

<style scoped>
.container {
  font-family: 'Arial', sans-serif;
}
</style>