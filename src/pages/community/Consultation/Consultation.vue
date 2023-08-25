<script lang="ts" setup>
    import Map from '@/components/section/map/index.vue';
    import CommunityCard from '@/pages/community/components/CommunityCard.vue';
    import CommunityPerimeters from '@/pages/community/components/CommunityPerimeters.vue';

    interface dataModal {
        icon?: string;
        buttonLabel?: string;
        type?: string;
        modalTitle?: string;
        modalButton?: string;
    }
    const modalPartenariatData: dataModal = {
        icon: 'Service',
        buttonLabel: 'Communauté',
        type: 'consultation',
        modalTitle: 'Consultations',
        modalButton: 'Acceder aux consultations',
    };
</script>

<template>
    <div class="community community__container">
        <CommunityPerimeters
            :buttonTitle="modalPartenariatData.modalButton"
            type-action="consultation"
            :data="{type: 'consultation'}"
        />
    </div>
</template>
<style lang="scss" scoped>
    .community {
        &__container {
            @apply bg-white rounded-[8px] p-[20px];
        }

        &:deep() {
            .service__container {
                @apply w-[100%] p-[20px] flex flex-col gap-[20px];
            }

            .service__map--container {
                @apply flex flex-col gap-[20px];
            }
        }
    }
</style>
