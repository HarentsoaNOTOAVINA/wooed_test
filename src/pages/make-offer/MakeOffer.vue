

<template>
    <div class="make__offer">
        <!-- <FormMakeOffer /> -->
        <MakeOfferForm />
    </div>
</template>

<script setup lang="ts">
// import FormMakeOffer from './formulaire/FormMakeOffer.vue';
import MakeOfferForm from '@/pages/make-offer/form/MakeOfferForm.vue';

</script>

<style lang="scss" scoped>
.make{
    &__offer{
        @apply container w-full ;
    }
}
</style>