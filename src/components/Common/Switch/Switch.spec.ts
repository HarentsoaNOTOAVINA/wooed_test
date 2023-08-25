import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import SwitchBtn from "@/components/Common/Switch/Switch.vue";

describe("Test the switch component", () => {
      it("Should have ant design swith", () => {
            const wrapper = mount(SwitchBtn);

            expect(wrapper.find('Switch').exists()).toBe(true);
      })

});