import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import PageNotFound from '@/pages/error/404.vue';

describe('404.vue', () => {
    it('should render 404.vue', () => {
        const wrapper: VueWrapper = mount(PageNotFound);
        expect(wrapper.exists()).toBe(true);
    });
});
