<template>
    <div class="exchange-items search-exchangeable">
        <div class="exchange-items__container">
            <div class="exchange-items__card">
                <div class="exchange-items__choice">
                    <transition name="fade-icon" mode="out-in">
                        <MapMarker v-if="!isAdressValid" />
                        <Check v-else class="checked-icon" />
                    </transition>
                    <Input
                        class="w-full"
                        label="Indiquez un lieu"
                        id="adress"
                        ref="inputRef"
                        placeholder="Entrez un lieu de recheche"
                        @input="handleAdressEntry"
                        name-input="adress"
                    />
                </div>
            </div>
            <div class="exchange-items__card">
                <div class="exchange-items__choice">
                    <transition name="fade-icon" mode="out-in">
                        <BuildingHome v-if="!searchParam.propertyType" />
                        <Check v-else class="checked-icon" />
                    </transition>
                    <Select
                        class="w-full"
                        name="propertyType"
                        label="Type(s) de bien"
                        placeholder="Choisir le(s) type(s) de bien à rechercher"
                        :options="propertyTypeList"
                        @change-select="handleSelectPropertyType"
                    />
                </div>
            </div>
            <Button
                :disabled="(!isParamsValid as boolean)"
                class="search-btn"
                type-button="secondary"
                @click="$emit('on-get-search-params', searchParam)"
            >
                <Icon icon-name="Search" />
                <span> Rechercher </span>
            </Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import MapMarker from '@/components/Icon/MapMarker.vue';
    import BuildingHome from '@/components/Icon/BuildingHome.vue';
    import { ref, onMounted, watch, computed } from 'vue';
    import Check from '@/components/Icon/Check.vue';
    import AddProductService from '@/services/addProductService';
    import useAutoComptetion from '@/composables/useAutoComplete';
    import Button from '@/components/Common/Button/Button.vue';
    import Search from '@/components/Icon/Search.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';

    const isAdressValid = ref<boolean>(false);
    const inputRef = ref<any>(null);
    const propertyTypeList = ref<any[]>([]);
    const searchParam = ref<{
        region: string;
        country: string;
        municipality: string;
        road: string;
        propertyType: string;
    }>({
        region: '',
        country: '',
        municipality: '',
        road: '',
        propertyType: '',
    });

    const { fullLocationResult } = useAutoComptetion('adress');

    const isParamsValid = computed(
        () => !!searchParam.value.propertyType && !!isAdressValid.value
    );

    onMounted(() => {
        getPropertyTypeList();
    });

    watch(
        () => fullLocationResult.value,
        (ac: any) => {
            if (ac) {
                const { address_components } = ac;
                const result = {
                    country: null,
                    region: null,
                    municipality: null,
                    road: null,
                };
                address_components.forEach((elt: any) => {
                    if (elt.types.includes('country')) {
                        result.country = elt.short_name;
                    } else if (
                        elt.types.includes('administrative_area_level_1')
                    ) {
                        result.region = elt.short_name;
                    } else if (elt.types.includes('locality')) {
                        result.municipality = elt.short_name;
                    } else if (elt.types.includes('route')) {
                        result.road = elt.short_name;
                    }
                });

                searchParam.value = { ...searchParam.value, ...result } as any;
                isAdressValid.value = true;
                console.log(searchParam.value);
            }
        },
        { immediate: true, deep: true }
    );

    async function getPropertyTypeList() {
        // const list: any[] = await AddProductService.getPropertyType();
        const { data } = await AddProductService.getPropertyType();
        propertyTypeList.value = data.map((item: any) => ({
            label: item.label,
            value: item.label,
        }));
    }

    function handleAdressEntry(evt: any) {
        const [_, v] = Object.entries(evt)[0];
        if (v === '') {
            isAdressValid.value = false;
        }
    }
    function handleSelectPropertyType(evt: any) {
        searchParam.value = {
            ...searchParam.value,
            ...evt,
        };
    }
</script>
<style lang="scss" scoped>
    .exchange-items {
        &__container {
            @apply flex gap-[18px] w-full flex-col md:justify-center justify-start items-center;
        }
        span {
            @apply text-primary;
        }
        &:deep() {
            svg {
                @apply w-[60px] h-[60px];
            }
            path {
                @apply fill-[var(--color-primary)];
                fill-opacity: 1;
            }
            .ant-select-arrow svg {
                width: inherit !important;
                height: inherit !important;
            }
        }
        &__card {
            @apply border border-primary rounded-[8px] w-full;
            @screen md {
                @apply max-w-[600px];
            }
            &:hover {
                @apply cursor-pointer bg-gray;
            }
        }
        span {
            @apply uppercase text-[14px];
        }
        .checked-icon {
            &:deep() {
                path {
                    @apply fill-green;
                    fill-opacity: 1;
                }
            }
        }
        .loading__container {
            @apply relative;
            &:deep() {
                .custom-loader {
                    @apply bg-white h-[60vh];
                }
            }
        }
        .search-btn {
            &:deep(svg) {
                @apply w-[18px] h-[18px];
            }
            &:deep(path) {
                fill: white;
            }
            span {
                @apply text-white;
            }
        }
    }

    .fade-icon-enter-acitve,
    .fade-icon-leave-active {
        @apply transition-all;
    }
    .fade-icon-enter-from,
    .fade-icon-leave-to {
        @apply scale-0;
    }
</style>
