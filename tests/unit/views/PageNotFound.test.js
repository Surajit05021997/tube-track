import { mount } from '@vue/test-utils';
import { describe, it, expect, beforeEach } from 'vitest';
import { createRouter, createMemoryHistory } from 'vue-router';
import PageNotFound from '@/views/PageNotFound.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: '/', name: 'home', component: { template: '<div>Home</div>' } }]
});

describe('PageNotFound.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(PageNotFound, {
      global: {
        plugins: [router],
        stubs: {
          AppButton: true
        }
      }
    });
  });

  it('renders the 404 error code and message', () => {
    expect(wrapper.find('.error-code').text()).toBe('404');
    expect(wrapper.find('.error-message').text()).toBe('Page not found!');
  });

  it('contains a RouterLink that points to the home page', () => {
    const link = wrapper.find('a');
    expect(link.attributes('href')).toBe('/');
  });
});
