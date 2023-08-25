<template>
    <div class="rent-property">
        <Input
            name-input="prospectiveRent"
            label="Loyer prospectif mensuel(€)"
            placeholder="0.00 €"
            :value="params.prospectiveRent"
            @input="handleInput"
        />
        <Select
            label="Taux d’imposition à l’impôt sur les revenus(%)"
            name="taxRate"
            :options="options"
            placeholder="Selectionnez"
            @change-select="handleInput"
            :disabled="!params.prospectiveRent"
        />
        <Button
            class="rent-property__operation"
            @click="handleSubmit"
            :is-load="isLoadSubmit"
            :disabled="!params.prospectiveRent"
            >Enregistrez</Button
        >
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import { computed, ref, watch } from 'vue';
    import FinancialService from '@/services/FinancialService';
    import { useRoute } from 'vue-router';
    import { notification } from 'ant-design-vue';

    const route = useRoute();
    interface Params {
        prospectiveRent: string | number;
        taxRate: string | number;
    }
    const params = ref<Params>({
        prospectiveRent: 1000,
        taxRate: '',
    });

    const isLoadSubmit = ref<boolean>(false);

    const totalRent = computed(
        () =>
            (Object.values(params.value).reduce(
                (acc, curr) => +acc + +curr,
                0
            ) as number) * 12
    );

    watch(
        () => totalRent.value,
        (v) => console.log(v)
    );
    const options = ref<{ value: number; label: string }[]>([
        { value: 0, label: 'N/A' },
        { value: 20, label: '20%' },
        { value: 30, label: '30%' },
        { value: 40, label: '40%' },
    ]);

    function handleInput(evt: any) {
        const [k, v] = Object.entries(evt)[0] as any;
        switch (k) {
            case 'taxRate':
                params.value = {
                    ...params.value,
                    taxRate: (+v * +params.value.prospectiveRent) / 100,
                };
                break;
            default:
                params.value = {
                    ...params.value,
                    ...evt,
                };
                break;
        }
    }

    async function handleSubmit() {
        isLoadSubmit.value = true;
        try {
            const { data } = await FinancialService.updateTotalRevenu({
                theProperty: route.params.id,
                totalRevenu: +totalRent.value,
            });
            const {code} = data;
            console.log(code);
            if (code === 201) {
                notification.success({
                    message: `Vos données sont enregistrées`,
                });
            }
        } catch (error) {
            notification.error({
                message: `Une erreur est survenue, veuillez reessayez`,
            });
        } finally {
            isLoadSubmit.value = false;
        }
    }
</script>
<style lang="scss" scoped>
    .rent-property {
        &__operation {
            @apply flex justify-end;
            &:deep() {
                button {
                    @apply w-full md:w-auto;
                }
            }
        }
    }
</style>
