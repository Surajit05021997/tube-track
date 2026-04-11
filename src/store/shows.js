import { defineStore } from 'pinia';
import axios from 'axios';

export const useShowsStore = defineStore('shows', {
  state: () => ({
    shows: [],
    showDetails: null,
    searchResult: [],
  }),
  getters: {
    topShows: (state) => {
      return state.shows.filter((show) => show?.rating?.average >= 9)[0];
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

      Object.keys(showsByGenre).forEach((genre) => {
        showsByGenre[genre].sort((a, b) => {
          const ratingA = a.rating?.average || 0;
          const ratingB = b.rating?.average || 0;
          return ratingB - ratingA;
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
    async serchShows(searchText) {
      try {
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchText}`);
        this.searchResult = res.data;
      } catch (err) {
        throw err;
      }
    },
  },
});
