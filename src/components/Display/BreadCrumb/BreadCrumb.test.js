import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BreadCrumb from './BreadCrumb.vue';

describe("BreadCrumb specs", () => {
    it("should get items props", () => {
        const value = ""
        const BreadTest = {
            components: {BreadCrumb},
            template: `<BreadCrumb :items="${value}" />`
        }
        const wrapper =  mount(BreadTest)

        expect(wrapper.getComponent(BreadCrumb).props()).toEqual({
            items: value
        })
    })
})
