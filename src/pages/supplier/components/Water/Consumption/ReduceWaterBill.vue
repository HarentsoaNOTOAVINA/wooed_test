<template>
    <div>
        <div class="link">
            <RoundLink /><a
                href="https://www.dewatergroep.be/nl-be/drinkwater/reglementering/waterscan/waterscan-aanvragen"
                >Je souhaite procéder à un « Waterscan »
            </a>
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
