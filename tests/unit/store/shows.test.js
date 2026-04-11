import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useShowsStore } from '@/store/shows';
import axios from 'axios';

vi.mock('axios');

describe('Shows Store', () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useShowsStore();
  });

  describe('Getters', () => {
    const mockShows = [
      { id: 1, name: 'Low Rated', genres: ['Drama'], rating: { average: 5 } },
      { id: 2, name: 'High Rated', genres: ['Drama', 'Sci-Fi'], rating: { average: 9.5 } },
      { id: 3, name: 'Mid Rated', genres: ['Sci-Fi'], rating: { average: 7 } }
    ];

    it('topShows returns the first show with rating >= 9', () => {
      store.shows = mockShows;
      expect(store.topShows.name).toBe('High Rated');
    });

    it('allGenres returns a unique Set of all genres', () => {
      store.shows = mockShows;
      const genres = store.allGenres;
      expect(genres.has('Drama')).toBe(true);
      expect(genres.has('Sci-Fi')).toBe(true);
      expect(genres.size).toBe(2);
    });

    it('showsByGenre organizes and sorts shows by rating', () => {
      store.shows = [
        { name: 'Average Drama', genres: ['Drama'], rating: { average: 7 } },
        { name: 'Best Drama', genres: ['Drama'], rating: { average: 9 } }
      ];
      const dramaShows = store.showsByGenre['Drama'];
      expect(dramaShows[0].name).toBe('Best Drama');
      expect(dramaShows.length).toBe(2);
    });
  });

  describe('Actions', () => {
    it('fetchShows updates state.shows on success', async () => {
      const mockData = [{ id: 1, name: 'Game of Thrones' }];
      axios.get.mockResolvedValue({ data: mockData });
      await store.fetchShows();
      expect(axios.get).toHaveBeenCalledWith('https://api.tvmaze.com/shows');
      expect(store.shows).toEqual(mockData);
    });

    it('fetchShowDetails updates state.showDetails', async () => {
      const mockShow = { id: 123, name: 'Under the Dome' };
      axios.get.mockResolvedValue({ data: mockShow });
      await store.fetchShowDetails(123);
      expect(axios.get).toHaveBeenCalledWith('https://api.tvmaze.com/shows/123');
      expect(store.showDetails).toEqual(mockShow);
    });

    it('serchShows updates state.searchResult', async () => {
      const mockResults = [{ show: { name: 'Batman' } }];
      axios.get.mockResolvedValue({ data: mockResults });
      await store.serchShows('batman');
      expect(store.searchResult).toEqual(mockResults);
    });

    it('handles errors gracefully', async () => {
      axios.get.mockRejectedValue(new Error('Network Error'));
      await expect(store.fetchShows()).rejects.toThrow('Network Error');
    });
  });
});
