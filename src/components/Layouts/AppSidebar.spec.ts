import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import AppSideBar from './AppSidebar.vue';

describe('AppSidebar.vue', () => {
    it('should render AppSidebar', () => {
        const wrapper = shallowMount(AppSideBar);
        expect(wrapper.exists()).toBe(true);
    });
});
