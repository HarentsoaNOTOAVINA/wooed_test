import { describe, it, expect } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import index from '../../pages/detail/index.vue';

describe('Index detail', () => {
    it('Should have BreadCrumb:', () => {
        const wrapper = mount(index);
        expect(wrapper.find('BreadCrumb').exists()).toBe(true);
    });
    it('Should have an image', () => {
        const wrapper = mount(index);
        expect(wrapper.find('img').exists()).toBe(true);
    });
    it('Should have HeadProduct:', () => {
        const wrapper = mount(index);
        const headProduct = wrapper.find("[data-test='headProduct']");
        expect(headProduct.exists()).toBe(true);
    });
    it('Should have the btn down side img', () => {
        const wrapper = mount(index);
        const btnDownSide = wrapper.find("[data-test='btnDownSide']");
        expect(btnDownSide.exists()).toBe(true);
    });
    it('Should have a property type', () => {
        const wrapper = mount(index);
        const propertyType = wrapper.find("[data-test='propertyType']");
        expect(propertyType.exists()).toBe(true);
    });
    it('Should have a property price', () => {
        const wrapper = mount(index);
        const propertyPrice = wrapper.find("[data-test='propertyPrice']");
        expect(propertyPrice.exists()).toBe(true);
    });
    it('Should have view number', () => {
        const wrapper = mount(index);
        const propertyViewNumber = wrapper.find("[data-test='viewNumber']");
        expect(propertyViewNumber.exists()).toBe(true);
    });
    it('Should have view property saved number', () => {
        const wrapper = mount(index);
        const propertySaved = wrapper.find("[data-test='propertySaved']");
        expect(propertySaved.exists()).toBe(true);
    });
    it("Should have number offer", () => {
        const wrapper = mount(index);
        const offerSent = wrapper.find("[data-test='offerSent']");
        expect(offerSent.exists()).toBe(true);
    })
});
