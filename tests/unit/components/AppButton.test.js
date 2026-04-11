import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import AppButton from '@/components/AppButton.vue';

describe('AppButton.vue', () => {
  it('renders the correct text provided by the btnText prop', () => {
    const testText = 'Watch Now';
    const wrapper = mount(AppButton, {
      props: { btnText: testText }
    });
    expect(wrapper.find('.button-text').text()).toBe(testText);
  });

  it('renders a button element', () => {
    const wrapper = mount(AppButton, {
      props: { btnText: 'Click Me' }
    });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('emits a click event when clicked', async () => {
    const wrapper = mount(AppButton, {
      props: { btnText: 'Submit' }
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
});
