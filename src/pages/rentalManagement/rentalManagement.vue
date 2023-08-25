<template>
    <MainContainer class="gestionLocation__container">
        <SideMenu
            class="gestionLocation__sidemenu"
            @active-comp="changeComponent"
            :data="dataSideMenu"
            titleMobile="Gestion (Location)"
        />
        <component :is="activeComponent" class="gestionLocation__section" />
    </MainContainer>
</template>
<script lang="ts" setup>
    import { useRoute, useRouter } from 'vue-router';
    import { ref, onMounted, computed, shallowRef } from 'vue';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';
    import SideMenu from '@/pages/rentalManagement/components/SideMenu/SideMenu.vue';
    import { dataSideMenu } from '@/pages/rentalManagement/components/SideMenu/data';

    const route = useRoute();
    const router = useRouter();
    const activeComponent = shallowRef<any>(dataSideMenu[0].component);

    onMounted(() => {
        addQueryParams();
    });

    function changeComponent(item: any) {
        // activeComponent.value = item.component;
        router.push({
            query: { type: item.query },
        });
        addQueryParams();
    }

    function addQueryParams() {
        if (route.query.type) {
            const comp = dataSideMenu.filter((item) => {
                return item.query === route.query.type;
            });
            activeComponent.value = comp[0].component;
        } else {
            router.push({
                query: { type: dataSideMenu[0].query },
            });
        }
    }
</script>
<style scoped lang="scss">
    .gestionLocation {
        &__container {
            @apply flex flex-col my-[18px] px-[15px] gap-y-[14px];
            @screen md {
                @apply flex-row gap-x-[18px] mb-0;
            }
            @screen lg {
                @apply gap-x-[20px] container;
            }
            @screen xl {
                @apply gap-x-[24px];
            }
        }
        &__sidemenu {
            @screen md {
                height: calc(100vh - 94px);
                @apply mb-[14px];
            }
        }
        &__section {
            @apply px-0 mt-0 max-w-none w-full;
            @screen md {
                width: calc(100% - 339px);
            }
            &:deep() {
                .custom-input__label-icon,
                .custom-select__wrapper,
                .switch,
                .date__space {
                    @apply mb-0;
                    label {
                        @apply font-[600] text-secondary;
                    }
                }
                .switch {
                    .ant-switch {
                        @apply h-[38px];
                    }
                }
                .__hr {
                    @apply my-0;
                }

                .ant-empty {
                    @apply flex flex-col w-full justify-center;
                }
            }
        }
    }
</style>
