import { VueWrapper, shallowMount, mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import MakeOffer from './MakeOffer.vue';
import FormMakeOffer from './formulaire/FormMakeOffer.vue';

describe('FormMakeOffer.vue, formulaire to add a new offer', () => {
    test('check if the Component formulaire exist', () => {
        const wrapper: VueWrapper = mount(MakeOffer);

        const bars = wrapper.findComponent(FormMakeOffer)
        expect(bars.exists()).toBe(true);
    });

});
