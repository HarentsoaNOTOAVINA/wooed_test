import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import List from './List.vue';
describe('CardProducts.vue', () => {
    it('should render List.vue', () => {
        const wrapper = shallowMount(List);
        expect(wrapper.exists()).toBeTruthy();
    });
});
