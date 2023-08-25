import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CardWrapper from './CardWrapper.vue';

describe('CardWrapper.vue', () => {
    it('should render wrappercard', () => {
        const wrapper: VueWrapper = shallowMount(CardWrapper);
        expect(wrapper.exists()).toBe(true);
    });
});
