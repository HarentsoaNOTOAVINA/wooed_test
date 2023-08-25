<script setup lang="ts">
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import RadioGroup from './components/radioGroup.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import Select from '@/components/Common/Select/Select.vue';
    import MinMaxPrice from './components/MinMax.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Layout from './components/searchLayout.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { FontAwesomePromise } from '@/composables/useFontAwesome';
    import { useStore } from 'vuex';
    import { ref, computed, reactive, onMounted, watch, toRaw } from 'vue';
    import Icon from '@/components/Common/Icon/Icon.vue';

    const $store = useStore();
    const loading = ref<boolean>(true);
    const searchLoading = ref<boolean>(false);
    const title = computed(() => [
        {
            label: 'Recherche',
            url: '/recherche-bien',
        },
        { label: 'par critère' },
    ]);
    const RentType = ref([
        {
            label: 'Acheter',
            value: 'sale',
        },
        {
            label: 'Louer',
            value: 'lease',
        },
    ]);
    const propertiesInputs = reactive({
        type: {
            label: 'Type de bien',
            name: 'propertyType',
            data: [],
        },
        price: {
            label: 'Prix',
            placeholders: {
                min: 'Prix min',
                max: 'Prix max',
            },
            names: {
                min: 'minPrice',
                max: 'maxPrice',
            },
        },
        Area: {
            label: 'Surface',
            name: 'surface',
        },
        rooms: {
            label: 'Nombre de chambre',
            data: [
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '4', value: '4' },
                { label: '5+', value: '5+' },
            ],
        },
    });
    const checked = ref([]);
    const other = ref<
        Array<{
            id: number | string;
            name: string;
            icon: string;
        }>
    >([]);
    const advancedOptionStatus = ref<boolean>(false);
    const AdvancedType = ref([]);
    const payload = ref<{}>({
        operationType: '',
        propertyType: '',
        minPrice: '',
        maxPrice: '',
        surface: '',
        roomcount: '',
        options: [],
    });

    const handleOperationType = (e: any) => {
        payload.value = { ...payload.value, ...{ operationType: e.value } };
    };
    const handlePropertyTypeSelect = (e: any) => {
        payload.value = { ...payload.value, ...e };
    };
    const handleAreaInput = (e: any) => {
        payload.value = { ...payload.value, ...e };
    };
    const handleRoomCount = (e: any) => {
        payload.value = { ...payload.value, ...{ roomcount: e.value } };
    };

    const checkItem = (item: never) => {
        let content = checked.value.includes(item);
        if (!content) {
            checked.value.push(item);
        } else {
            checked.value = [...checked.value.filter((i) => i !== +item)];
        }

        payload.value = { ...payload.value, ...{ options: checked.value } };
    };

    const toggleAdvancedOptions = () => {
        advancedOptionStatus.value = !advancedOptionStatus.value;
    };

    const handleMinMaxInput = (event: any) => {
        payload.value = { ...payload.value, ...event };
    };

    const find = () => {
        searchLoading.value = true;
        const res = $store.dispatch(
            'FindPropertyModule/findProperties',
            payload.value
        );
        console.log(res);
        res.finally(() => {
            searchLoading.value = false;
        });
    };
    onMounted(async () => {
        FontAwesomePromise.then((data: any) => {
            console.log(data);
        });
        const res: [] = await $store.dispatch(
            'FindPropertyModule/fetchPropertyTypes'
        );
        console.log('>>>>>res', res);
        if (res.length > 0) {
            loading.value = false;
            propertiesInputs.type.data = res;
        }
        $store.dispatch('FindPropertyModule/getOptions');
        if ($store.state.FindPropertyModule.options.data) {
            other.value = $store.state.FindPropertyModule.options.data;
        }
    });
    watch(
        () => payload.value,
        (newVal) => {
            console.log(newVal);
        },
        { immediate: true }
    );
    watch(
        () => $store.state.FindPropertyModule.options.data,
        function (newVal) {
            other.value = newVal;
            console.log('other : ', other.value);
        }
    );
