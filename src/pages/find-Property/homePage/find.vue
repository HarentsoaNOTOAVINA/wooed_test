<template>
    <div class="find__container">
        <div class="find__title">
            <Title
                type="h2"
                label="Recherche par adresse"
                class="find__title-content"
            />
            <Button class="find-proximity" @click="navigateTo('/immogo')">
                Recherche a proximité
            </Button>
        </div>
        <!-- <hr class="__hr" /> -->
        <!-- <div class="find__content">
            <Select
                label="Type d'opération"
                name="operationType"
                placeholder="Opération type"
                :options="OPERATION_TYPE"
                :default-value="OPERATION_TYPE[0]"
                @change-select="handleSelectFields"
            />
        </div> -->
        <div class="find__content">
            <div
                v-for="(field, key) in FIELDS"
                :key="key"
                :class="
                    field.type === 'button-interest'
                        ? 'find__item find-interest'
                        : 'find__item'
                "
            >
                <div v-if="field.type === 'address'" class="find__item-form">
                    <label for="field.name">{{ field.label }}</label>
                    <Input
                        :icon-field="true"
                        icon-name="MapMarkerLine"
                        id="address"
                        :placeholder="field.placeholder"
                        :name-input="field.name"
                    />
                </div>
                <div
                    v-else-if="field.type === 'select'"
                    class="find__item-form"
                >
                    <label for="field.name">{{ field.label }}</label>
                    <Select
                        :name="field.name ? field.name : 'selectDefault'"
                        :placeholder="field.placeholder"
                        :options="field.options"
                        @change-select="handleSelectFields"
                    />
                </div>
                <div
                    class="find__subitem-btn place-content-10px"
                    v-else-if="field.type === 'button-filter'"
                >
                    <label v-if="field.title" for="field.title">{{ field.title }}</label>
                    <Button
                        class="find__subitem-filter"
                        @click="goToMoreCriteria"
                    >
                        <Paragraphe>{{ field.label }}</Paragraphe>
                        <Icon icon-name="AddIcon" />
                    </Button>
                </div>
                <div
                    class="find__subitem-btn"
                    v-else-if="field.type === 'button-primary'"
                >
                    <Button
                        type-button="primary"
                        :width="'100%'"
                        @click="handleSearchProperty"
                    >
                        {{ field.label }}
                    </Button>
                </div>
                <div
                    class="find__subitem-btn"
                    v-else-if="field.type === 'button-secondary'"
                >
                    <Button
                        class=""
                        type-button="gray"
                        :width="'100%'"
                        @click="handleShowMap"
                    >
                        {{ field.label }}
                    </Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import useAutoComplete from '@/composables/useAutoComplete';
    import useGeocode from '../composable/useGeocode';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import MainContainer from '@/pages/supplier/components/MainContainer.vue';
    import {
        defineComponent,
        onBeforeMount,
        ref,
        watch,
        onUnmounted,
        onMounted,
    } from 'vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { useStore } from 'vuex';
    import { useRouter } from 'vue-router';
    import { FIELDS as _FIELDS, OPERATION_TYPE } from './data';
    import { initPriceOptions } from '@/utils/price';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Input from '@/components/Common/Input/Input.vue';

    interface IFields {
        label?: string;
        type: string;
        name?: string;
        placeholder?: string;
        options?: any[];
        handler?: () => any;
        title?: string;
    }
    interface ICoords {
        lat: number;
        lng: number;
    }
    const formatter = new Intl.NumberFormat('fr-Fr');
    const router = useRouter();
    const store = useStore();

    const emit = defineEmits<{
        (e: 'changeAddress', payload: any): void;
        (e: 'handleShowMap', payload: string): void;
        (e: 'updatePayload', payload: any): void;
        (e: 'triggerSearch'): void;
        (e: 'showAdvancedSearch'): void;
    }>();
    const props = defineProps({
        showMap: {
            type: Boolean,
            default: false,
        },
    });

    const { fullLocationResult } = useAutoComplete(
        'address',
        props.showMap,
        true
    );

    onBeforeMount(() => {
        store.commit('ProductsListModule/RESET_DATA');
        store.dispatch('FindPropertyModule/fetchPropertyTypes');
        store.dispatch('AddProductModule/getProperyType', 'sell');
    });

    onMounted(() => {
        const prices = initPriceOptions();
        prices.unshift({
            label: `Moins de ${formatter.format(50000)} EUR`,
            value: '0-50000',
        });
        prices.push({
            label: `1 000 000 - 2 000 000 EUR`,
            value: '1000000-2000000',
        });
        prices.push({
            label: `Plus de ${formatter.format(2000000)} EUR`,
            value: '2000000-',
        });
        const idx = FIELDS.value.findIndex((obj) => obj.name === 'Price');
        FIELDS.value[idx].options = prices;
    });

    const FIELDS = ref<IFields[]>(_FIELDS);

    function navigateTo(type: string) {
        // !!(window as any).flutter_inappwebview &&
        //     (window as any).flutter_inappwebview.callHandler(
        //         'navigateTo',
        //         type
        //     );
        !!(window as any).navigateTo &&
            (window as any).navigateTo.postMessage(type);
    }

    function handleShowMap() {
        emit('handleShowMap', 'find');
    }

    function handleSearchProperty() {
        store.dispatch('ProductsListModule/setOperationType', 'sale');
        emit('triggerSearch');
    }

    function goToMoreCriteria() {
        // router.push({ name: 'advanced-find-property' });
        emit('showAdvancedSearch');
    }

    function handleSelectFields($event: any) {
        let value: any = {};
        if (Object.keys($event)[0] === 'Price') {
            const res = (Object.values($event)[0] as string).split('-');
            value = {
                minPrice: res[0],
                maxPrice: res[1],
            };
        }
        // else if (Object.keys($event)[0] == 'operationType') {
        //     value = $event;
        //     store.dispatch(
        //         'ProductsListModule/setOperationType',
        //         Object.values($event)[0]
        //     );
        // }
        else {
            value = $event;
        }
        emit('updatePayload', value);
    }

    watch(
        // () => store.getters['FindPropertyModule/getPropertyTypes'],
        () => store.getters['AddProductModule/getPropertyType'],
        (value) => {
            const idx = FIELDS.value.findIndex(
                (obj) => obj.name === 'propertyType'
            );
            FIELDS.value[idx].options = value;
        }
    );

    watch(
        () => fullLocationResult.value,
        (value) => {
            if (!!value) {
                emit('changeAddress', value);
            }
        },
        { immediate: true, deep: true }
    );
