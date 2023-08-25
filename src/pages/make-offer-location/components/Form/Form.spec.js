import { describe, it, expect } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
import Form from '../Form/Form.vue';
import InfoIcon from '@/components/Icon/InfoIcon.vue';
import Title from '@/components/Common/Title/Title.vue';
import Modal from '@/components/Display/Modal/Modal.vue';
import DocsResult from '@/components/Display/DocOffer/DocOffer.vue';

import { wrap } from 'module';
import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';

import { Breadcrumb } from 'ant-design-vue';

describe('Form offer location', () => {
    const wrapper = mount(Form);
    it('Should have Info Icon ', () => {
        expect(wrapper.findComponent(InfoIcon).exists()).toBe(true);
    });

    it('Should have Title component', () => {
        expect(wrapper.findComponent(Title).exists()).toBe(true);
    });

    it('Should have a modal component', async () => {
        const modal = wrapper.findComponent(Modal);
        expect(modal.isVisible()).toBe(false);
    });
    
    
});
