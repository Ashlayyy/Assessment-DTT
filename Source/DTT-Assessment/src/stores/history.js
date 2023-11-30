import { defineStore } from 'pinia'

export const useHistoryStore = defineStore({
  id: 'history',
  state: () => ({
    history: [],
    limit: 5
  }),
  actions: {
    returnHistory() {
      return this.$state.history;
    },
    addToHistory (id) {
      if (this.$state.history.length == 5) {this.removeFirstHistory()};
      this.$state.history.push(id)
    },
    contains (id) {
      const index = this.$state.history.indexOf(id);
      return index == -1 ? false : true;
    },
    removeFirstHistory () {
        this.$state.history.splice(0, 1);
    },
    setLimit (limit) {
      if (limit) this.$state.limit = limit; else this.$state.limit = 5;
    }
  }
})