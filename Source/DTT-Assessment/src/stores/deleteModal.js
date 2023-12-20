import { defineStore } from 'pinia'

export const useModalStore = defineStore({
  id: 'modal',
  state: () => ({
    showModal: false
  }),
  actions: {
    getState() {
      return this.$state.showModal
    },
    setState(state) {
      this.$state.showModal = state
    }
  }
})
