import { defineStore } from 'pinia'

export const useIdStore = defineStore({
  id: 'id',
  state: () => ({
    id: 2
  }),
  actions: {
    returnId() {
      return this.$state.id;
    },
    setId (id) {
      if (this.$state.id >= 2) {
        this.$state.id = id;
      } else return 'No valid id!'
    }
  }
})