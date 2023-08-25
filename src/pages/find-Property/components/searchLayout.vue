<template>
    <MainContainer class="searchLayout">
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            class="searchLayout__container max-container"
            :button="true"
        >
            <!-- <slot name="header" /> -->
            <div v-if="slotSearch" class="find-container">
                <div class="find-input">
                    <slot name="search" />
                    <Icon iconName="Search" />
                </div>
            </div>
            <slot name="searchContainer" />

            <div class="container-list">
                <slot name="result">
                    <PropertyList :DataCard="productList" :isBordered="true" />
                </slot>
            </div>
            <template #buttonFooter>
                <slot name="buttonSearch" />
            </template>
        </MainCard>
    </MainContainer>
</template>
<script setup lang="ts">
    import PropertyList from '@/components/section/ListProducts/ListProducts.vue';
    import { useStore } from 'vuex';
    import { onMounted, computed } from 'vue';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    const store = useStore();

    const props = defineProps({
        breadcrumbListsData: {
            type: Array,
            default: [],
        },
        slotSearch: {
            type: Boolean,
            default: true,
        },
    });

    onMounted(() => {
        store.commit('FindPropertyModule/resetPropertyList');
    });

    const productList = computed(
        () => store.getters['FindPropertyModule/getPropertyLists']
    );
</script>

<style lang="scss" scoped>
    .searchLayout {
        &:deep() {
            .mainCard, .mainCard__container {
                min-height: calc(100vh - 94px);
            }
            .mainCard__items-wrap-btn {
                @apply flex flex-col gap-[18px];
            }
        }
        .find {
            &-container {
                @apply flex flex-col items-center;
            }
            &-input {
                @apply w-full relative bg-gray;
                @screen sm {
                    @apply max-w-[567px];
                }
                &:deep() {
                    input {
                        @apply w-full h-[38px] p-2 pr-[36px] bg-transparent outline-none;
                    }
                    .custom-select__wrapper {
                        @apply mb-0;
                    }
                }
                .icon {
                    @apply absolute top-[50%] translate-y-[-50%] right-[14px];
                }
            }
        }

        .container {
            &-list {
                @apply mt-[18px];
                & > .product-card {
                    @apply grid grid-cols-1 gap-[10px] w-full;
                    @screen sm {
                        @apply grid-cols-2;
                    }
                    @screen lg {
                        @apply grid-cols-3;
                    }
                }
            }
        }
    }
</style>
