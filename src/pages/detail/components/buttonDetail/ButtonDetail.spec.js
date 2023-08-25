import { describe, it, expect } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import ButtonDetail from '@/pages/detail/component/buttonDeatil/ButtonDetail.vue';
import ButtonMenu from '@/components/Common/ButtonMenu/ButtonMenu.vue';
describe('Buttons detail', () => {
    it('Button exist', () => {
        const wrapper = mount(ButtonDetail);
        expect(wrapper.findComponent(ButtonMenu).exists()).toBe(true);
        // const btn = wrapper.find("[data-test='btn']");
        // expect(btn.exists()).toBe(true);
    });
    it('Button length', () => {
        const wrapper = mount(ButtonDetail);
        expect(wrapper.findAllComponents(ButtonMenu).length).toBe(8);
    });
});
