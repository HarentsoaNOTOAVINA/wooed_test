import { describe, expect, it } from "vitest";
import SideBar from '@/components/Display/SideBar/index.vue';
import { mount } from "@vue/test-utils";

describe("SideBar", () => {
      it("should contain a menu icon", async () => {
            const wrapper = mount(SideBar);
            expect(wrapper.find('Menu').exists()).toBe(true);
      });
});