import { mount } from '@vue/test-utils';
// import store from '@/store';
import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it, beforeEach, vitest } from 'vitest';
import SubscriptionCard from './SubscriptionCard.vue';

describe('SubscriptionCard.vue', () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
        wrapper = mount(SubscriptionCard, {
            global: {
                mocks: {
                    $store: {
                        state: 0,
                        commit: vitest.fn(),
                        getters: vitest.fn(),
                    },
                },
            },
        });
    });
    it('should render SubscriptionCard.vue', () => {
        // const wrapper: VueWrapper = shallowMount(SubscriptionCard);
        expect(wrapper.exists()).toBe(true);
    });
    it('should have userType props and empty array on cardTypes', () => {
        const wrapper: VueWrapper = shallowMount(SubscriptionCard);
        expect(wrapper.props('userType')).toEqual('');
        expect((wrapper.vm as any).cardTypes).toEqual([]);
    });

    it('should hanlde apropriate userType props on mount', () => {
        const wrapper: VueWrapper = shallowMount(SubscriptionCard, {
            props: {
                userType: 'particulier',
            },
        });
        expect(wrapper.props('userType')).toEqual('particulier');
    });

    it('should hanlde apropriate cardType to PARTICULIER usertype props on mount', async () => {
        const wrapper: VueWrapper = shallowMount(SubscriptionCard, {
            props: {
                userType: 'particulier',
            },
        });
        expect((wrapper.vm as any).cardTypes).toEqual([
            'Economique',
            'Premium',
            'Gold',
            'Gratuit',
        ]);
    });

    it('should hanlde apropriate cardType to particulier usertype props on mount', async () => {
        const wrapper: VueWrapper = shallowMount(SubscriptionCard, {
            props: {
                userType: 'professionnel',
            },
        });
        expect((wrapper.vm as any).cardTypes).toEqual([
            'Basic',
            'Premium',
            'Gold',
            'Gratuit',
        ]);
    });
});
