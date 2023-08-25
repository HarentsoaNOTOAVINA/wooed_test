<template>
    <div class="community community__container">
        <CommunityPerimeters
                :buttonTitle="modalPartenariatData.modalButton"
                type-action="otherService"
                :data="{type: 'services'}"
            />
    </div>
</template>

<script setup lang="ts">
import CommunityPerimeters from '@/pages/community/components/CommunityPerimeters.vue';

interface dataModal {
        icon?: string;
        buttonLabel?: string;
        type?: string;
        modalTitle?: string;
        modalButton?: string;
    }
const modalPartenariatData: dataModal = 
        {
            icon: 'Service',
            buttonLabel: 'Divers services',
            type: 'services',
            modalTitle: 'Services divers',
            modalButton: 'Acceder aux services divers',
        }

</script>

<style lang="scss" scoped>
.community{
    &__container{
        @apply bg-white rounded-[8px] p-[20px];
    }

    &:deep(){
        .service__container{
            @apply w-[100%] p-[20px] flex flex-col gap-[20px];
        }

        .service__map--container{
            @apply flex flex-col gap-[20px];
        }
    }
}
</style> 