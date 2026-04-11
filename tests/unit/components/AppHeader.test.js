import { mount, flushPromises } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import { createRouter, createMemoryHistory } from 'vue-router';
import AppHeader from '@/components/AppHeader.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    { path: '/', component: { template: '<div>Home</div>' } },
    { path: '/search', component: { template: '<div>Search</div>' } },
  ],
});

const createWrapper = () => {
    return mount(AppHeader, {
      global: {
        plugins: [router]
      }
    });
  };

describe('AppHeader.vue', () => {
  it('renders the logo with the correct alt text', async () => {
    const wrapper = createWrapper();
    const logo = wrapper.find('.logo img');
    expect(logo.exists()).toBe(true);
    expect(logo.attributes('alt')).toBe('TubeTrack Logo');
  });

  it('contains a navigation link to the Home page', async () => {
    const wrapper = createWrapper();
    const homeLink = wrapper.find('.main-nav');
    expect(homeLink.text()).toContain('HOME');
  });

  it('renders the search icon', async () => {
    const wrapper = createWrapper();
    const searchIcon = wrapper.find('.search-icon');
    expect(searchIcon.exists()).toBe(true);
  });

  it('navigates to the search page when the search icon is clicked', async () => {
    const wrapper = createWrapper();
    const searchLink = wrapper.find('.search a');
    await searchLink.trigger('click');
    await flushPromises();
    expect(router.currentRoute.value.path).toBe('/search');
  });
});
