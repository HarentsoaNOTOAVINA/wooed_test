<template>
    <div>
        <MainContainer>
            <MainCard
                :dataBreadcrumbs="breadcrumbListsData"
                class="supplierMenu__section"
            >
                <Loader v-if="isLoadPropertyDetails" />
                <div v-else class="supplierMenu__container">
                    <!-- :to="item.link" -->
                    <div
                        v-for="(item, index) in supplierMenu"
                        :key="index"
                        class="supplierMenu__link"
                        @click="handleClick(item.type, item.link)"
                    >
                        <CardWrapper class="supplierMenu__item">
                            <Icon
                                :icon-name="item.icon"
                                class="supplierMenu__icon"
                            />

                            <Title
                                type="h2"
                                :label="item.label"
                                weight="600"
                                class="supplierMenu__title"
                            />
                        </CardWrapper>
                    </div>
                </div>
            </MainCard>
        </MainContainer>
    </div>
</template>

<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { useStore } from 'vuex';
    import MainContainer from './components/MainContainer.vue';
    import { useRoute, useRouter } from 'vue-router';
    import { computed, onMounted, ref } from 'vue';
    import PropertyDetailService from '@/services/PropertyDetailService';
    import Loader from '@/components/Common/Loader/Loader.vue';

    const route = useRoute();
    const router = useRouter();
    const theProperty = computed(() => route.params.id);

    const store = useStore();
    defineProps({
        label: {
            type: String,
            default: '',
        },
        icon: {
            type: String,
            default: '',
        },
        link: {
            type: String,
            default: '#',
        },
    });

    interface MenuContent {
        label: string;
        icon: string;
        link: string;
        type: string;
    }

    const supplierMenu: MenuContent[] = [
        {
            label: 'Gaz',
            icon: 'Gas',
            link: '/fournisseur/gaz/' + theProperty.value,
            type: 'gaz',
        },
        {
            label: 'Eau',
            icon: 'Water',
            link: '/fournisseur/eau/' + theProperty.value,
            type: 'water',
        },
        {
            label: 'Electricité',
            icon: 'Electricity',
            link: '/fournisseur/electricite/' + theProperty.value,
            type: 'electricity',
        },
    ];

    const isLoadPropertyDetails = ref<boolean>(true);

    const breadcrumbListsData = [
        {
            label: 'Fournisseur',
        },
    ];

    onMounted(() => handleEnergySupplier());

    async function handleEnergySupplier() {
        try {
            const { data } = await PropertyDetailService.getProductDetail(
                +theProperty.value as number
            );
            const {waterSupplier, gazSupplier, elecSupplier} = data;
            store.dispatch('SupplierModule/updateSupplierList', {waterSupplier, gazSupplier, elecSupplier});
        } finally {
            isLoadPropertyDetails.value = false;
        }
    }

    const handleClick = function (type: string, link: string) {
        store.dispatch('SupplierModule/updateEnergyType', type);
        router.push(link);
    };
</script>

<style lang="scss" scoped>
    .supplierMenu {
        &__container {
            // @apply grid grid-cols-1 gap-[10px] w-full;
            // @screen sm {
            //     @apply grid-cols-2 gap-[21px];
            // }
            // @screen md {
            //     @apply grid-cols-3 gap-[21px];
            // }
            @apply flex flex-col h-full justify-center gap-[50px] md:px-[100px];
        }
        &__link {
            cursor: pointer;
            &:hover,
            &:active {
                .supplierMenu__item {
                    @apply bg-strokeGray transition;
                }
            }
        }
        &__item {
            @apply flex flex-col items-center gap-[10px] transition-colors border-strokeGray;
        }
        &__title {
            @apply text-[14px];
        }
        &__icon {
            @apply w-[28px] h-[28px];
            @screen sm {
                @apply w-[40px] h-[40px];
            }
            &:deep() {
                svg {
                    @apply w-[100%] h-auto;
                }
            }
        }
    }
</style>
