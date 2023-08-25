<template>
    <div class="municipality-tax__container">
        <finance-card
            label-button="Enregistré"
            label-title="Taxes"
            :municipality-tax="(totalTax as number)"
        >
            <Loader v-if="isLoadTaxes" />
            <div v-else class="municipality-tax__content">
                <div
                    v-if="!taxList.length"
                    class="municipality-tax__content--empty"
                >
                    <a-empty
                        description="Pas de taxe correspondant à votre emplacement"
                    />
                </div>
                <div v-else class="municipality-tax__content__main">
                    <Operation :tax="taxList[0]" @on-choose-tax="taxHandler" />
                    <Result
                        @on-total-tax-changed="handleTotalTaxChanged"
                        :selected-tax-list="selectedTaxList"
                    />
                </div>
            </div>
        </finance-card>
    </div>
</template>
<script lang="ts" setup>
    import FinanceCard from '../components/FinanceCard/FinanceCard.vue';
    import { onMounted, ref, watch } from 'vue';
    import FinancialService from '@/services/FinancialService';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { Empty as AEmpty } from 'ant-design-vue';
    import Result from './Content/Result.vue';
    import Operation from './Content/Operation.vue';

    const isLoadTaxes = ref<boolean>(false);
    const reqParams = {
        region: 'Bruxelles',
        country: 'Belgique',
        municipality: 'Evere',
    };
    const taxList = ref<TypesTaxes[]>([]);
    const selectedTaxList = ref<any[]>([]);
    const totalTax = ref<number | null>(null);

    const emit = defineEmits<{
        (e: "getTaxData", value: any): void
    }>()


    onMounted(() => {
        getTaxes();
    });

    watch(
        () => totalTax.value,
        (v) => {
            totalTax.value = v;
        },
        { immediate: true }
    );

    function handleTotalTaxChanged(total: number) {
        totalTax.value = total;
        console.log("ddddddddddd",total);
        
        emit("getTaxData", totalTax.value)
    }
    async function getTaxes() {
        isLoadTaxes.value = true;
        try {
            const { data } = await FinancialService.getTaxes(reqParams);
            taxList.value = data;
            selectedTaxList.value = [
                ...selectedTaxList.value,
                {
                    title: 'Centimes additionnels',
                    selectedValue: +taxList.value[0].additionalCents * 0.01,
                },
                {
                    title: 'Precompte immobilier',
                    selectedValue: +taxList.value[0].eNotariatPI,
                },
            ];
            console.log(selectedTaxList.value);
        } catch (error) {
            console.log(error);
        } finally {
            isLoadTaxes.value = false;
        }
    }

    function taxHandler(value: any) {
        let parsedObj = {};
        Object.keys(value).forEach((key) => {
            parsedObj = {
                ...parsedObj,
                [key]: key === 'selectedValue' ? +value[key].value : value[key],
            };
        });
        const idToCheck = value.title;
        const alreadyExists = selectedTaxList.value.find(
            (item) => item.title === idToCheck
        );

        if (!!alreadyExists) {
            selectedTaxList.value = selectedTaxList.value.filter((item) => {
                console.log(item.title === idToCheck);
                return item.title !== idToCheck;
            });
        } else {
            selectedTaxList.value.push(parsedObj);
        }
    }
</script>
<style lang="scss" scoped>
    .municipality-tax {
        &__container {
            @apply w-full;
        }
        &__content {
            @apply pt-[10px] h-[inherit];
            &--empty {
                @apply pt-[10px] h-[inherit] flex justify-center items-center;
            }
        }
    }
</style>
