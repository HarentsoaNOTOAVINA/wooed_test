import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Documents from "@/pages/addProduct/components/Documents/Documents.vue";

describe("Test the description component", () => {
      it("Should contain the input", () => {
            const wrapper = mount(Documents);

            expect(wrapper.find('').exists()).toBe(true);
      })
})