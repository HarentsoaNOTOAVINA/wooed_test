import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Assurance } from '@/pages/assurance/assurance.vue';
import { SideBar } from '@/components/Display/SideBar/index.vue';

describe("Test the page assurance", () => {
      it("should contain the Sidebar component", async () => {
            const wrapper = mount(Assurance);
            expect(wrapper.findComponent(SideBar).exists()).toBe(true);
      })      
})