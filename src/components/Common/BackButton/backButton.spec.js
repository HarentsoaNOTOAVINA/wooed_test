import { describe, it, expect } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import BackButton from '@/components/Common/BackButton/BackButton.vue';
import ArrowBack from '@/components/Icon/ArrowBack.vue';

describe('Back button specs', () => {
    const wrapper = mount(BackButton);
    it('should have the arrow back icon', () => {
        expect(wrapper.findComponent(ArrowBack).exists()).toBe(true);
    });
    it('should have the return text', () => {
        const returnTxt = wrapper.find("[data-test='returnTxt']");
        expect(returnTxt.exists()).toBe(true);
    });
    // it('should emit return event', async () => {
    //     wrapper.vm.returnEmit()
    //     console.log(wrapper.emitted())
    //     expect(wrapper.emitted().return[0]).toEqual(["return"])
    // }); //mbola tsy mety
});
