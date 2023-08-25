import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Inside from "@/pages/addProduct/components/Inside/Inside.vue";

describe('Test the inside component', () => {
      it("Should contain a input", () => {
            const wrapper = mount(Inside);

            expect(wrapper.find('').exists()).toBe(true);
      });
});