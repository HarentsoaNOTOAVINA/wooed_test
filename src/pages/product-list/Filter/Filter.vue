<template>
    <div class="filter-container">
        <div class="filter">
            <div class="filter__left">
                <div class="filter__left-icon">
                    <Cart
                        v-if="filterObject.isListCards && isData"
                        @click="showCart"
                    />
                    <ListBullet
                        v-if="filterObject.isShowCart"
                        @click="showCard"
                    />
                </div>
                <div class="filter__left-subtitle">
                    <Title
                        v-if="!isMap && operationType === 'lease'"
                        type="h4"
                        label="Louer un bien"
                        weight="bold"
                    />
                    <Title
                        v-if="!isMap && operationType === 'sale'"
                        type="h4"
                        label="Acquérir un bien"
                        weight="bold"
                    />
                </div>
                <Title v-if="isMap" type="h4" label="Map View" weight="bold" />
            </div>

            <div class="filter__right">
                <div class="filter__right-btn">
                    <Button
                        v-if="filterObject.isListCards && isData"
                        @on-click="showCart"
                        typeButton="secondary"
                    >
                        <div>
                            <Cart color="#fff" />
                            <span> Sur carte </span>
                        </div>
                    </Button>
                    <Button
                        @on-click="filterObject.showCart"
                        v-if="
                            (filterObject.isShowCart ||
                                filterObject.isShowInfo) &&
                            !isMap
                        "
                        typeButton="secondary"
                    >
                        <div @click="showCard">
                            <ListBullet color="#fff" />
                            <span> Sur Liste</span>
                        </div>
                    </Button>
                </div>
                <FullScreen v-if="isMap" @click="showCart" />
            </div>
        </div>
        <div v-if="operationType === 'lease'">
            <TabsCard :dataTabs="dataTabs" @change="handleChange" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import TabsCard from '@/components/Display/TabsCard/TabsCard.vue';
    import Cart from '@/components/Icon/Cart.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import ListBullet from '@/components/Icon/ListBullet.vue';
    import { inject, ref } from 'vue';
    import FullScreen from '../../../components/Icon/FullScreen.vue';

    interface Option {
        value: string;
        label: string;
    }

    const dataTabs = [
        {
            tabTitle: 'Tout',
            tabName: 'all',
        },
        {
            tabTitle: 'Location classique',
            tabName: 'Location classique',
        },
        {
            tabTitle: 'Hébergement touristique',
            tabName: 'Hebergement touristique',
        },
        {
            tabTitle: 'Location à la minute',
            tabName: 'Location a la minute',
        },
        {
            tabTitle: "Atelier d'artiste",
            tabName: "Atelier d'artiste",
        },
    ];
    let filterObject: any = inject('filterObject');

    const emit = defineEmits<{
        (e: 'on-show-cart'): void;
        (e: 'on-show-card'): void;
        (e: 'on-show-info'): void;
        (e: 'change-select', value: object): void;
        (e: 'on-filter', value: any): void;
        (e: 'on-filter-address', value: any): void;
        (e: 'location-filter-product', value: string): void;
        (e: 'fetch-all-location'): void;
        (e: 'on-reset-filter'): void;
    }>();
    defineProps({
        isMap: {
            type: Boolean,
            default: false,
        },
        isData: {
            type: Boolean,
            default: true,
        },
        operationType: {
            type: String,
            default: '',
        },
    });

    const showCart = () => {
        emit('on-show-cart');
    };

    const showCard = () => {
        emit('on-show-card');
    };
    function handleChange(name: string) {
        if (name === 'all') {
            emit('fetch-all-location');
        } else {
            emit('location-filter-product', name);
        }
    }
</script>

<style lang="scss" scoped>
    .fade-filter-enter-active,
    .fade-filter-leave-active {
        @apply transition-all;
    }
    .fade-filter-enter-from,
    .fade-filter-leave-to {
        @apply opacity-0 scale-0;
    }
    .filter {
        @apply flex items-center justify-between px-[14px] py-[4px];
        background-color: white;
        border-radius: 8px;
        @screen md {
            @apply py-[12px] px-[16px];
        }
        &__left {
            @apply flex flex-col sm:self-start gap-2;
            &-icon {
                @apply hidden;
            }
            // &-subtitle {
            //     @apply hidden sm:block;
            // }
        }
        &__right {
            @apply flex flex-col items-end gap-2;

            &-btn {
                // @apply hidden sm:block;
                width: 140px;
                div {
                    @apply flex flex-row justify-end items-center gap-2;
                }
            }

            &-content {
                @apply flex  gap-4;
                height: 33px;

                &-select {
                    width: 126px;
                    .custom-select__wrapper {
                        &:deep() {
                            .ant-select-selector {
                                border: none;
                                font-size: 14px;
                                height: 33px;
                                border-radius: 15px;
                                background-color: #f2f2f2;
                                span {
                                    font-weight: bold;
                                }
                            }
                            .ant-select-selection-placeholder {
                                @apply flex items-center;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
