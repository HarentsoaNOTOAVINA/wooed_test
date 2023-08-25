<template>
    <div>
        <div
            class="find__background"
            :style="{ backgroundImage: 'url(' + backgroundImageUrl + ')' }"
        >
            <div class="find">
                <Card class="find__card">
                    <div class="find__section">
                        <Title
                            type="h1"
                            label="Bienvenue dans Wooed"
                            class="find__card-title"
                        />
                        <TabsCard :dataTabs="dataTabs">
                            <template #find>
                                <Find
                                    @change-address="handleAddressChange"
                                    @handle-show-map="handleShowMap"
                                    @update-payload="updatePayload"
                                    @trigger-search="handleSearchProperty"
                                    @show-advanced-search="
                                        handleShowAdvancedSearch
                                    "
                                />
                            </template>

                            <template #other>
                                <Other
                                    @handle-show-map="handleShowMap"
                                    @change-address="handleAddressChange"
                                    @search="handleMarkInterestSeach"
                                />
                            </template>
                        </TabsCard>
                    </div>
                </Card>
            </div>
        </div>
        <LastPublication :lastDataPub="propertyList" />
    </div>
</template>

<script setup lang="ts">
    import LastPublication from './LastPublication.vue';
    import CardType from '@/components/Display/productCard/CardType';
    import Title from '@/components/Common/Title/Title.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import TabsCard from '@/components/Display/TabsCard/TabsCard.vue';
    import FindMap from '../components/FindMap.vue';
    import ProductCard from '@/components/Display/productCard/ProductCard.vue';
    import Other from './other.vue';
    import Find from './find.vue';
    import bgStatic from '@/static/images/immo.jpeg';
    import {
        defineComponent,
        onBeforeMount,
        ref,
        watch,
        onUnmounted,
        onMounted,
        shallowRef,
    } from 'vue';
    import { useStore } from 'vuex';

    const propertyList = ref<CardType[]>([]);
    const store = useStore();
    const backgroundImageUrl = shallowRef(bgStatic);
    const dataTabs = [
        {
            tabTitle: 'Trouver un bien',
            tabName: 'find',
        },
        {
            tabTitle:
                "Marquer mon intêret pour un bien qui n'est pas encore à vendre",
            tabName: 'other',
        },
    ];

    onMounted(() => {
        console.log('DBG load  allll....');
    });

    const emit = defineEmits<{
        (e: 'changeAddress', payload: any): void;
        (e: 'handleShowMap', payload: string): void;
        (e: 'updatePayload', payload: any): void;
        (e: 'triggerSearch'): void;
        (e: 'showAdvancedSearch'): void;
    }>();

    function handleAddressChange($event: any) {
        emit('changeAddress', $event);
    }
    function handleShowMap($event: any) {
        emit('handleShowMap', $event);
    }
    function updatePayload($event: any) {
        emit('updatePayload', $event);
    }
    function handleSearchProperty() {
        emit('triggerSearch');
    }
    function handleMarkInterestSeach() {
        emit('showAdvancedSearch');
    }
    function handleShowAdvancedSearch() {
        emit('showAdvancedSearch');
    }
    watch(
        () => store.getters['ProductsListModule/getProductsListData'],
        async (v) => {
            propertyList.value = (v as Array<any>).slice(0, 10);
        },
        { immediate: true, deep: true }
    );
</script>

<style lang="scss" scoped>
    .find {
        background: rgba(96, 96, 96, 0.25);
        backdrop-filter: blur(7px);
        height: calc(100vh - 59px);
        max-height: 700px;
        min-height: 600px;
        @apply w-full flex justify-center items-center p-[14px];
        @media (max-height: 700px) {
            min-height: calc(100vh - 59px);
            height: auto;
        }
        @screen sm {
            max-height: 900px;
        }
        @screen lg {
            height: calc(100vh - 62px);
        }
        &__background {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center;
        }
        &__card-title {
            @apply text-[24px] text-primary font-[600] text-center;
            @screen md {
                @apply text-[30px];
            }
        }
        &__card {
            // max-width: 100%;
            // min-height: 90vh;
            background: rgb(255, 255, 255, 0.64);
            @apply max-w-[698px] w-full flex flex-col items-center;
            @screen lg {
                @apply p-[40px];
            }
        }
        &__section {
            @apply w-full flex flex-col gap-[18px];
            @screen lg {
                @apply gap-[46px];
            }
            :deep() {
                .ant-tabs-nav-wrap {
                    display: inline-block;
                    @apply whitespace-normal overflow-hidden;
                }
                .ant-tabs-tab {
                    width: 100%;
                    .ant-tabs-tab-btn {
                        @apply min-w-[100px];
                    }
                }
                .ant-tabs-content {
                    @apply min-h-[300px];
                }
                .ant-tabs-tabpane {
                    display: flex !important;
                    @apply flex-col justify-center w-0 h-0 overflow-hidden translate-x-12 transition-transform;
                    &.ant-tabs-tabpane-active {
                        @apply w-full h-auto translate-x-0 transition-transform;
                    }
                }
                @screen md {
                    .ant-tabs-tab {
                        width: 100%;
                    }
                }
                .ant-tabs-nav-operations {
                    @apply hidden;
                }
                .ant-tabs-content.ant-tabs-content-top.ant-tabs-content-animated {
                    margin-left: 0 !important;
                }
            }
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
                @apply w-full bg-white h-[38px];
                &:deep() {
                    button {
                        border: 1px solid;
                        @apply flex justify-between items-center w-full h-full px-[11px] bg-white text-grayLabel border-grayLabel;
                    }
                    .icon {
                        svg path {
                            @apply fill-grayIcon;
                        }
                    }
                }
            }
        }
        &__carousel {
            @apply w-full py-10;
            &-title {
                @screen md {
                    @apply flex pb-5 flex-row justify-center;
                }
            }
        }
    }
</style>
