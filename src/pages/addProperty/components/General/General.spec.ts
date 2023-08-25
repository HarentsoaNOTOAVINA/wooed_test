import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import General from "@/pages/addProduct/components/General/General.vue";

describe("Test the General page", () => {
      it("Should contain the input", () => {
            const wrapper = mount(General);

            expect(wrapper.find('').exists()).toBe(true);
      })
})