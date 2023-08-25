import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProgressCircle from './ProgressCircle.vue';

describe('ProgressCircle.vue', () => {
    it('should render ProgressCircle.vue', () => {
        const wrapper = mount(ProgressCircle);
        expect(wrapper.exists()).toBe(true);
    });
});
