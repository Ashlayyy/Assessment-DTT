import { defineStore } from 'pinia'

export const useFavoritesStore = defineStore({
  id: 'favorites',
  state: () => ({
    favorites: []
  }),
  actions: {
    returnFavorites() {
      return this.$state.favorites;
    },
    addFavorite (favoriteId) {
        this.$state.favorites.push(favoriteId)
    },
    removeFavorite (favoriteId) {
        const index = this.$state.favorites.indexOf(favoriteId);
        this.$state.favorites.splice(index, 1);
    }
  }
})