<template>
    <div>
        <div class="link">
            <RoundLink /><a
                href="https://www.dewatergroep.be/nl-be/drinkwater/wat-te-doen-bij/stopzetten-of-heropenen/aanvraag-stopzetting-contract-met-wegname-watermeter"
                >Poursuivre le lien</a
            >
        </div>
    </div>
</template>
<script lang="ts" setup>
import RoundLink from '@/components/Icon/RoundLink.vue';


</script>
<style lang="scss" scoped>
    .link {
        @apply flex gap-[18px] items-center;
        a {
            color: var(--color-primary);
        }
    }
</style>
