import { mount, VueWrapper, shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import UserType from './RegistrationSection/UserType/UserType.vue';
import RegistrationForm from './RegistrationSection/RegistrationFrom/RegistrationForm.vue';
import registration from './registration.vue';

describe('registration.vue', () => {
    it('should render registration cmp', () => {
        const wrapper: VueWrapper = shallowMount(registration);
        expect(wrapper.exists()).toBe(true);
    });

    it('should render UserType cmp and not Sub cmp when usertype not assigned', async () => {
        const wrapper: VueWrapper = shallowMount(registration);
        const userTypeWrapper: VueWrapper = wrapper.findComponent(UserType);
        expect(userTypeWrapper.exists()).toBe(true);
        // unmount on choice made
        (wrapper.vm as any).usertype = 'particulier';
        await wrapper.vm.$nextTick();
        expect(userTypeWrapper.exists()).toBe(false);
    });

    it('should wrapp RegistrationForm', async () => {
        const wrapper: VueWrapper = shallowMount(registration);
        expect(wrapper.findComponent(RegistrationForm).exists()).toBe(false);
        (wrapper.vm as any).usertype = 'particulier';
        await wrapper.vm.$nextTick();
        expect(wrapper.findComponent(RegistrationForm).exists()).toBe(true);
    });
});
