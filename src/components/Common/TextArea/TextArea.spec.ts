import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import TextArea from "@/components/Common/TextArea/TextArea.vue";

describe("Test the TextArea component", () => {
      it("Should contain the ant design textArea", () => {
            const wrapper = mount(TextArea);

            expect(wrapper.find('').exists()).toBe(true);
      })     
})