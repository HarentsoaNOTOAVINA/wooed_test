<template>
    <MainContainer v-if="!showMap">
        <MainCard :data-breadcrumbs="breadcrumb">
            <div class="find__container">
                <div class="find__title">
                    <Title
                        type="h2"
                        label="Recherche par adresse"
                        class="find__title-content"
                    />
                    <Button
                        class="find-proximity"
                        @click="navigateTo('/immogo')"
                    >
                        Recherche a proximité
                    </Button>
                </div>
                <!-- <hr class="__hr" /> -->
                <div class="find__content">
                    <div
                        v-for="(field, key) in FIELDS"
                        :key="key"
                        class="find__item"
                        :class="{
                            'find-interest': field.type === 'button-interest',
                            'find__item-fill': !!field?.fill,
                        }"
                    >
                        <div
                            v-if="field.type === 'address'"
                            class="find__item-form"
                        >
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
                                :name="
                                    field.name ? field.name : 'selectDefault'
                                "
                                :placeholder="field.placeholder"
                                :options="field.options"
                                @change-select="handleSelectFields"
                            />
                        </div>
                        <div
                            v-else-if="
                                field.type === 'number' &&
                                payload?.locationType == field.condition
                            "
                            class="find__item-form"
                        >
                            <label for="field.name">{{ field.label }}</label>
                            <Input
                                :input-type="field.type"
                                :name-input="
                                    field.name ? field.name : 'nameDefault'
                                "
                                :placeholder="field.placeholder"
                                @input="handleInputFields"
                            />
                        </div>
                        <div
                            v-else-if="
                                field.type === 'date' &&
                                payload?.locationType == field.condition
                            "
                            class="find__item-form"
                        >
                            <label for="field.name">{{ field.label }}</label>
                            <InputDate
                                :name="
                                    field.name ? field.name : 'selectDefault'
                                "
                                :format="'DD/MM/YYYY'"
                                :placeholder="field.placeholder"
                                @handle-date-format-en="handleInputFields"
                            />
                        </div>
                        <!-- <div
                            class="find__subitem-btn"
                            v-else-if="field.type === 'button-filter'"
                        >
                            <Button
                                class="find__subitem-filter"
                                @click="goToMoreCriteria"
                            >
                                <Paragraphe>{{ field.label }}</Paragraphe>
                                <Icon icon-name="AddIcon" />
                            </Button>
                        </div> -->
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
                            class="find__subitem-title"
                            v-else-if="
                                field.type === 'title' &&
                                payload?.locationType == field.condition
                            "
                        >
                            <Paragraphe>
                                {{ field.label }}
                            </Paragraphe>
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
        </MainCard>
    </MainContainer>
</template>

<script setup lang="ts">
    import FindMap from '../components/FindMap.vue';
    import InputDate from '@/components/Common/InputDate/InputDate.vue';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import useAutoComplete, {
        ExtractAdressComponents,
    } from '@/composables/useAutoComplete';
    import useGeocode from '../composable/useGeocode';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import Input from '@/components/Common/Input/Input.vue';
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
    import { FIELDS as _FIELDS } from './data';
    import { initPriceOptions } from '@/utils/price';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import MainContainerVue from '@/pages/supplier/components/MainContainer.vue';
    import { IFields, ICoords } from '@/typings/interfaces';

    const router = useRouter();
    const store = useStore();
    const breadcrumb = [{ label: 'Trouver un bien en location' }];

    const { fullLocationResult } = useAutoComplete('address');
    const payload = ref<{ [key: string]: any }>({});
    const showMap = ref<boolean>(false);

    onBeforeMount(() => {
        store.commit('ProductsListModule/RESET_DATA');
        store.dispatch('FindPropertyModule/fetchLocationTypes');
        store.dispatch('FindPropertyModule/fetchPropertyTypes');
    });

    onMounted(() => {
        store.commit('ProductsListModule/RESET_DATA');
        const prices = initPriceOptions(100, 500, 10000);
        const idx = FIELDS.value.findIndex((obj) => obj.name === 'Price');
        FIELDS.value[idx].options = prices;
    });

    const FIELDS = ref<IFields[]>(_FIELDS as any);

    function navigateTo(type: string) {
        // !!(window as any).flutter_inappwebview &&
        //     (window as any).flutter_inappwebview.callHandler(
        //         'navigateTo',
        //         type
        //     );
        !!(window as any).navigateTo &&
            (window as any).navigateTo.postMessage(type);
    }

    function handleInputFields($event: any) {
        payload.value = { ...payload.value, ...$event };
    }

    function handleShowMap(origin: string) {
        if (!!payload.value) {
            payload.value = {
                ...payload.value,
                ...{ operationType: 'lease' },
            };
            store.dispatch('FindPropertyModule/findProperties', payload.value);
        }
        router.push({
            path: '/trouver-un-bien-sur-carte',
            query: {
                requestOrigin: 'lease',
            },
        });
    }

    function handleSearchProperty() {
        payload.value = {
            ...payload.value,
            ...{ operationType: 'lease' },
        };
        store.dispatch('FindPropertyModule/findProperties', payload.value);
        router.push({
            name: 'product-list',
            params: { operationType: 'lease' },
            query: payload.value.formatedAddress,
        });
    }

    // function goToMoreCriteria() {
    //     // router.push({ name: 'advanced-find-property' });
    //     emit('showAdvancedSearch');
    // }

    function handleSelectFields($event: any) {
        let value = {};
        if (Object.keys($event)[0] === 'Price') {
            const res = (Object.values($event)[0] as string).split('-');
            value = {
                minPrice: res[0],
                maxPrice: res[1],
            };
        } else {
            value = $event;
        }
        payload.value = { ...payload.value, ...value };
    }

    function filterPropertyType(payload: any) {
        if (payload?.locationType === 'Hébergement touristique') {
            const idx = FIELDS.value.findIndex(
                (obj) => obj.name === 'propertyType'
            );
            FIELDS.value[idx].options = FIELDS.value[idx].options?.filter(
                (elt) =>
                    elt.name === 'Maison' ||
                    elt.name === 'Villa' ||
                    elt.name === 'Appartement' ||
                    elt.name === 'Bungalow'
            );
        }
    }

    watch(
        () => store.getters['FindPropertyModule/getLocationTypes'],
        (value) => {
            const idx = FIELDS.value.findIndex(
                (obj) => obj.name === 'locationType'
            );
            FIELDS.value[idx].options = value;
        }
    );
    watch(
        () => store.getters['FindPropertyModule/getPropertyTypes'],
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
                const result = (payload.value = {
                    ...payload.value,
                    ...ExtractAdressComponents(value.address_components),
                    formatedAddress: value.formatted_address,
                });
            }
        },
        { immediate: true, deep: true }
    );
    watch(
        () => payload.value,
        (value) => {
            filterPropertyType(value);
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
            &-fill {
                grid-column: 1/ -1;
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
            &-empty {
                @apply w-full;
            }
            &-title {
                @apply text-xl font-bold;
                color: var(--color-gray-icon);
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
