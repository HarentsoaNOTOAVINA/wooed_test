import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import CardItem from './CardItem.vue';

describe('CardItem.vue', () => {
    it('should render CardItem.vue', () => {
        const wrapper: VueWrapper = shallowMount(CardItem);
        expect(wrapper.exists()).toBe(true);
    });

    it('should content type & amount & info & desc props', () => {
        const wrapper: VueWrapper = shallowMount(CardItem);
        expect(wrapper.props('type')).not.toEqual(undefined);
        expect(wrapper.props('amount')).not.toEqual(undefined);
        expect(wrapper.props('desc')).not.toEqual(undefined);
        expect(wrapper.props('info')).not.toEqual(undefined);
    });
});
