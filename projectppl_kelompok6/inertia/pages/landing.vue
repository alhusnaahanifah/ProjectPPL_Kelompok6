<template>
  <div class="container mx-auto">
    <!-- Header -->
    <header class="flex justify-between items-center py-6 px-8">
      <h1 class="text-3xl font-bold text-green-600">HidroGrow</h1>
      <nav>
        <ul class="flex space-x-6">
          <li><a href="#about" class="text-gray-700 hover:text-green-600">About</a></li>
          <li><a href="#features" class="text-gray-700 hover:text-green-600">Features</a></li>
          <li><a href="#testimonials" class="text-gray-700 hover:text-green-600">Testimonials</a></li>
          <li><a href="#contact" class="text-gray-700 hover:text-green-600">Contact</a></li>
        </ul>
      </nav>
    </header>
    
    <!-- Hero Section -->
    <section class="text-center py-20 bg-green-100">
      <h2 class="text-5xl font-bold text-green-700">Mulai Hidroponikmu Hari Ini!</h2>
      <p class="mt-4 text-lg text-gray-600">Temukan tanaman yang cocok untukmu dan mulai bertanam dengan mudah.</p>
      <button class="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700">Coba Kuis</button>
    </section>
    
    <!-- About Section -->
    <section id="about" class="py-20 px-8">
      <h3 class="text-4xl font-bold text-center text-green-700">Tentang Hidroponik</h3>
      <p class="mt-4 text-center text-gray-600">Hidroponik adalah metode menanam tanpa tanah yang lebih efisien dan ramah lingkungan.</p>
    </section>
    
    <!-- Features Section -->
    <section id="features" class="py-20 bg-green-50">
      <h3 class="text-4xl font-bold text-center text-green-700">Fitur Utama</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 px-8">
        <div class="text-center">
          <h4 class="text-xl font-semibold">Tes Kepribadian Tanaman</h4>
          <p class="mt-2 text-gray-600">Cari tahu tanaman yang cocok dengan gaya hidupmu.</p>
        </div>
        <div class="text-center">
          <h4 class="text-xl font-semibold">Tantangan 7 Hari</h4>
          <p class="mt-2 text-gray-600">Ikuti panduan langkah demi langkah untuk mulai menanam.</p>
        </div>
        <div class="text-center">
          <h4 class="text-xl font-semibold">Panduan Praktis</h4>
          <p class="mt-2 text-gray-600">Infografis dan video singkat untuk memudahkan kamu belajar.</p>
        </div>
      </div>
    </section>
    
    <!-- Testimonials -->
    <section id="testimonials" class="py-20 px-8">
      <h3 class="text-4xl font-bold text-center text-green-700">Apa Kata Mereka?</h3>
      <p class="mt-4 text-center text-gray-600">Orang-orang yang sudah mencoba hidroponik dan berhasil!</p>
    </section>
    
    <!-- Contact Section -->
    <section id="contact" class="py-20 bg-green-100">
      <h3 class="text-4xl font-bold text-center text-green-700">Mulai Sekarang!</h3>
      <div class="flex justify-center mt-6">
        <input type="email" placeholder="Masukkan email" class="px-4 py-2 border border-gray-300 rounded-l-lg">
        <button class="px-6 py-2 bg-green-600 text-white rounded-r-lg hover:bg-green-700">Daftar</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
.container {
  font-family: 'Arial', sans-serif;
}
</style>