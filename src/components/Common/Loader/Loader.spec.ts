import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Loader from './Loader.vue';
describe('Loader.vue', () => {
    it('should render Loader.vue', () => {
        const wrapper = mount(Loader);
        expect(wrapper.exists()).toBe(true);
    });
});
