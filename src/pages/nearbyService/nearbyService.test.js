import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import nearbyService from '@/pages/nearbyService/index.vue'

describe('nearbyService.vue', () => {
    it('should render nearbyService.vue', () => {
        const wrapper = shallowMount(nearbyService)
        expect(wrapper.exists()).toBe(true)
    })
})