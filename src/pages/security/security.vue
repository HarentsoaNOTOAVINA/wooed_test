<template>
    <div class="security__container">
        <SideMenu class="security__sidemenu" @active-comp="changeComponent" />
        <component :is="activeComponent" class="security__section" />
    </div>
</template>
<script lang="ts" setup>
    import Agent from '@/pages/security/components/Agent.vue';
    import SideMenu from '@/pages/security/components/SecuritySideMenu/SecuritySideMenu.vue';
    import { useRoute } from 'vue-router';
    import { ref, onMounted, computed, shallowRef } from 'vue';

    const propertyId = ref<any>();
    const route = useRoute();
    const activeComponent = shallowRef<any>(Agent);

    onMounted(() => {
        propertyId.value = route.params.id;
    });

    function changeComponent(item: any) {
        activeComponent.value = item.component;
    }
</script>
<style scoped lang="scss">
    .security {
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
            @apply px-0 mt-0 max-w-none w-full;
        }
    }
</style>
