import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import ShowCard from '@/components/ShowCard.vue';

describe('ShowCard.vue', () => {
  it('renders the image with the correct src attribute', () => {
    const mockUrl = 'https://example.com/show-poster.jpg';
    const wrapper = mount(ShowCard, {
      props: {
        imgUrl: mockUrl
      }
    });
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(mockUrl);
  });
});
