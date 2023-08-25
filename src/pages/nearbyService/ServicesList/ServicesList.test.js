import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ServicesList from '@/pages/nearbyService/ServicesList/ServicesList.vue'

describe('ServicesList.vue', () => {
    it('should render ServicesList.vue', () => {
        const wrapper = shallowMount(ServicesList)
        expect(wrapper.exists()).toBe(true)
    })
})