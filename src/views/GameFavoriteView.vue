<template>
  <div class="container">
    <h3>Game Favorit</h3>
    <div class="row g-3">
      <div class="col-6 col-md-4 col-lg-3 mb-4" v-for="game in paginatedFavoriteGames" :key="game.id">
        <GameCard :game="game" :isFavorite="true" @toggle-favorite="removeFavorite" />
      </div>
    </div>

    <div v-if="showNotification" class="notification">
      {{ notificationMessage }}
    </div>

    <Pagination :currentPage="currentPage" :totalPages="totalPages" @updatePage="updatePage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import Pagination from '@/components/Pagination.vue';
import GameCard from '@/components/GameCard.vue';

interface Game {
  id: number;
  name: string;
}

export default defineComponent({
  components: {
    Pagination,
    GameCard,
  },
  setup() {
    const gameStore = useGameStore();
    const currentPage = ref(1);
    const pageSize = ref(16);
    const showNotification = ref(false);
    const notificationMessage = ref('');

    const paginatedFavoriteGames = computed(() => {
      const start = (currentPage.value - 1) * pageSize.value;
      const end = start + pageSize.value;
      return gameStore.favoriteGames.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(gameStore.favoriteGames.length / pageSize.value);
    });

    const removeFavorite = (game: Game) => {
      gameStore.removeFavorite(game.id);
      notificationMessage.value = `${game.name} berhasil dihapus dari favorit!`;
      showNotification.value = true;

      setTimeout(() => {
        showNotification.value = false;
      }, 1000);
    };

    const updatePage = (page: number) => {
      currentPage.value = page;
    };

    return {
      paginatedFavoriteGames,
      currentPage,
      totalPages,
      removeFavorite,
      showNotification,
      notificationMessage,
      updatePage,
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
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}
</style>
