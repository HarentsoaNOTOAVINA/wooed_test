<template>
    <MainContainer class="syndic__container">
        <div v-if="coOwnershipMode">
            <SideMenu
                class="syndic__sidemenu"
                @active-comp="setActiveDisplay"
                @data-side-menu="data"
            />
            <div class="syndic__section">
                <component :is="activeDisplay" />
            </div>
        </div>
        <CoProperty v-else :display-back-btn="true" />
    </MainContainer>
</template>
<script lang="ts" setup>
    import { shallowRef, onMounted, ref, defineAsyncComponent } from 'vue';
    import { useRoute } from 'vue-router';
    import { useStore } from 'vuex';
    import SideMenu from '@/pages/coproperty/components/SideMenu/SideMenu.vue';
    import MainContainer from '@/components/Display/MainContainer/MainContainer.vue';

    const CoProperty = defineAsyncComponent(
        () => import('@/pages/coproperty/components/CoProperty/index.vue')
    );

    const route = useRoute();
    const store = useStore();

    const coOwnershipMode = ref(false);

    const activeDisplay = shallowRef<object | any>();

    onMounted(async () => await checkRouteName());

    async function checkRouteName() {
        if (route.name === 'my-coproperty') {
            coOwnershipMode.value = true;
            await store.dispatch('CoPropertyModule/fetchUsersCoOwnership');
        }
    }

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
