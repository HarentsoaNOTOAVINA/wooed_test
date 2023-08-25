import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ServicesDetail from '@/pages/nearbyService/ServicesList/ServicesDetail/ServicesDetail.vue'

describe('ServicesDetail.vue', () => {
    it('should render ServicesDetail.vue', () => {
        const wrapper = shallowMount(ServicesDetail)
        expect(wrapper.exists()).toBe(true)
    })
})