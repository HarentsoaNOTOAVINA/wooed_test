import { VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import FormMakeOffer from './FormMakeOffer.vue';

describe('FormMakeOffer.vue, formulaire to add a new offer', () => {
    const wrapper: VueWrapper = shallowMount(FormMakeOffer);
    test('check if the Component formulaire exist', () => {
        expect(wrapper.exists()).toBe(true);
    });

    test('check if the id of differentes type of input has a name valied', () => {
        const name = wrapper.find('#name');
        const firstname = wrapper.find('#firstname');
        const phoneNumber = wrapper.find('#phoneNumber');
        const email = wrapper.find('#email');
        const priceOffer = wrapper.find('#priceOffer');
        const conditionCredit = wrapper.find('#conditionCredit');
        const amountCredit = wrapper.find('#amountCredit');

        expect(name.element.id).toBe('name');
        expect(firstname.element.id).toBe('firstname');
        expect(phoneNumber.element.id).toBe('phoneNumber');
        expect(email.element.id).toBe('email');
        expect(priceOffer.element.id).toBe('priceOffer');
        expect(conditionCredit.element.id).toBe('conditionCredit');
        expect(amountCredit.element.id).toBe('amountCredit');
    });
});
