import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SubscriptionForm from './SubscriptionForm.vue';

describe('SubscriptionForm.vue', () => {
    it('should render SubscriptionForm.vue', () => {
        const wrapper: VueWrapper = shallowMount(SubscriptionForm);
        expect(wrapper.exists()).toBe(true);
    });
});
