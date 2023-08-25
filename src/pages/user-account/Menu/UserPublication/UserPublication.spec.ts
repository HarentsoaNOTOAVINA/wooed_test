import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
// @ts-ignore
import UserPublication from '@/pages/user-account/Menu/UserPublication/UserPublication.vue';

describe('UserPublication.vue', () => {
    it('should render UserPublication.vue', () => {
        const wrapper = shallowMount(UserPublication);
        expect(wrapper.exists()).toBe(true);
    });
});
