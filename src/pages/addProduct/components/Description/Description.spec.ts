import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Description from "@/pages/addProduct/components/Description/Description.vue";

describe("Test the Description component", () => {
      it("Should contain an input", () => {
            const wrapper = mount(Description);

            expect(wrapper.find('').exists()).toBe(true);
      })
})