import { shallowMount, VueWrapper, RouterLinkStub } from '@vue/test-utils';
import { describe, expect, it, beforeEach } from 'vitest';
import Login from './Login.vue';

describe('Login.vue', () => {
    let wrapper: VueWrapper;
    beforeEach(() => {
        wrapper = shallowMount(Login, {
            global: {
                stubs: { RouterLink: RouterLinkStub },
            },
        });
    });
    it('should render Login.vue', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('should wrap be a valid form {<form></form>}', () => {
        expect(wrapper.find('form').exists()).toBeTruthy();
    });

    it('should have form who wrap input:text&&password && button:submit', () => {
        const form = wrapper.find('form');
        const emailInput = wrapper.find('#username');
        const passwordInput = wrapper.find('#password');
        const submitButton = wrapper.find('button[type=submit]');

        expect(form.findAll('input').length).toBe(2);
        expect(emailInput.attributes('type')).toEqual('username');
        expect(passwordInput.attributes('type')).toEqual('password');
        expect(submitButton.attributes('type')).toEqual('submit');
    });
});
