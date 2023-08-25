<template>
    <MainCard :dataBreadcrumbs="breadcrumbListsData" class="statusAdmin">
        <div class="statusAdmin__container place-content-14px">
            <div
                v-if="!showMenuStatus"
                class="statusAdmin__return"
                @click="goToMenu"
            >
                <Icon icon-name="ArrowBack" />
                <Title type="h2" label="Retour" class="statusAdmin__title" />
            </div>
            <Title
                v-else
                type="h2"
                label="Statut administratif de mon bien"
                class="statusAdmin__title"
            />
            <hr class="__hr" />
            <template v-if="showMenuStatus">
                <transition appear name="fade-step">
                    <div class="statusAdmin__items">
                        <CardWrapper
                            v-for="(item, index) in menuStatus"
                            :key="index"
                            class="statusAdmin__item"
                            @click="handleClick(item)"
                        >
                            <Icon :iconName="item.icon" />
                            <span>
                                {{ item.label }}
                            </span>
                        </CardWrapper>
                    </div>
                </transition>
            </template>
            <component v-else :is="activeComp" />
            <!-- <Equipment />
            <ConditionExploitation /> -->
        </div>
    </MainCard>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import { ref, shallowRef, watch, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { statusData, StatusData } from './MenuStatusAdmin';

    const breadcrumbListsData = [
        {
            label: 'Biens mis en location : GESTION (LOCATION)',
        },
    ];

    const menuStatus = ref<StatusData[]>(statusData);
    const activeComp = shallowRef<any>();
    const router = useRouter();
    const route = useRoute();
    const type = ref('');
    const showMenuStatus = ref<boolean>(true);

    onMounted(() => {
        addQueryParams();
        if (router.currentRoute.value.query.type) {
            type.value = router.currentRoute.value.query.type as string;
        }
        if (router.currentRoute.value.query.status) {
            showMenuStatus.value = !showMenuStatus.value;
        }
    });

    watch(
        () => activeComp.value,
        (v) => (activeComp.value = v),
        { immediate: true, deep: true }
    );

    function handleClick(item: any) {
        // activeComp.value = item.component;
        router.push({
            query: {
                type: type.value,
                status: item.query,
            },
        });
    }

    function addQueryParams() {
        if (route.query.status) {
            const comp = statusData.filter((item) => {
                return item.query === route.query.status;
            });
            activeComp.value = comp[0].component;
        }
    }

    function goToMenu() {
        router.push({
            query: {
                type: type.value,
            },
        });
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .statusAdmin {
        &__container {
            @apply h-full min-h-[400px];
        }
        &__title {
            @apply font-[600] text-[14px] text-primary;
        }
        &__items {
            @apply grid grid-cols-2 gap-[18px];
            @screen sm {
                @apply grid-cols-3;
            }
            @screen md {
                @apply grid-cols-2;
            }
            @screen lg {
                @apply grid-cols-3;
            }
        }
        &__item {
            @apply place-content-14px bg-gray font-[600] cursor-pointer text-center transition-all duration-300;
            @include hoverButtonDark;
            &:hover {
                @apply scale-[1.07] transition-all duration-300;
            }
            &:deep() {
                .icon {
                    svg {
                        @apply w-[28px] h-[28px];
                    }
                }
            }
        }
        &__return {
            @apply flex items-center gap-[14px] cursor-pointer w-max;
            &:deep() {
                .icon {
                    svg path {
                        @apply fill-primary;
                    }
                }
            }
            &:hover {
                .statusAdmin__title {
                    @apply text-secondary;
                }
                &:deep() {
                    .icon {
                        svg path {
                            @apply fill-secondary;
                        }
                    }
                }
            }
        }
    }
    .fade-step-enter-active,
    .fade-step-leave-active {
        transition: all 0.3s ease-in-out;
    }

    .fade-step-enter-from,
    .fade-step-leave-to {
        opacity: 0;
        transform: translateX(-100px);
    }
</style>
