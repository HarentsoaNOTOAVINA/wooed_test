<template>
    <MainCard
        :dataBreadcrumbs="breadcrumbListsData"
        class="personalInformation__section"
    >
        <div class="personalInformation__container">
            <Profile />
            <Information />
            <Identity />
        </div>
    </MainCard>
</template>
<script lang="ts" setup>
    import MainCard from '@/components/Display/MainCard/MainCard.vue';
    import Identity from './PersonalInformation/Identity.vue';
    import Information from './PersonalInformation/Information.vue';
    import Profile from './PersonalInformation/Profile.vue';

    const props = defineProps({
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

    const breadcrumbListsData = [
        {
            label: 'Mes informations',
        },
    ];
</script>
<style lang="scss" scoped>
    .personalInformation {
        &__container {
            @apply flex flex-col gap-y-[18px];
        }
    }
</style>
