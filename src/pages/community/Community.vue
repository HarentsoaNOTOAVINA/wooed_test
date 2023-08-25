<template>
    <div class="community__container">
        <SideMenu class="community__side-menu" @active-comp="changeComponent" :menuActive="menuNameActive" />
        <component :is="activeComponent" class="community__items" />
    </div>
</template>
<script lang="ts" setup>
    // import QuarterCommittee from '@/pages/community/QuarterCommittee/QuarterCommitteeList.vue';
    // import Service from '@/pages/community/Services/Services.vue';
    // import Education from '@/pages/community/Education/Education.vue';
    import Consultation from '@/pages/community/Consultation/Consultation.vue';
    import SideMenu from '@/pages/community/components/CommunitySideMenu/CommunitySideMenu.vue';
    import { dataSideMenu } from './components/CommunitySideMenu/dataMenu';
    import { useRoute, useRouter } from 'vue-router';
    import { ref, onMounted, computed, shallowRef } from 'vue';

    const router = useRouter();
    const route = useRoute();
    const activeComponent = shallowRef<any>(Consultation);
    const menuNameActive = shallowRef<any>();
    const type = ref('');

    onMounted(() => {
        if (route.query.type) {
            const comp = dataSideMenu.filter((item) => {
                return item.name === route.query.type;
            });
            activeComponent.value = comp[0].component;
            menuNameActive.value = comp[0];
        }
    });

    function changeComponent(item: any, event: any) {
        router.push({
            name: 'community',
            query: { type: item.name },
        });
        activeComponent.value = item.component;
        menuNameActive.value = item.name;
    }

    onMounted(() => {
        if (router.currentRoute.value.query.type) {
            type.value = router.currentRoute.value.query.type as string;
        }
    });

</script>
<style scoped lang="scss">
    .community {
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
        &__sideMenu {
            @apply mb-[14px];
            min-height: calc(100vh - 94px);
        }
        &__items {
            @apply mt-0 px-0;
        }
    }
</style>
