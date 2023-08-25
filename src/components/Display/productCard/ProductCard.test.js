// import { mount, shallowMount } from '@vue/test-utils';
// import { describe, expect, it } from 'vitest';
// import ProductCard from './ProductCard.vue';
// describe('HeadProduct.vue', () => {
//     const text = 'menye';
//     const label = 'marion';

//     const headProduct = {
//         components: { ProductCard },
//         template: ` <HeadProduct Text="${text}" label="${label}" />`,
//     };
//     const headProd = mount(headProduct);
//     it('should render HeaderProduct.vue', () => {
//         const wrapper = shallowMount(HeadProduct);
//         expect(wrapper.exists()).toBeTruthy();
//     });
//     it('check props ', () => {
//         expect(headProduct.components.HeadProduct).toBeDefined();
//         expect(headProd.getComponent(HeadProduct).props()).toEqual({
//             Text: text,
//             label: label,
//         });
//     });

//     it('should render valid props', () => {
//         expect(headProd.find('[data-test = "label"]').text).toBe(label);
//         expect(headProd.find('[data-test = "para]').text).toBe(text);
//     });
// });
