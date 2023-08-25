import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Photos from "@/pages/addProduct/components/Photos/Photos.vue";

describe("Test the Photos component", () => {
      it("shuld contain the input of photos", () => {
            const wrapper = mount(Photos);

            expect(wrapper.find('').exists()).toBe(true);
      })
})