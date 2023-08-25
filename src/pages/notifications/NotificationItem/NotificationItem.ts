import { shallowMount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import NotificationItem from './NotificationItem.vue'

describe('NotificationItem.vue', () => {
    it('should render NotificationItem.vue', () => {
        const wrapper = shallowMount(NotificationItem)
        expect(wrapper.exists()).toBe(true)
    })
})