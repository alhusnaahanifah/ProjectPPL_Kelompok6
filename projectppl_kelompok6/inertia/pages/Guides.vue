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

          <!-- Tab Content -->
      <div class="mt-6">
        <!-- Komunitas -->
        <div v-if="activeTab === 'community'" class="space-y-6">
          <!-- Form Tambah Pengalaman -->
          <form @submit.prevent="addExperience" enctype="multipart/form-data" class="grid grid-cols-1 gap-4 border p-4 rounded-lg">
            <input v-model="newExperience.username" placeholder="Nama Anda" class="border p-2 rounded" required />
            <textarea v-model="newExperience.story" placeholder="Bagikan pengalaman Anda..." class="border p-2 rounded" required></textarea>
            <input type="file" @change="handleFileUpload" accept="image/*" class="border p-2 rounded" />
            <button class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Bagikan</button>
          </form>

          <!-- Daftar Pengalaman -->
          <div class="grid md:grid-cols-2 gap-6">
            <div 
              v-for="exp in experiences" 
              :key="exp.id"
              class="border border-gray-200 rounded-lg overflow-hidden"
            >
              <img v-if="exp.photo" :src="exp.photo" class="w-full h-48 object-cover" />
              <div class="p-4">
                <p class="text-sm text-gray-600">Ditulis oleh <strong>{{ exp.username }}</strong></p>
                <p class="mt-2">{{ exp.story }}</p>
                <div class="mt-4 flex justify-end gap-2">
                  <button @click="startEditExperience(exp)" class="text-blue-600 hover:underline">Edit</button>
                  <button @click="deleteExperience(exp.id)" class="text-red-600 hover:underline">Hapus</button>
                </div>
              </div>
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
        { id: 'faq', label: 'FAQ' },
        { id: 'community', label: 'Komunitas' }
      ],
      infographics: [
        {
          id: 1,
          title: "Cara Menyemai Benih",
          caption: "Langkah-langkah sederhana untuk pemula",
          image: "https://placehold.co/600x400/green/white?text=Infografis+1"
        }
      ],
      videos: [
        {
          id: "abc123",
          title: "Cara Setup Hidroponik Sederhana",
          embedUrl: "https://www.youtube.com/embed/PxmZ-_YP1dM?si=oWTzOslUhY5JrD4n",
          duration: "1:30",
          views: "10K ditonton"
        }
      ],
      faqs: [
        {
          id: 1,
          question: "Tanaman apa yang cocok untuk kamar tidur?",
          answer: "Lidah mertua atau Peace Lily bisa jadi pilihan..."
        }
      ],
      experiences: [
        {
          id: 1,
          username: "Ali",
          story: "Saya mulai menanam sayur organik di balkon rumah.",
          photo: null
        }
      ],
      newExperience: {
        username: '',
        story: '',
        photo: null
      },
      editId: null
    };
  },
  methods: {
    toggleFaq(id) {
      if (this.expandedFaqs.includes(id)) {
        this.expandedFaqs = this.expandedFaqs.filter(faqId => faqId !== id);
      } else {
        this.expandedFaqs.push(id);
      }
    },
    getEmbedUrl(link) {
      if (!link) return '';
      const videoId = link.split('v=')[1]?.split('&')[0] || link.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}`;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.newExperience.photo = URL.createObjectURL(file); // Simulasi tampilan
        // Untuk produksi, Anda akan mengupload ke server
      }
    },
    addExperience() {
      if (this.editId) {
        const idx = this.experiences.findIndex(e => e.id === this.editId);
        if (idx !== -1) {
          this.experiences[idx] = { ...this.newExperience, id: this.editId };
        }
        this.editId = null;
      } else {
        const newId = Date.now();
        this.experiences.push({ ...this.newExperience, id: newId });
      }

      // Reset
      this.newExperience = { username: '', story: '', photo: null };
    },
    startEditExperience(exp) {
      this.newExperience = {
        username: exp.username,
        story: exp.story,
        photo: exp.photo
      };
      this.editId = exp.id;
    },
    deleteExperience(id) {
      this.experiences = this.experiences.filter(e => e.id !== id);
    }
  }
}
</script>

<style scoped>
textarea {
  resize: vertical;
}
</style>
