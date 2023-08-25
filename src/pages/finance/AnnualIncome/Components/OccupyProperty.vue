<template>
    <div class="occupy-property">
        <Input
            name-input="incomeProduction"
            label="Le revenu produit par mon bien s’élève à"
            placeholder="0.00 €"
            @input="handleInput"
        />
        <Input
            name-input="averageRent"
            label="Le loyer moyen auquel je peux louer un bien similaire dans le quartier s’élève à "
            placeholder="0.00 €"
            @input="handleInput"
        />
        <Button
            :is-load="isLoadSubmit"
            @click="handleSubmit"
            :disabled="!params?.incomeProduction || !params?.averageRent"
            class="occupy-property__operation"
            >Enregistrez</Button
        >
    </div>
</template>
<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import { notification } from 'ant-design-vue';
    import { computed, ref } from 'vue';
    import FinancialService from '@/services/FinancialService';
    import { useRoute } from 'vue-router';

    const totalAmount = computed(
        () =>
            (Object.values(params.value as any).reduce(
                (acc: number, curr: any) => +acc + +curr,
                0
            ) as number) * 12
    );
    const route = useRoute();
    interface Params {
        incomeProduction: string | number;
        averageRent: string | number;
    }
    const isLoadSubmit = ref<boolean>(false);
    const params = ref<Params>();

    function handleInput(evt: any) {
        params.value = {
            ...params.value,
            ...evt,
        };
    }

    async function handleSubmit() {
        isLoadSubmit.value = true;
        try {
            const { data } = await FinancialService.updateTotalRevenu({
                theProperty: route.params.id,
                totalRevenu: +totalAmount.value,
            });
            const { code } = data;
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
    .occupy-property {
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
