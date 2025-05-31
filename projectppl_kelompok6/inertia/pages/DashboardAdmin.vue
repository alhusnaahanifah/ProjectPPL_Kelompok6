<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Selamat Datang Admin</h1>
    <p>Halo, {{ user.fullName }} ({{ user.email }})</p>
  </div>
</template>

<script setup>
defineProps({
  user: Object
})
</script>
