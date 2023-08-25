<template>
    <div class="exchange-items exchange-ownerProperty">
        <div class="exchange-items__container">
            <div class="exchange-items__card" @click="$emit('on-select-owner-property-way', 'choose')">
                <div class="exchange-items__choice exchange-ownerProperty__choice">
                    <BuildingHome />
                    <span>Sélectionner l’un de « mes biens » </span>
                </div>
            </div>
            <div class="exchange-items__card" @click="$emit('on-select-owner-property-way', 'create')">
                <div class="exchange-items__choice exchange-ownerProperty__choice">
                    <AddSecurity />
                    <span>Ajouter un bien</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import BuildingHome from '@/components/Icon/BuildingHome.vue';
    import AddSecurity from '@/components/Icon/AddSecurity.vue';
</script>
<style lang="scss" scoped>
    .exchange-items {
        &__container {
            @apply flex gap-[20px] w-full flex-col p-[20px] md:justify-center justify-start items-center;
        }
        &:deep() {
            svg {
                @apply w-[40px] h-[40px];
            }
            path {
                fill: var(--color-primary);
            }
        }
        &__card {
            @apply border border-primary rounded-[8px] md:w-1/2 w-full;
            &:hover {
                @apply cursor-pointer bg-gray;
            }
        }
        span {
            @apply uppercase text-[14px] text-primary;
        }
    }
</style>
