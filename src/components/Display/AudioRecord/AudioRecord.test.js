import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import AudioRecord from '@/components/Display/AudioRecord/AudioRecord';

describe("Test the AudioRecord component", () => {
      it("shuld contain the input of photos", () => {
            const wrapper = mount(AudioRecord);

            expect(wrapper.find('').exists()).toBe(true);
      })
})