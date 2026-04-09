import { defineStore } from 'pinia';
import axios from 'axios';

export const useShowsStore = defineStore('shows', {
  state: () => ({
    shows: [],
  }),
  getters: {
    topShows: (state) => {
      return state.shows.filter((show) => show?.rating?.average >= 8.5).slice(0, 10);
    }
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
