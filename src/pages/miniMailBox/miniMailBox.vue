<template>
    <div class="miniMailBox">
        <SideMenu
            class="miniMailBox__sidemenu"
            @active-comp="changeComponent"
        />
        <MainCard
            :dataBreadcrumbs="breadcrumbListsData"
            class="miniMailBox__section"
        >
            <MessageContainer :email-type-view="typeView" />
        </MainCard>
    </div>
</template>
<script lang="ts" setup>
    import { Ref, ref, shallowRef } from 'vue';
    import SideMenu from './components/SideMenu/SideMenu.vue';
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import MessageContainer from './components/MessageContainer.vue';

    const breadcrumbListsData = [
        {
            label: 'Messages',
        },
    ];
    const typeView = ref<string>();

    function changeComponent(item: any) {
        typeView.value = item.type;
    }

</script>
<style scoped lang="scss">
    .miniMailBox {
        @apply container flex flex-col my-[18px] px-[15px] gap-y-[14px] relative;
        @screen md {
            @apply flex-row gap-x-[18px] mb-0;
        }
        @screen lg {
            @apply gap-[18px] container;
        }
        &__section {
            @apply w-full;
        }
        &__sidemenu {
            @apply relative;
            @screen md {
                @apply mb-[14px];
                min-height: calc(100vh - 94px);
            }
        }
        &__section {
            @apply px-0 mt-0 w-full max-w-none;
            @screen md {
                max-width: calc(100% - 248px);
            }
        }
        &:deep() {
            .mainCard__head-items,
            .mainCard__container > .__hr {
                @apply hidden;
                @screen lg {
                    @apply flex;
                }
            }
            .mainCard__container {
                @media (max-width: 1023px) {
                    @apply p-0 bg-transparent;
                }
            }
            .mainCard__items-wrap {
                @apply pt-0;
                @media (max-width: 1023px) {
                    height: calc(100vh - 93px);
                }
                @media (max-width: 767px) {
                    height: calc(100vh - 152px);
                }
            }
            @media (max-width: 767px) {
                .sideMenu__container {
                    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
                    @apply absolute top-[60px] w-full h-auto z-[1];
                }
            }
        }
    }
</style>
