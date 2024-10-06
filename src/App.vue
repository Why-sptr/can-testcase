<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '@/components/Navbar.vue';

export default defineComponent({
  name: 'App',
  components: {
    Navbar,
  },
});
</script>

<style>
body {
  background-color: #ffffff;
  color: #000000;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

body.dark-mode {
  background-color: #121212;
  color: #ffffff;
}

.card {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ccc;
}

body.dark-mode .card {
  background-color: #1e1e1e;
  color: #ffffff;
  border: 1px solid #444;
}

.navbar {
  background-color: #f8f9fa;
  color: #000;
}

.navbar .nav-link {
  color: #000;
}

.navbar .btn-outline-primary {
  color: #007bff;
}

body.dark-mode .navbar {
  background-color: #1e1e1e;
  color: #ffffff;
}

body.dark-mode .navbar .nav-link {
  color: #ffffff;
}

body.dark-mode .navbar .btn-outline-primary {
  color: #6200ea;
}

.btn-primary {
  background-color: #6200ea;
  border: none;
}

.btn-primary:hover {
  background-color: #3700b3;
}

.separator {
  background-color: #444;
}

.notification {
  background-color: #dc3545;
}

.form-control {
  background-color: #ffffff;
  color: #000000;
  border: 1px solid #ccc;
}

.btn-outline-primary {
  color: #007bff;
  border-color: #007bff;
}

body.dark-mode .form-control {
  background-color: #3a3a3a;
  color: #ffffff;
  border: 1px solid #555;
}

body.dark-mode .btn-outline-primary {
  color: #6200ea;
  border-color: #6200ea;
}

body.dark-mode .btn-outline-primary:hover {
  background-color: rgba(98, 0, 234, 0.1);
}
</style>