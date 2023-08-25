<script lang="ts" setup>
import P from "@/components/Common/Paragraphe/Paragraphe.vue";
import Button from "@/components/Common/Button/Button.vue";

const infos = {
    title : "Gérer un bien",
    add : "Ajouter",
    interested : "Interressé"
}

const emit = defineEmits(['handleAdd', 'handleInterested']);


function redirectToAdd(){
    emit('handleAdd');
}

function redirectToUInterested(){
    emit('handleInterested');
}

</script>

<template>
    <div class="manage-header manage-header__container">
        <P class="manage-header__title">{{ infos.title }}</P>
        <div class="manage-header__action">
            <Button type-button="secondary" @click="redirectToAdd">{{ infos.add }}</Button>
            <!-- <Button type-button="gray" @click="redirectToUInterested">{{ infos.interested }}</Button> -->
        </div>
    </div>
</template>

<style lang="scss" scoped>
.manage-header{
    &__container{
        @apply bg-[white] rounded-[8px] p-[14px] flex  justify-between;
    }

    &__title{
        @apply font-semibold;
    }

    &:deep(){
        .button__secondary{
            @apply text-[12px] w-[120px];
        }
        .button__gray{
            @apply text-[12px] w-[120px];
        }
    }

    &__action{
        @apply flex flex-col gap-[15px];
    }
}

</style>