import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createMemoryHistory } from 'vue-router';
import { nextTick } from 'vue';
import SearchPage from '@/views/SearchPage.vue';
import { useShowsStore } from '@/store/shows';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/search/:searchText', component: { template: '<div></div>' } }]
});

describe('SearchPage.vue', () => {
  let wrapper;
  let showsStore;

  beforeEach(() => {
    wrapper = mount(SearchPage, {
      global: {
        plugins: [
          createTestingPinia({ createSpy: vi.fn, stubActions: false }),
          router
        ],
        stubs: { ShowCard: true }
      }
    });
  });

  it('updates the input field v-model', async () => {
    const input = wrapper.find('.search-bar');
    await input.setValue('Superman');
    expect(wrapper.vm.searchText).toBe('Superman');
  });

  it('triggers navigation when enter is pressed', async () => {
    const pushSpy = vi.spyOn(router, 'push');
    const input = wrapper.find('.search-bar');
    await input.setValue('Flash');
    await input.trigger('keyup.enter');
    expect(pushSpy).toHaveBeenCalledWith({ path: '/search/Flash' });
  });

  it('displays "No shows found!" when store result is empty', async () => {
    showsStore = useShowsStore();
    showsStore.searchResult = [];
    wrapper.vm.isLoading = false;
    wrapper.vm.noShowsFound = true;
    await nextTick();
    expect(wrapper.text()).toContain('No shows found!');
  });

  it('renders a list of shows from the store', async () => {
    showsStore = useShowsStore();
    showsStore.searchResult = [
      { show: { id: 1, name: 'Batman', image: { medium: 'url' } } }
    ];
    wrapper.vm.isLoading = false;
    await nextTick();
    const links = wrapper.findAll('a');
    expect(links.some(link => link.attributes('href').includes('/show-details/1'))).toBe(true);
  });
});
