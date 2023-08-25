import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import Add from '@/pages/addProduct/addProduct.vue';
import SideBar from '@/components/Display/SideBar/index.vue';



describe("Test the page add", () => {
      it("should contain the Sidebar component", async () => {
            const wrapper = mount(Add);
            expect(wrapper.findComponent(SideBar).exists()).toBe(true);
      })      
})