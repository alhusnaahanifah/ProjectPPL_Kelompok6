# 🌱 HidroGrow: Satu Tanaman Satu Langkah untuk Masa Depan

**HidroGrow** adalah aplikasi web edukatif berbasis hidroponik yang bertujuan mengajak pengguna mulai menanam dengan cara menyenangkan dan interaktif. Dibangun menggunakan **AdonisJS** sebagai backend dan **Vue 3 + Inertia.js** sebagai frontend SPA (Single Page Application).

---

## ✨ Fitur Utama

- 👤 Autentikasi pengguna dengan AdonisJS
- 🌱 Dashboard dinamis yang menampilkan 3 fitur utama:
  - **Tes Kepribadian Tanaman** – rekomendasi tanaman berdasarkan preferensi pengguna
  - **Tantangan 7 Hari Menanam** – fitur edukatif membangun kebiasaan
  - **Panduan Praktis** – infografis/tutorial mudah dipahami
- 🎨 UI clean dan responsif (TailwindCSS)
- 🍃 Efek transisi mulus & menu dropdown interaktif
- 📱 Mobile-friendly dan ringan

---

## 🛠️ Teknologi yang Digunakan

| Layer     | Teknologi                     |
|-----------|-------------------------------|
| Backend   | [AdonisJS](https://adonisjs.com) |
| Frontend  | [Vue 3](https://vuejs.org), [Inertia.js](https://inertiajs.com) |
| Styling   | [Tailwind CSS](https://tailwindcss.com) |
| Auth      | Session-based via AdonisJS |
| Storage   | LocalStorage (untuk progres tantangan, opsional) |

---

## 🚀 Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/username/hidrogrow.git
cd hidrogrow
```

### 2. Install Dependensi

```bash
npm install
```

### 3. Setup Environment

Salin file `.env.example` lalu sesuaikan:

```bash
cp .env.example .env
node ace generate:key
```

### 4. Migrasi Database

```bash
node ace migration:run
```

### 5. Build Frontend

```bash
npm run build
```

### 6. Jalankan Server

```bash
node ace serve --watch
```

Buka `http://localhost:3333` di browser untuk mengakses aplikasi.

---

## 🧑‍💻 Kontributor

- [@alhusnaahanifah](https://github.com/alhusnaahanifah)

---

Terima kasih telah menggunakan HidroGrow! 🌿 Semoga aplikasimu bisa menginspirasi lebih banyak orang untuk mulai menanam dan peduli lingkungan.
```
