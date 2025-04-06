<template>
  <div class="min-h-screen bg-white py-12 px-4">
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
              :src="`https://www.youtube.com/embed/${video.id}`"
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
        <div v-else class="space-y-4">
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
      </div>
    </div>
    <div class="text-center mt-12">
      <button 
        @click="$inertia.visit('/dashboard')" 
        class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
      >
        ← Kembali ke Dashboard
      </button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Guides',
  data() {
    return {
      activeTab: 'infographic',
      expandedFaqs: [],
      tabs: [
        { id: 'infographic', label: 'Infografis' },
        { id: 'video', label: 'Video' },
        { id: 'faq', label: 'FAQ' }
      ],
      infographics: [
        {
          id: 1,
          title: "Cara Menyemai Benih",
          caption: "Langkah-langkah sederhana untuk pemula",
          image: "https://example.com/infographic-seed.jpg"
        }
        // Tambahkan infografis lainnya...
      ],
      videos: [
        {
          id: "abc123",
          title: "Cara Setup Hidroponik Sederhana",
          duration: "1:30",
          views: "10K ditonton"
        }
        // Tambahkan video lainnya...
      ],
      faqs: [
        {
          id: 1,
          question: "Tanaman apa yang cocok untuk kamar tidur?",
          answer: "Lidah mertua atau Peace Lily bisa jadi pilihan..."
        }
        // Tambahkan FAQ lainnya...
      ]
    };
  },
  methods: {
    toggleFaq(id) {
      if (this.expandedFaqs.includes(id)) {
        this.expandedFaqs = this.expandedFaqs.filter(faqId => faqId !== id);
      } else {
        this.expandedFaqs.push(id);
      }
    }
  }
};
</script>