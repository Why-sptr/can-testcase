import { defineStore } from 'pinia'
import axios from 'axios'
import { reactive } from 'vue'

const API_KEY = '4459055921b241dba8a460d0a3ce7291'
const BASE_URL = 'https://api.rawg.io/api/games'

interface Game {
  id: number;
}

interface SelectedGame {
  [key: string]: any;
}

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    games: [] as Game[],
    favoriteGames: JSON.parse(localStorage.getItem('favoriteGames') || '[]') as Game[],
    selectedGame: reactive({} as SelectedGame),
    totalPages: 0,
  }),
  actions: {
    async fetchGames(page = 1, pageSize = 8) {
      try {
        const response = await axios.get(
          `${BASE_URL}?key=${API_KEY}&page=${page}&page_size=${pageSize}`
        )
        this.games = response.data.results
        this.totalPages = Math.ceil(response.data.count / pageSize)
      } catch (error) {
        console.error('Error fetching games:', error)
      }
    },

    async searchGames(query: string, page = 1, pageSize = 8) {
      try {
        const response = await axios.get(
          `${BASE_URL}?search=${query}&key=${API_KEY}&page=${page}&page_size=${pageSize}`
        )
        this.games = response.data.results
        this.totalPages = Math.ceil(response.data.count / pageSize)
      } catch (error) {
        console.error('Error searching games:', error)
      }
    },

    addFavorite(game: Game) {
      if (!this.favoriteGames.find((g: Game) => g.id === game.id)) {
        this.favoriteGames.push(game)
        localStorage.setItem('favoriteGames', JSON.stringify(this.favoriteGames))
        return true
      } else {
        return false
      }
    },

    removeFavorite(gameId: number) {
      const index = this.favoriteGames.findIndex((game) => game.id === gameId)
      if (index !== -1) {
        this.favoriteGames.splice(index, 1)
        localStorage.setItem('favoriteGames', JSON.stringify(this.favoriteGames))
      }
    },

    async fetchGameDetail(id: number) {
      try {
        console.log('Fetching game detail for ID:', id)
        Object.keys(this.selectedGame).forEach((key) => {
          delete this.selectedGame[key]
        })

        const response = await axios.get(`${BASE_URL}/${id}?key=${API_KEY}`)
        console.log('Game detail fetched:', response.data)

        Object.assign(this.selectedGame, response.data)
      } catch (error) {
        console.error('Error fetching game details:', error)
      }
    }
  }
})
