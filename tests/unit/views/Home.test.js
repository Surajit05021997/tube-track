import { nextTick } from 'vue';
import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import Home from '@/views/Home.vue';
import { useShowsStore } from '@/store/shows';

vi.mock('@/composables/useWatchShow', () => ({
  useWatchShow: vi.fn(() => ({
    watchShow: vi.fn()
  }))
}));

describe('Home.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(Home, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            stubActions: false,
          })
        ],
        stubs: {
          ShowsList: true,
          AppButton: true
        }
      }
    });
  });

  it('shows the loading icon when isLoading is true', async () => {
    wrapper.vm.isLoading = true;
    await nextTick();
    expect(wrapper.find('.loading').exists()).toBe(true);
  });

  it('renders top shows genre lists after data is loaded', async () => {
    const showsStore = useShowsStore();
    showsStore.shows = [{ id: 1, name: 'Breaking Bad', genres: ['Crime'] }];
    showsStore.topShows = { name: 'Breaking Bad', summary: 'Best show ever', image: { original: '' } };
    showsStore.allGenres = new Set(['Crime']);
    wrapper.vm.isLoading = false;
    wrapper.vm.showsError = false;
    await nextTick();
    expect(wrapper.find('.loading').exists()).toBe(false);
    expect(wrapper.find('.top-show-title').text()).toBe('Breaking Bad');
    expect(wrapper.findAllComponents({ name: 'ShowsList' }).length).toBe(1);
  });

  it('shows error message when showsError is true', async () => {
    wrapper.vm.showsError = true;
    wrapper.vm.isLoading = false;
    await nextTick();
    expect(wrapper.find('.show-error').exists()).toBe(true);
  });
});
