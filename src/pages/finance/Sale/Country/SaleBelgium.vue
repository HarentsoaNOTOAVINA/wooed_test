<template>
    <div class="sale-content">
        <Input
            label="Prix global"
            name-input="globalPrice"
            :required="true"
            placeholder="0.00 €"
            @input="handleChange"
        />
        <Input
            label="Charge"
            name-input="charge"
            :required="true"
            placeholder="0.00 €"
            @input="handleChange"
        />
        <Input
            label="Pro fisco du mobilier"
            name-input="proFisco"
            :required="true"
            placeholder="0.00 €"
            @input="handleChange"
        />
    </div>
</template>

<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Radio from '@/components/Common/Radio/Radio.vue';
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';
    import Title from '@/components/Common/Title/Title.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import CheckBox from '@/components/Common/CheckBox/CheckBox.vue';
    import Button from '@/components/Common/Button/Button.vue';

    const route = useRoute();

    const props = defineProps<{
        regionElt: any;
        region: string;
    }>();
    const param = ref<Object>({
        region: props.region,
        country: 'Belgique',
        theProperty: +route.params.id,
    });

    const emit = defineEmits<{
        (fn: 'on-params-change', v: any): void;
    }>();

    watch(
        () => param.value,
        (v) => {
            emit('on-params-change', v);
        },
        { deep: true }
    );

    function handleChange(inputValue: any) {
        let name = '';
        let val = null;
        if (
            inputValue.hasOwnProperty('target') &&
            inputValue.target.type === 'radio'
        ) {
            name = inputValue.target.name;
            val = Number.isNaN(+inputValue.target.value)
                ? inputValue.target.value
                : !!inputValue.target.value;
        } else {
            const [k, v] = Object.entries(inputValue)[0] as any;
            name = k;
            val = +v;
        }

        param.value = {
            ...param.value,
            [name]: val,
        };
    }
</script>

<style scoped lang="scss">
    @import '@/assets/style/calcul_sale.scss';
</style>
