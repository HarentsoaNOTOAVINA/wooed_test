import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from './Input.vue';

describe('Input.vue', () => {
    it('should render Input.vue', () => {
        const wrapper = mount(Input);
        expect(wrapper.exists()).toBe(true);
    });
});
