import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { createRouter, createMemoryHistory } from 'vue-router';
import ShowsList from '@/components/ShowsList.vue';
import { useShowsStore } from '@/store/shows';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/show-details/:id', name: 'show-details', component: { template: '<div></div>' } }]
});

describe('ShowsList.vue', () => {
  let wrapper;
  let showsStore;

  beforeEach(() => {
    wrapper = mount(ShowsList, {
      props: { title: 'Drama' },
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn }), router],
        stubs: {
          ShowCard: true
        }
      }
    });

    showsStore = useShowsStore();
    
    showsStore.showsByGenre = {
      'Drama': [
        { id: 1, name: 'Breaking Bad', image: { medium: 'url1' } },
        { id: 2, name: 'Better Call Saul', image: { medium: 'url2' } }
      ]
    };
  });

  it('renders the list title correctly from props', () => {
    expect(wrapper.find('.shows-list-title').text()).toBe('Drama');
  });

  it('renders the correct number of shows', async () => {
    const showLinks = wrapper.findAll('a');
    expect(showLinks.length).toBe(2);
  });

  it('contains links to the correct show details path', () => {
    const firstLink = wrapper.find('a');
    expect(firstLink.attributes('href')).toBe('/show-details/1');
  });
});
