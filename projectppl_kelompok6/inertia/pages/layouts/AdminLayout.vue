<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow p-4">
      <h1 class="text-xl font-bold">Admin Panel</h1>
    </header>
    <div class="flex">
      <aside class="w-64 bg-gray-200 p-4">
        <ul>
          <li><Link href="/admin/dashboard">Dashboard</Link></li>
          <li><Link href="/admin/users">Users</Link></li>
          <!-- Tambahkan menu lainnya -->
        </ul>
      </aside>
      <main class="flex-1 p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
</script>
