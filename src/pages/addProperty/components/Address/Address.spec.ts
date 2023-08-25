import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Address from '@/pages/addProduct/components/Address/Address.vue';


describe('Test the Adress component', () => {
      it("Should contain a input", () => {
            const wrapper = mount(Address);

            expect(wrapper.find('').exists()).toBe(true);
      })
});