</script>

<style lang="scss" scoped>
    #address {
        width: 100%;
        border: 1px solid var(--color-stroke-gray);
        padding: 6px;
        border-radius: 4px;
    }
    .find {
        // &__card {
        //     max-width: 100%;
        //     min-height: 90vh;
        //     @apply flex flex-col items-center;
        // }
        &__section {
            @apply max-w-[618px] w-full;
        }
        &__title {
            @apply w-full flex justify-between items-center gap-[14px];
            &-content {
                @apply text-primary text-[14px] font-[600];
                @screen md {
                    @apply text-[18px];
                }
            }
            .find-proximity {
                @screen md {
                    @apply hidden;
                }
            }
        }
        &__container {
            @apply w-full flex flex-col items-center gap-[14px];
            @screen md {
                @apply gap-[24px];
            }
        }
        &__content {
            @apply w-full grid grid-cols-1 gap-[14px];
            @screen md {
                @apply grid-cols-2 gap-[18px];
            }
        }
        &-interest {
            @screen md {
                grid-column: 1/3;
            }
        }
        &__item {
            @apply flex flex-col justify-end w-[100%];
            &-form {
                @apply flex flex-col gap-[10px];
            }
            label {
                @apply font-[600] text-black;
            }
            &:deep() {
                .custom-input__fields,
                .custom-select__wrapper {
                    @apply mb-0;
                }
                .custom-input__fields {
                    .ant-input {
                        @apply pl-[34px] pr-[11px];
                    }
                    .unit {
                        @apply left-[11px] w-max;
                    }
                    .icon {
                        svg path {
                            @apply fill-grayIcon;
                        }
                    }
                }
            }
        }
        &__subitem {
            &-btn {
                :deep() {
                    .button__gray {
                        border-radius: 4px;
                        @apply text-primary;
                    }
                }
            }
            &-filter {
                @apply w-full h-[38px];
                &:deep() {
                    button {
                        border: 1px solid;
                        @apply flex justify-between items-center w-full h-full px-[11px] bg-white text-grayLabel border-grayLabel font-[400];
                    }
                    .icon {
                        svg path {
                            @apply fill-grayIcon;
                        }
                    }
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
