import { describe, expect, it } from "vitest";
import InputDate from '@/components/Common/InputDate/InputDate.vue'
import { mount } from "@vue/test-utils";


describe("Test the input type date", () => {
      it("Should contain the space container", () => {
            const wrapper = mount(InputDate);

            expect(wrapper.find("Space").exists()).toBe(true);
      });

      it('Should contain the date picker ant design', () => {
            const wrapper = mount(InputDate);
            expect(wrapper.find("DatePicker").exists()).toBe(true);
      })
})