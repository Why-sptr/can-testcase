<template>
  <router-link :to="`/games/${game.id}`" :class="['card h-100 game-card', { 'dark-mode': isDarkMode }]">
    <img :src="game.background_image" class="card-img-top" alt="game cover">
    <div class="card-body d-flex flex-column justify-content-between">
      <div>
        <h6 class="card-title">{{ game.name }}</h6>
        <p>Rating: <span v-html="renderStars(game.rating)" class="rating"></span></p>
      </div>
      <button @click.prevent="toggleFavorite" class="btn" :class="isFavorite ? 'btn-danger' : 'btn-primary'">
        {{ isFavorite ? 'Hapus dari Favorit' : 'Tambah ke Favorit' }}
      </button>
    </div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    game: {
      type: Object,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isDarkMode: { // New prop for dark mode
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const renderStars = (rating: number) => {
      const starCount = Math.round(rating);
      return '★'.repeat(starCount) + '☆'.repeat(5 - starCount);
    };

    const toggleFavorite = () => {
      emit('toggle-favorite', props.game);
    };

    return {
      renderStars,
      toggleFavorite,
    };
  },
});
</script>

<style scoped>
.card-img-top {
  height: 200px;
  object-fit: cover;
  width: 100%;
}

.game-card {
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: #ffffff; /* Light mode background */
  border: 1px solid #ccc; /* Light mode border */
}

.game-card.dark-mode {
  background-color: #1e1e1e; /* Dark mode background */
  color: #ffffff; /* Dark mode text color */
  border: 1px solid #444; /* Dark mode border */
}

.game-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.rating {
  color: gold;
  font-size: 1.2em;
}
</style>
