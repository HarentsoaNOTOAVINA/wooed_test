import {mount } from "@vue/test-utils";
import { describe, expect, it } from 'vitest';
import MMB from "@/pages/miniMailBox/miniMailBox.vue";
import { execPath } from "node:process";

describe('Test Mini Mail Box', () => { 
    const wrapper = mount(MMB);
    //refs :  categories, mailList = [];

    //
    it("component instance exist",()=>{
        expect(wrapper.exists()).toBe(true);
    })
    //
    // it('list of categories on mounted', ()=>{
    //     expect(wrapper.vm.categories).toEqual([]);

    // })

    // it('list of mail on mounted', ()=>{
    //     expect(Array.isArray(wrapper.vm.mailList)).toBeTruthy();
    // })
 })