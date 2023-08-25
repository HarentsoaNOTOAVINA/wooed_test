import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Price from "@/pages/addProduct/components/Price/Price.vue";

describe("Test the price component", () => {
      it("should contain the input", () => {
            const wrapper = mount(Price);

            expect(wrapper.find('').exists()).toBe(true);
      });
});