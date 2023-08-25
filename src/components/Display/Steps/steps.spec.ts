import { mount } from "@vue/test-utils"
import { describe, expect, it } from "vitest"
import Steps from '@/components/Display/Steps/index.vue';

describe('Steps', () => {
      it("shuld contain a test", () => {
            const wrapper = mount(Steps);

            expect(wrapper.findComponent('a-steps').exists());
      })
})