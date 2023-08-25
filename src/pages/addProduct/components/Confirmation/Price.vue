<template>
    <div class="confirmation-base">
        <div class="confirmation-base__item" v-if="props.data.startPrice">
            <Paragraphe class="confirmation-base__title">Prix de départ</Paragraphe>
            <Paragraphe>{{ props.data.startPrice }} €</Paragraphe>
        </div>

        <!-- <hr class="confirmation-base__divider"> -->

        <div class="confirmation-base__item" v-if="props.data.prices">
            <Paragraphe class="confirmation-base__title">Montant</Paragraphe>
            <Paragraphe>{{ props.data.prices }} €</Paragraphe>
        </div>
        
        <!-- <hr class="confirmation-base__divider" v-if="props.data.prices"> -->
        
        <div class="confirmation-base__item" v-if="props.data.floorPrice">
            <Paragraphe class="confirmation-base__title">Prix planché</Paragraphe>
            <Paragraphe>{{ props.data.floorPrice }} €</Paragraphe>
        </div>
        
        <!-- <hr class="confirmation-base__divider"> -->
        
        <!-- <div class="confirmation-base__item">
            <Paragraphe>Montant minimum reservation</Paragraphe>
            <Paragraphe>2222 €</Paragraphe>
        </div> -->
        
        <!-- <hr class="confirmation-base__divider"> -->

        <div class="confirmation-base__item" v-if="props.data.cadastre">
            <Paragraphe class="confirmation-base__title">Cadastre</Paragraphe>
            <Paragraphe>{{props.data.cadastre}} €</Paragraphe>
        </div>
        
        <!-- <hr class="confirmation-base__divider"> -->

        <div class="confirmation-base__item" v-if="props.data.cadastralretur">
            <Paragraphe class="confirmation-base__title">Revenu cadastral</Paragraphe>
            <Paragraphe>{{ props.data.cadastralreturn }} €</Paragraphe>
        </div>
    </div>
</template>

<script setup lang="ts">
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';


const props = defineProps({
    data : {
        type : Object,
        default : () => {}
    }
})

</script>

<style lang="scss" scoped>
.confirmation-base {
    padding: 15px;
    background-color: var(--color-gray);
    border-radius: 8px;
    @apply flex flex-col gap-[24px];
    &__item {
        @apply relative flex justify-between;
        &::after {
            content: "";
            @apply absolute bottom-[-14px] w-full h-[1px] bg-white;
        }
        &:last-child {
            &::after {
                @apply hidden;
            }
        }
        &:deep() {
            .confirmation-base__title {
                @apply font-[600];
            }
        }
    }
    
    &__divider{
        @apply text-white;
    }
}
</style>