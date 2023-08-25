import { mount, RouterLinkStub, VueWrapper } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { nextTick } from 'vue';
import AppHeader from './AppHeader.vue';

describe('AppHeader.vue', async () => {
    const wrapper: VueWrapper | any = mount(AppHeader, {
        global: {
            stubs: {
                RouterLink: RouterLinkStub,
            },
        },
    });
    it('should be mounted', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('should wrap anonymous user link (5)', async () => {
        // await wrapper.setData({ isLoggedIn: false });
        const links = wrapper.findAllComponents(RouterLinkStub);
        expect(links.length).toEqual(5);
        // expect(links[0].text()).toEqual('HOME');
        // expect(links[1].text()).toEqual('ABOUT');
        // expect(links[2].text()).toEqual('CONNEXION');
        // expect(links[3].text()).toEqual('INSCRIPTION');
        // expect(links[4].text()).toEqual('MON COMPTE');
        // expect(links[5].text()).toEqual('DECONNEXION');
        const arrayLink: Array<string> = [];
        for (const link of links) {
            arrayLink.push(link.text());
        }

        expect(wrapper.html()).toContain('CONNEXION');
        wrapper.vm.isLoggedIn = true;
        await nextTick();
        console.log(links[2].text());
        expect(links[2].isVisible()).toBe(true);
    });
});
