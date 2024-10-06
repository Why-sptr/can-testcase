<template>
  <div class="container">
    <div class="main-content">

      <div class="row d-flex align-items-center text-center text-md-start">
        <div class="col-12 col-md-6">
          <div class="hero">
            <h2 class="section-title">Bergabunglah dalam Petualangan Game yang Seru</h2>
            <p class="section-subtitle">
              Bergabunglah bersama kami dan rasakan bagaimana setiap detik dalam permainan Anda dipenuhi dengan
              kegembiraan dan intrik.
            </p>
            <router-link to="/games" class="btn btn-primary d-block d-md-inline w-100 w-md-auto">Lihat Game</router-link>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <img src="/images/Game.png" alt="Gamepad" class="gamepad-img w-100">
        </div>
      </div>

      <div class="text-center mb-5">
        <h3>Trending Game</h3>
        <div class="row g-3">
          <div class="col-6 col-md-4 col-lg-3 mb-4 mt-2" v-for="game in trendingGames.slice(0, 8)" :key="game.id">
            <GameCard :game="game" :isFavorite="false" @toggle-favorite="addToFavorites" />
          </div>
        </div>
        <div v-if="showNotification" class="notification">
          {{ notificationMessage }}
        </div>
      </div>
    </div>

    <div class="card overflow-hidden mb-5">
      <div class="row d-flex align-items-center p-3">
        <div class="col-12 col-md-6 mb-2">
          <img src="/images/GameChar.png" alt="Gamepad" class="gamepad-img rounded-2 w-100">
        </div>
        <div class="col-12 col-md-6">
          <div class="hero">
            <h3 class="section-title">Jelajahi koleksi Game kami, temukan Game Terbaik di sini!</h3>
            <p class="section-subtitle">Temukan koleksi game kami yang paling populer dan rasakan pengalaman bermain yang seru.</p>
            <router-link to="/games" class="btn btn-primary d-block d-md-inline w-100 w-md-auto">Lihat Game</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-5">
    <div class="text-center">
      <h3 class="section-title">Mengapa Memilih Kami</h3>
    </div>
    <div class="row">
      <div class="col-12 col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Koleksi Game Beragam</h5>
            <p class="card-text">Dari petualangan yang mendebarkan hingga permainan strategi yang menantang, temukan
              berbagai genre game yang sesuai dengan selera Anda.</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Platform Mudah Digunakan</h5>
            <p class="card-text">Navigasi yang sederhana dan intuitif membuat Anda dengan cepat menemukan game yang
              ingin Anda mainkan. Kami berusaha untuk memberikan pengalaman pengguna yang terbaik!</p>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-4 mb-4">
        <div class="card h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">Komunitas Gamer Aktif</h5>
            <p class="card-text">Bergabunglah dengan komunitas kami yang ramah dan berbagi pengalaman Anda. Temukan
              teman baru dan ikuti perkembangan game terbaru!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import axios from 'axios';
import { useGameStore } from '@/stores/gameStore';
import GameCard from '@/components/GameCard.vue';

interface Game {
  id: number;
  name: string;
}

export default defineComponent({
  components: {
    GameCard,
  },
  setup() {
    const trendingGames = ref<Game[]>([]);
    const gameStore = useGameStore();
    const showNotification = ref(false);
    const notificationMessage = ref('');

    const fetchTrendingGames = async () => {
      try {
        const response = await axios.get('https://api.rawg.io/api/games/lists/main?key=4459055921b241dba8a460d0a3ce7291');
        const uniqueGames = response.data.results.filter((game: Game, index: number, self: Game[]) =>
          index === self.findIndex((g: Game) => g.id === game.id)
        );
        trendingGames.value = uniqueGames;
      } catch (error) {
        console.error('Error fetching trending games:', error);
      }
    };

    onMounted(() => {
      fetchTrendingGames();
    });

    const addToFavorites = (game: Game) => {
      const result = gameStore.addFavorite(game);
      if (result) {
        notificationMessage.value = `${game.name} berhasil ditambahkan ke favorit!`;
      } else {
        notificationMessage.value = `${game.name} sudah ada di daftar favorit.`;
      }
      showNotification.value = true;

      setTimeout(() => {
        showNotification.value = false;
      }, 1000);
    };

    return {
      trendingGames,
      showNotification,
      notificationMessage,
      addToFavorites,
    };
  },
});
</script>

<style scoped>
.notification {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}
</style>
