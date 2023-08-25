import { VueWrapper, mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Confirmation from './Confirmation.vue';

describe('Confirmation.vue', () => {
    it('should render Confirmation.vue', () => {
        const wrp: VueWrapper = mount(Confirmation);
        expect(wrp.exists()).toBe(true);
    });
});
