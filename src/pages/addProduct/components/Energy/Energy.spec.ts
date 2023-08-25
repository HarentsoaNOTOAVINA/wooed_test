import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Energy from "@/pages/addProduct/components/Energy/Energy.vue";

describe("Test the Energy component", () => {
      it("should contain the input", () => {
            const wrapper = mount(Energy);

            expect(wrapper.find('').exists()).toBe(true);
      })
})