import { defineStore } from 'pinia';
import axios from 'axios';

export const useShowsStore = defineStore('shows', {
  state: () => ({
    shows: [],
    showDetails: null,
  }),
  getters: {
    topShows: (state) => {
      return state.shows.filter((show) => show?.rating?.average >= 8.5).slice(0, 10);
    },
    allGenres: (state) => {
      const genresSet = new Set();
      state.shows.forEach((show) => {
        show.genres.forEach((genre) => {
          genresSet.add(genre);
        });
      });
      return genresSet;
    },
    showsByGenre: (state) => {
      const showsByGenre = {};
      state.shows.forEach((show) => {
        show.genres.forEach((genre) => {
          if (!showsByGenre[genre]) {
            showsByGenre[genre] = [];
          }
          showsByGenre[genre].push(show);
        });
      });
      return showsByGenre;
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
    async fetchShowDetails(showId) {
      try {
        const res = await axios.get(`https://api.tvmaze.com/shows/${showId}`);
        this.showDetails = res.data;
      } catch (err) {
        throw err;
      }
    },
  },
});
