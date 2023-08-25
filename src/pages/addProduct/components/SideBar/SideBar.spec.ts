import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SideBar from "@/pages/addProduct/components/SideBar/SideBar.vue";

describe("Test the SideBar", () => {
      it("Should containa steppers", () => {
            const wrapper = mount(SideBar);

            expect(wrapper.find('').exists()).toBe(true);
      })
})