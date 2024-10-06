<template>
  <div class="container">
    <h3>Daftar Game</h3>
    <div class="row g-3">
      <div class="col-6 col-md-4 col-lg-3 mb-4" v-for="game in paginatedGames" :key="game.id">
        <GameCard :game="game" :isFavorite="false" @toggle-favorite="addToFavorites" />
      </div>
    </div>

    <div v-if="showNotification" class="notification">
      {{ notificationMessage }}
    </div>

    <Pagination :currentPage="currentPage" :totalPages="totalPages" @updatePage="updatePage" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import { useRoute } from 'vue-router';
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
    const route = useRoute();

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

    onMounted(() => {
      const searchQuery = route.query.search as string | undefined;
      if (searchQuery) {
        gameStore.searchGames(searchQuery, currentPage.value, pageSize.value);
      } else {
        gameStore.fetchGames(currentPage.value, pageSize.value);
      }
    });

    const totalPages = computed(() => {
      return gameStore.totalPages;
    });

    const paginatedGames = computed(() => {
      return gameStore.games;
    });

    watch(() => route.query.search, (newSearch) => {
      const searchQuery = newSearch as string | undefined;
      if (searchQuery) {
        gameStore.searchGames(searchQuery, currentPage.value, pageSize.value);
      } else {
        gameStore.fetchGames(currentPage.value, pageSize.value);
      }
      currentPage.value = 1;
    });

    const updatePage = (page: number) => {
      currentPage.value = page;
      const searchQuery = route.query.search as string | undefined;
      if (searchQuery) {
        gameStore.searchGames(searchQuery, currentPage.value, pageSize.value);
      } else {
        gameStore.fetchGames(currentPage.value, pageSize.value);
      }
    };

    return {
      paginatedGames,
      currentPage,
      totalPages,
      updatePage,
      addToFavorites,
      showNotification,
      notificationMessage,
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
