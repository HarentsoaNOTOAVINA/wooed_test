import { describe, it, expect } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import DetailedInfo from '@/pages/detail/components/detailedInfo/DetailedInfo.vue';
import PebG from '@/components/Icon/PebG.vue';

describe('DetailedInfo component', () => {
    const wrapper = mount(DetailedInfo);
    it('Should have cadastre price', () => {
        const cadastrePrice = wrapper.find("[data-test='cadastrePrice']");
        expect(cadastrePrice.exists()).toBe(true);
    });
    it('Should have revenu cadastral price', () => {
        const rvCadastrePrice = wrapper.find("[data-test='rvCadastrePrice']");
        expect(rvCadastrePrice.exists()).toBe(true);
    });
    it('Should have reference price', () => {
        const reference = wrapper.find("[data-test='reference']");
        expect(reference.exists()).toBe(true);
    });
    it("Should have energie primaire price", () => {
        const eneregiePrimaire = wrapper.find("[data-test='energiePrimaire']")
        expect(eneregiePrimaire.exists()).toBe(true)
    })
    it("Should have a PEB icon", () => {
        expect(wrapper.findComponent(PebG).exists()).toBe(true)
    })
});
