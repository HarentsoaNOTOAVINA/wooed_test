import { mount, VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Map from './Map.vue';

describe('Test the Adress component', () => {
    it('Should contain a input', () => {
        const wrapper: VueWrapper = mount(Map);
        expect(wrapper.exists()).toBe(true);
    });
});
