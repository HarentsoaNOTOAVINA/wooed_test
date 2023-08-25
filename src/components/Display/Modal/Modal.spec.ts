import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import Modal from "@/components/Display/Modal/Modal.vue";

describe("Test the modal component", () => {
      it("should has an input",() => {
            const wrapper = mount(Modal);

            expect(wrapper.find('input').exists()).toBe(true)
      })
})