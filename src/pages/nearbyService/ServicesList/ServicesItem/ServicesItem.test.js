import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ServicesItem from '@/pages/nearbyService/ServicesList/ServicesItem/ServicesItem.vue'

describe('ServicesItem.vue', () => {
    it('should render ServicesItem.vue', () => {
        const wrapper = shallowMount(ServicesItem)
        expect(wrapper.exists()).toBe(true)
    })
})