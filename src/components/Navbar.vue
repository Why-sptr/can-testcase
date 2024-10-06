<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="/images/gameicon.png" alt="icon" style="width: 50px;">
      </router-link>
      <button class="navbar-toggler btn-outline-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/games">Daftar Game</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/favorites">Game Favorit</router-link>
          </li>
        </ul>
        <form class="d-flex" @submit.prevent="onSearch">
          <input v-model="searchQuery" class="form-control me-2" type="search" placeholder="Cari game kamu" aria-label="Search">
          <button class="btn btn-primary" type="submit">Search</button>
        </form>
        <button @click="toggleDarkMode" class="btn btn-outline-none">
          <img :src="isDarkMode ? '/images/sun.png' : '/images/moon.png'" alt="Toggle Dark Mode" width="24"/>
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const searchQuery = ref('');
    const router = useRouter();
    const isDarkMode = ref(false);

    const onSearch = () => {
      if (searchQuery.value) {
        router.push({ name: 'GameList', query: { search: searchQuery.value } });
      }
    };

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('dark-mode', isDarkMode.value ? 'enabled' : 'disabled');
    };

    onMounted(() => {
      const darkModePreference = localStorage.getItem('dark-mode');
      if (darkModePreference === 'enabled') {
        document.body.classList.add('dark-mode');
        isDarkMode.value = true;
      }
    });

    return {
      searchQuery,
      onSearch,
      toggleDarkMode,
      isDarkMode,
    };
  },
});
</script>

<style scoped>
body.dark-mode .navbar {
  background-color: #1e1e1e;
  color: #ffffff;
}

body.dark-mode .nav-link {
  color: #ffffff;
}

body.dark-mode .form-control {
  background-color: #3a3a3a;
  color: #ffffff;
  border: 1px solid #555;
}

body.dark-mode .btn-primary {
  background-color: #6200ea;
  color: #ffffff;
}

.navbar-toggler {
  background-color: transparent;
  border: none;
}

.navbar-toggler-icon {
  background-color: transparent;
  position: relative;
  display: block;
  width: 30px;
  height: 3px;
}

.navbar-toggler:focus {
  outline: none;
  box-shadow: none;
}

.navbar-toggler:hover {
  background-color: transparent;
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
  content: '';
  display: block;
  width: 100%;
  height: 3px;
  position: absolute;
  left: 0;
}

.navbar-toggler-icon::before {
  top: -8px;
}

.navbar-toggler-icon::after {
  bottom: -8px;
}

body.dark-mode .navbar-toggler-icon::before,
body.dark-mode .navbar-toggler-icon,
body.dark-mode .navbar-toggler-icon::after {
  background-color: white;
}

body:not(.dark-mode) .navbar-toggler-icon::before,
body:not(.dark-mode) .navbar-toggler-icon,
body:not(.dark-mode) .navbar-toggler-icon::after {
  background-color: black;
}
</style>
