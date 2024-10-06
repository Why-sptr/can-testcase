<template>
  <div class="container">
    <div v-if="!Object.keys(game).length">
      <p>Loading...</p>
    </div>

    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <img :src="game.background_image" class="card-img-top" alt="game cover">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <p><strong>Genre:</strong></p>
                <div class="genre-container">
                  <span class="genre" v-for="genre in game.genres" :key="genre.id">{{ genre.name }}</span>
                </div>
              </div>
              <div class="col-md-6">
                <p><strong>Rating:</strong></p>
                <p>
                  <span v-html="renderStars(game.rating)" class="rating"></span>
                </p>
              </div>
            </div>
            <hr class="separator">
            <h5 class="card-title">{{ game.name }}</h5>
            <p v-html="game.description_raw"></p>
          </div>
        </div>
      </div>
      
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Informasi</h5>
            <img :src="game.background_image_additional" alt="Gambar Tambahan" class="img-fluid mb-4" />
            <div class="d-flex justify-content-between">
              <h6>Rilis:</h6>
              <span class="text-end">{{ game.released || 'N/A' }}</span>
            </div>
            <hr class="separator">
            <div class="d-flex justify-content-between">
              <h6>Platform:</h6>
              <span class="text-end" v-if="game.platforms">{{ game.platforms.map(p => p.platform.name).join(', ') }}</span>
            </div>
            <hr class="separator">
            <div class="d-flex justify-content-between">
              <h6>Toko:</h6>
              <span class="text-end" v-if="game.stores">{{ game.stores.map(s => s.store.name).join(', ') }}</span>
            </div>
            <hr class="separator">
            <div class="d-flex justify-content-between">
              <h6>Pengembang:</h6>
              <span class="text-end" v-if="game.developers">{{ game.developers.map(d => d.name).join(', ') }}</span>
            </div>
            <hr class="separator">
            <div class="d-flex justify-content-between">
              <h6>Penerbit:</h6>
              <span class="text-end" v-if="game.publishers">{{ game.publishers.map(p => p.name).join(', ') }}</span>
            </div>
            <hr class="separator">
            <div class="d-flex justify-content-between">
              <h6>Tags:</h6>
              <span class="text-end" v-if="game.tags">{{ game.tags.map(t => t.name).join(', ') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue';
import { useGameStore } from '@/stores/gameStore';
import { useRoute } from 'vue-router';

interface Game {
  id: number;
  name: string;
  background_image: string;
  description_raw: string;
  genres: { id: number; name: string }[];
  rating: number;
  released: string;
  platforms: { platform: { name: string } }[];
  stores: { store: { name: string } }[];
  developers: { name: string }[];
  publishers: { name: string }[];
  tags: { name: string }[];
  background_image_additional: string;
}

export default defineComponent({
  setup() {
    const gameStore = useGameStore();
    const route = useRoute();

    const fetchGame = () => {
      console.log("Fetching game detail with ID:", route.params.id);
      gameStore.fetchGameDetail(Number(route.params.id));
    };

    onMounted(() => {
      fetchGame();
    });

    watch(
      () => route.params.id,
      () => {
        fetchGame();
      }
    );

    const renderStars = (rating: number) => {
      const starCount = Math.round(rating);
      return '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
    };

    return {
      game: gameStore.selectedGame as Game,
      renderStars,
    };
  },
});
</script>

<style scoped>
.card-img-top {
  height: 500px;
  object-fit: cover;
  width: 100%;
}

.genre-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.genre {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 5px 10px;
  background-color: #f8f9fa;
  color: #000;
}

body.dark-mode .genre {
  border: 1px solid #444;
  background-color: #2a2a2a;
  color: #ffffff;
}

.rating {
  color: gold;
  font-size: 1.2em;
}

.separator {
  border: none;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
}
</style>