</script>
<template>
    <Loader v-if="loading" />
    <Layout v-else :breadcrumbListsData="title" :slotSearch="false">
        <!-- <template #header>
            <div class="container-title">
                <BreadCrumb :items="title" />
            </div>
            <hr class="my-3" />
        </template> -->
        <template #searchContainer>
            <div class="container-fields">
                <div>
                    <RadioGroup
                        :items="RentType"
                        @change="handleOperationType"
                    />
                </div>
                <div class="max-w-[845px]">
                    <Select
                        :label="propertiesInputs.type.label"
                        :options="propertiesInputs.type.data"
                        :name="propertiesInputs.type.name"
                        @change-select="handlePropertyTypeSelect"
                    />
                </div>
                <div>
                    <min-max-price
                        :names="propertiesInputs.price.names"
                        :placeholders="propertiesInputs.price.placeholders"
                        @change="handleMinMaxInput"
                    />
                </div>
                <div>
                    <Input
                        :placeholder="propertiesInputs.Area.label"
                        :label="propertiesInputs.Area.label"
                        :name-input="propertiesInputs.Area.name"
                        input-type="number"
                        @input="handleAreaInput"
                    />
                </div>
                <div class="room-number">
                    <RadioGroup
                        :label="propertiesInputs.rooms.label"
                        :items="propertiesInputs.rooms.data"
                        @change="handleRoomCount"
                    />
                </div>
                <div
                    class="container-advanced-control"
                    @click="toggleAdvancedOptions"
                    :class="
                        advancedOptionStatus
                            ? 'showAdvancedOptions'
                            : 'hideAdvancedOptions'
                    "
                >
                    <span class="font-[600]">Critère avancé</span>
                    <Icon icon-name="ArrowBottom" />
                </div>
                <Transition appear name="fadeHeight" mode="out-in">
                    <div v-if="advancedOptionStatus">
                        <div class="general__other-container">
                            <div
                                class="general__other-container-card"
                                v-for="item in other"
                                :key="item.id"
                                :class="[
                                checked.includes(item.id as never)
                                    ? 'general__checked'
                                    : '',
                            ]"
                                @click="checkItem(item.id as never)"
                            >
                                <div class="general__other-container-item">
                                    <i :class="item.icon" />
                                    <P> {{ item.name }}</P>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
            <div class="button-search__container">
                <Button class="button-search__mobile" @click="find">
                    <template #default>
                        <LoadingButton size="xs" v-if="searchLoading" />
                        Recherche
                    </template>
                </Button>
            </div>
        </template>
        <template #buttonSearch>
            <Button @click="find" class="button-search__desktop">
                <template #default>
                    <LoadingButton size="xs" v-if="searchLoading" />
                    Recherche
                </template>
            </Button>
        </template>
    </Layout>
</template>

<style lang="scss" scoped>
    .container {
        &-action {
            @apply w-full justify-center;

            & > div > button {
                @apply w-full;
            }
        }
        &-all {
            @apply container w-full py-3;
        }
        &-wrapper {
            @apply w-full py-3 px-2 bg-white justify-between;
        }
        &-title {
            @apply w-full flex justify-start;
        }
        &-input {
            @apply w-full pb-3;
        }
        &-fields {
            // min-height: 70vh;
            @apply flex flex-col gap-[14px];
            .room-number {
                &:deep() {
                    .ant-radio-group {
                        @apply bg-transparent;
                    }
                    .ant-radio-button-wrapper {
                        @apply bg-transparent border-none font-[400] transition-all;
                        &:before {
                            @apply hidden;
                        }
                    }
                    .ant-radio-button-wrapper-checked {
                        @apply bg-gray text-primary;
                    }
                }
            }
            &:deep() {
                .container-wrapper {
                    @apply p-0;
                }
                label {
                    @apply font-[600];
                }
                .custom-input__fields,
                .custom-select__wrapper {
                    @apply mb-0;
                }
            }
        }
        &-advanced-control {
            @apply flex text-grayIcon font-[600] gap-[10px] w-max cursor-pointer;
            &.showAdvancedOptions {
                &:deep() {
                    .icon {
                        transform: rotateX(180deg);
                    }
                }
            }
            &:hover {
                @apply text-primary;
                &:deep() {
                    .icon {
                        svg path {
                            @apply fill-primary;
                        }
                    }
                }
            }
        }
    }
    #action {
        &-button {
            width: 100%;
        }
    }
    .general {
        &__container {
        }
        &__title {
        }
        &__add-container {
            @apply flex cursor-pointer gap-[14px];
        }
        &__add {
            @apply h-[22px] w-[22px] flex justify-center items-center rounded-[50%];
            background-color: var(--color-gray);
        }
        &__level-container {
            @apply px-[14px] py-[10px] rounded-[4px];
            border: 0.5px solid var(--color-stroke-gray);
        }
        &__subitem-container {
            @apply flex flex-wrap  gap-[35px];
        }
        &__subitem-item {
            @apply flex flex-col items-center cursor-grab;
        }
        &__icon {
            @apply w-[35px] h-[35px] bg-slate-800 rounded-[50%];
        }
        &__title {
            @apply leading-[17px] text-[14px] text-[#8F8F8F];
        }
        &__level-container-item {
            @apply flex flex-col gap-[14px];
        }
        &__dragged {
            @apply rounded-[4px] min-h-[97px];
            border: 0.5px solid #606060;
        }
        &__master-container {
            @apply flex flex-col gap-[14px];
        }
        &__other-container {
            @apply flex gap-[8px] flex-wrap;
        }
        &__other-container-card {
            @apply rounded-[4px] flex justify-center items-center  cursor-pointer bg-gray px-[10px] py-[8px];
        }
        &__other-container-item {
            @apply flex items-center justify-center gap-[6px];
            i {
                @apply text-primary text-[16px];
            }
        }
        &__checked {
            @apply bg-primary text-white border-none;
            i {
                @apply text-white;
            }
        }
        &__options-input-container {
            @apply flex flex-col gap-[10px];
        }
    }
    .button-search {
        &__container {
            @apply flex justify-end;
        }
        &__mobile {
            @apply w-full flex;
            @screen sm {
                @apply w-auto;
            }
            @screen md {
                @apply hidden;
            }
            &:deep() {
                 button {
                    @apply w-full;
                 }
            }
        }
        &__desktop {
            @apply hidden;
            @screen md {
                @apply block;
            }
        }
    }
    @screen md {
        .container {
            &-action {
                @apply w-full justify-end;

                & > div > button {
                    @apply w-full;
                }
            }
        }
    }

    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.3s ease-in-out;
        max-height: 230px;
    }

    .fadeHeight-enter-from,
    .fadeHeight-leave-to {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0px;
    }
</style>
