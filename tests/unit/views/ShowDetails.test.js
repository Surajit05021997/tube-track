import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createMemoryHistory } from 'vue-router';
import { nextTick } from 'vue';
import ShowDetails from '@/views/ShowDetails.vue';
import { useShowsStore } from '@/store/shows';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/show/:id', component: { template: '<div></div>' } }]
});

describe('ShowDetails.vue', () => {
  let wrapper;
  let showsStore;

  beforeEach(() => {
    wrapper = mount(ShowDetails, {
      global: {
        plugins: [
          createTestingPinia({ createSpy: vi.fn, stubActions: false }),
          router
        ],
        stubs: { AppButton: true }
      }
    });
  });

  it('shows the loading icon when isLoading is true', async () => {
    wrapper.vm.isLoading = true;
    await nextTick();
    expect(wrapper.find('.loading').exists()).toBe(true);
  });

  it('renders show metadata correctly after data is loaded', async () => {
    showsStore = useShowsStore();
    showsStore.showDetails = {
      name: 'Stranger Things',
      rating: { average: 8.7 },
      runtime: 60,
      genres: ['Drama', 'Sci-Fi'],
      summary: '<p>A group of kids...</p>',
      image: { original: 'test.jpg' }
    };
    wrapper.vm.isLoading = false;
    await nextTick();
    expect(wrapper.find('.show-title').text()).toBe('Stranger Things');
    expect(wrapper.find('.genres-row').text()).toBe('Drama, Sci-Fi');
    expect(wrapper.find('.badge.rating').text()).toBe('8.7');
  });

  it('displays fallback text when rating or runtime is missing', async () => {
    showsStore = useShowsStore();
    showsStore.showDetails = {
      name: 'Mystery Show',
      rating: { average: null },
      runtime: null,
      genres: []
    };
    wrapper.vm.isLoading = false;
    await nextTick();
    expect(wrapper.find('.rating').text()).toBe('N/A');
    expect(wrapper.find('.text-info').text()).toBe('');
  });

  it('shows error message when showDetailsError is true', async () => {
    wrapper.vm.showDetailsError = true;
    wrapper.vm.isLoading = false;
    await nextTick();
    expect(wrapper.find('.show-detail-error').exists()).toBe(true);
    expect(wrapper.text()).toContain('Failed to load show details!');
  });
});
