import { defineStore } from 'pinia';
import axios from 'axios';

export const useShowsStore = defineStore('shows', {
  state: () => ({
    shows: [],
  }),
  getters: {
    
  },
  actions: {
    async fetchShows() {
      try {
        const res = await axios.get('https://api.tvmaze.com/shows');
        this.shows = res.data;
      } catch (err) {
        throw err;
      }
    },
  },
});
