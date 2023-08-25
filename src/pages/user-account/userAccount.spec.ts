import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
// @ts-ignore
import UserAccount from './index.vue';

describe('user account ', () => {
    it('should render user account', () => {
        const wrapper = mount(UserAccount);
        expect(wrapper.exists()).toBe(true);
    });
});
