<script lang="ts" setup>
    import {
        overTheCounterSaleFields,
        publicSaleFields,
        priceLocation,
    } from '@/pages/addProduct/components/Price/data';
    import Input from '@/components/Common/Input/Input.vue';
    import { computed, onBeforeMount, onMounted, ref, watch } from 'vue';
    import { useStore, Store } from 'vuex';
    import AAlert from 'ant-design-vue/lib/alert/index';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import moment from 'moment';

    const store: Store<any> = useStore();
    const element = ref<Array<any>>(overTheCounterSaleFields);
    const typeOfLocation = computed(
        () =>
            store.getters['AddProductModule/getAddPropertyDatas'][
                'locationType'
            ]
    );
    const propertyParams = ref<any>({});
    const suggestedPriceMessage = ref<string>('');
    let transactionType = computed(
        () => store.getters['AddProductModule/getTransactionType']
    );
    const isPublicSale = ref<boolean>(false);
    const disableEndDate = ref<boolean>(true);

    const propertyDatas = ref<any>(
        store.getters['AddProductModule/getAddPropertyDatas']
    );

    /*const propertyParams = ref<any>(typeOfLocation.value?.split(' ').includes('Hebergement') ? {
      prices : 0,
      provisionForCharges : 0,
      cleaningContribution : 0,
      rentalGuaranteeRequiredAmount : 0
} : {
      prices : 0,
      reservePrice : 0,
      cadastre : '',
      cadastralreturn : 0
});*/

    // const suggestedPrice = computed(
    //     () => store.getters['AddProductModule/getSuggestedPrices']
    // );

    const suggestedPrice = ref<Array<any>>([]);

    // watch(() => store.getters["AddProductModule/getTransactionType"], (value) => {
    //     transactionType.value = value;
    // }, {immediate : true, deep : true})

    watch(
        () => propertyParams.value,
        (first) => {
            store.dispatch('AddProductModule/setPropertyData', {
                data: { ...first },
                step: { price: validation() },
            });
        },
        { immediate: true, deep: true }
    );
    onBeforeMount(() => {
        store.dispatch('AddProductModule/getSuggestedPrice');
    });

    onMounted(() => {
        handleElement();
        if (transactionType.value?.split(' ').includes('public')) {
            isPublicSale.value = true;
            element.value = publicSaleFields;
        }
    });

    function handleElement() {
        const operationType =
            store.getters['ProductsListModule/getOperationType'];
        if (operationType === 'sale') {
            if (typeOfLocation.value?.split(' ').includes('Hebergement')) {
                element.value = priceLocation;
                propertyParams.value = {
                    prices: 0,
                    provisionForCharges: 0,
                    cleaningContribution: 0,
                    rentalGuaranteeRequiredAmount: 0,
                };
            } else {
                if (transactionType.value?.split(' ').includes('public')) {
                    element.value = publicSaleFields;
                    propertyParams.value = {
                        // prices: 0,
                        startPrice: 0,
                        floorPrice: 0,
                        startSaleDate: 0,
                        endSaleDate: 0,
                    };
                } else {
                    element.value = overTheCounterSaleFields;
                    propertyParams.value = {
                        prices: 0,
                    };
                }
            }
        } else {
            element.value = priceLocation;
        }
    }

    function handleChange(value: any) {
        // for (let i in value) {
        //     propertyParams.value[i] = value[i];
        // }
        propertyParams.value = {
            ...propertyParams.value,
            ...value,
        };

        if (propertyParams.value.startSaleDate !== 0) {
            disableEndDate.value = false;
        } else {
            disableEndDate.value = true;
        }
        console.log(propertyParams.value);
    }

    function validation() {
        if (transactionType.value === 'Vente de gré à gré') {
            const { floorPrice, ...newValue } = propertyParams.value;
            return Object.values(newValue).every((i) => !!i);
        }
        return Object.values(propertyParams.value).every((i) => !!i);
    }

    watch(
        () => store.getters['AddProductModule/getSuggestedPrices'],
        (val) => {
            suggestedPrice.value = val;
            if (Array.isArray(val) && val.length) {
                suggestedPriceMessage.value = `Votre bien est estimé à ${val[0].toLocaleString()} €`;
            } else {
                suggestedPriceMessage.value = `Pas de reférence de prix pour votre bien`;
            }
        }
    );
    watch(
        () => store.getters['AddProductModule/getTransactionType'],
        (val) => {
            // transactionType.value = val;
            if (
                val.includes('public') ||
                transactionType.value.includes('public')
            ) {
                isPublicSale.value = true;
                element.value = publicSaleFields;
            }
        }
    );

    // function handleZaza(value: any) {
    //     console.log('zazazaza\n', value);
    // }

    function disabledDate() {}
</script>

<template>
    <div class="price">
        <AAlert
            message="Prix suggéré"
            :description="suggestedPriceMessage"
            type="info"
            showIcon
        />
        <!-- <InputDate 
            name="zazaza"
            label="zaza"
            @handle-change="handleZaza"
        /> -->
        <div class="" v-for="item in element" :key="item.id">
            <div class="" v-if="transactionType !== 'Vente de gré à gré'">
                <Input
                    v-if="item.typeVieuw !== 'fieldDate'"
                    :label="item.label"
                    :required="item.required"
                    :name-input="item.name"
                    :input-type="item.type"
                    @input="handleChange"
                    :default-value="propertyDatas[item.name]"
                    unity="€"
                    placeholder="0"
                />
                <template v-else>
                    <InputDate
                        v-if="item.name === 'startSaleDate'"
                        :name="item.name"
                        :required="item.required"
                        @handle-date-eng="handleChange"
                        :label="item.label"
                        :value="
                            propertyDatas[item.name]
                                ? moment(propertyDatas[item.name]).format(
                                      'DD-MM-YYYY'
                                  )
                                : ''
                        "
                    />
                    <InputDate
                        v-else-if="item.name === 'endSaleDate'"
                        :disable="disableEndDate"
                        :name="item.name"
                        :required="item.required"
                        @handle-date-eng="handleChange"
                        :label="item.label"
                        :value="
                            propertyDatas[item.name]
                                ? moment(propertyDatas[item.name]).format(
                                      'DD-MM-YYYY'
                                  )
                                : ''
                        "
                    />
                </template>
                <div class="price__info" v-if="item.info">
                    <Icon icon-name="InfoIcon" />
                    {{ item.info }}
                </div>
            </div>
            <div class="" v-else>
                <template v-if="item.name !== 'floorPrice'">
                    <Input
                        v-if="item.typeVieuw !== 'fieldDate'"
                        :label="item.label"
                        :required="item.required"
                        :name-input="item.name"
                        :input-type="item.type"
                        @input="handleChange"
                        :default-value="propertyDatas[item.name]"
                        unity="€"
                    />

                    <InputDate
                        v-else
                        :name="item.name"
                        :required="item.required"
                        @handle-date-eng="handleChange"
                        :label="item.label"
                        :value="
                            propertyDatas[item.name]
                                ? moment(propertyDatas[item.name]).format(
                                      'DD-MM-YYYY'
                                  )
                                : ''
                        "
                    />
                </template>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .price {
        @apply flex flex-col gap-[18px];
        &:deep() {
            .date__space {
                @apply my-[10px];
            }
            .custom-input__label-icon label,
            .ant-space-item label {
                @apply font-[600];
            }
        }

        &__info {
            @apply flex gap-[10px] text-blue-500 italic;
        }
    }
</style>
