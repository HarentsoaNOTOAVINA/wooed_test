import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";

import HelloWorld from "./HelloWorld.vue";

describe("HelloWorld", () => {
  it("Should check name", () => {
    const value = "John";

    const HelloWorldTest = {
      components: { HelloWorld },
      template: `<hello-world name="${value}" />`,
    };

    const helloWorld = mount(HelloWorldTest);

    expect(helloWorld.getComponent(HelloWorld).props()).toEqual({
      name: value,
    });
  });
});
