import { mount, VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SubscriptionCard from './SubscriptionCard/SubscriptionCard.vue';
import SubscriptionForm from './SubscriptionForm/SubscriptionForm.vue';
import Subscription from './Subscription.vue';

describe('Subscription.vue', () => {
    it('should render', () => {
        const wrapper: VueWrapper = shallowMount(Subscription);
        expect(wrapper.exists()).toBe(true);
    });

    it('should wrap SubscriptionCard & SubscriptionForm', () => {
        const wrapper: VueWrapper = shallowMount(Subscription);
        const SubscriptionCardWrapper: VueWrapper =
            wrapper.findComponent(SubscriptionCard);
        const SubscriptionFormWrapper: VueWrapper =
            wrapper.findComponent(SubscriptionForm);
        expect(wrapper.exists()).toBe(true);
        expect(SubscriptionCardWrapper.exists()).toBe(true);
        expect(SubscriptionFormWrapper.exists()).toBe(false);
    });

    it('should have props [usertype]', async () => {
        const wrapper: VueWrapper = shallowMount(Subscription);
        expect(wrapper.props('userType')).toEqual('');
        wrapper.setProps({ userType: 'particulier' });
        await wrapper.vm.$nextTick();
        expect(wrapper.props('userType')).toEqual('particulier');
    });

    it('should have data [step] init to 0 and render SubscriptionCard ', async () => {
        const wrapper: VueWrapper = shallowMount(Subscription);
        expect((wrapper.vm as any).step).toEqual(0);
        expect(wrapper.findComponent(SubscriptionCard).exists()).toBe(true);
        expect(wrapper.findComponent(SubscriptionForm).exists()).toBe(false);
    });

    it('should render subForm on step = 1', async () => {
        const wrapper: VueWrapper = shallowMount(Subscription);
        (wrapper.vm as any).step = 1;
        await wrapper.vm.$nextTick();
        console.log((wrapper.vm as any).step);
        expect(wrapper.findComponent(SubscriptionCard).exists()).toBe(false);
        expect(wrapper.findComponent(SubscriptionForm).exists()).toBe(true);
    });
});
