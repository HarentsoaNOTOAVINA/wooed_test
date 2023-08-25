<template>
    <MainContainer class="syndic__container">
        <SideMenu
            class="syndic__sidemenu"
            @active-comp="setActiveDisplay"
            @data-side-menu="data"
        />
        <div class="syndic__section">
            <component :is="activeDisplay" />
        </div>
    </MainContainer>
</template>
<script lang="ts" setup>
    import { shallowRef } from 'vue';
    import SideMenu from '@/pages/syndic/components/SideMenu/SideMenu.vue';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';

    const activeDisplay = shallowRef<object | any>();

    function data(value: any) {
        activeDisplay.value = value[0].component;
    }

    function setActiveDisplay(value: any) {
        activeDisplay.value = value.component;
    }
</script>
<style lang="scss" scoped>
    .syndic {
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
                @apply mb-[14px];
                min-height: calc(100vh - 94px);
            }
        }

        &__section {
            @apply px-0 mt-0 w-full max-w-none;

            @screen md {
                max-width: calc(100% - 339px);
            }
        }
    }
</style>
