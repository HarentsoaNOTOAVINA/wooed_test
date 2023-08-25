<template>
    <AddContainer
        :titleLabel="titleLabel"
        @onPrev="prev"
        @onNext="next"
        :controlButton="controlButton"
    >
        <div class="price">
            <AAlert
                message="Prix suggéré"
                :description="suggestedPriceMessage"
                type="info"
                showIcon
            />
            <div
                v-for="(item, index) in data"
                :key="index"
                class="price-location"
            >
                <Input
                    v-if="item.type === 'number'"
                    :label="item.label"
                    :required="item.required"
                    :name-input="item.name"
                    :input-type="item.type"
                    unity="€"
                    :vmodel="params[item.name]"
                    placeholder="0"
                    @input="handleChange"
                />
                <Switch
                    v-if="item.type === 'switch'"
                    class="mb-[15px]"
                    :item-label="item.label"
                    :name="item.name"
                    @handle-switch="handleChange"
                    :value="params[item.name]"
                />
                <div v-if="item.subItem && item.subItem.length > 0">
                    <template v-for="(s, index) in item.subItem" :key="index">
                        <Input
                            v-if="
                                s.type === 'number' &&
                                params?.locationWarranty
                            "
                            :label="s.label"
                            :required="s.required"
                            :name-input="s.name"
                            :input-type="s.type"
                            unity="€"
                            :vmodel="params[s.name]"
                            placeholder="0"
                            @input="handleChange"
                        />
                    </template>
                </div>
            </div>
        </div>
    </AddContainer>
</template>

<script setup lang="ts">
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Switch from '@/components/Common/Switch/Switch.vue';
    import AAlert from 'ant-design-vue/lib/alert/index';
    import { onBeforeMount, onMounted, ref, watch } from 'vue';
    import { Store, useStore } from 'vuex';
    import { valueParams } from '../utils/default-value';

    const store: Store<any> = useStore();
    const props = defineProps({
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
        },
        data: {
            type: Array as any,
        },
    });

    const data = ref<any>(props.data);
    const params = ref<any>({});

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
    }>();

    const suggestedPrice = ref<Array<any>>([]);
    const suggestedPriceMessage = ref<string>('');

    onBeforeMount(() => {
        store.dispatch('AddProductModule/getSuggestedPrice');
    });

    onMounted(() => {
        params.value = store.getters['AddProductModule/getAddPropertyDatas'];
        // params.value = valueParams(data.value);
    });

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
        () => store.getters['AddProductModule/getAddPropertyDatas'],
        (value) => {
            params.value = value;
        },
        { immediate: true }
    );

    function handleChange(value: any) {
        params.value = {
            ...params.value,
            ...value,
        };
    }

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        store.dispatch('AddProductModule/setPropertyData', {
            data: { ...params.value },
        });
        emit('onClickNext');
    }
</script>

<style lang="scss" scoped>
    .price-location {
        @apply mb-[15px];
    }
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
