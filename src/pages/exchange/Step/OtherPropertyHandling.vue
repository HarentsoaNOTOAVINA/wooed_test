<template>
    <div class="exchange-items exchange-other-property">
        <div class="exchange-items__container">
            <div
                class="exchange-items__card"
                @click="$emit('on-select-other-property-way', true)"
            >
                <div class="exchange-items__choice">
                    <Icon icon-name="HouseExchange" />
                    <span
                        >Sélectionner un bien dans la liste des biens
                        « échangeables »</span
                    >
                </div>
            </div>
            <div
                class="exchange-items__card"
                @click="$emit('on-select-other-property-way', false)"
            >
                <div class="exchange-items__choice">
                    <Icon icon-name="ThreeHouse" />
                    <span
                        >Sélectionner un bien n’étant pas encore proposé à
                        l’échange</span
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
    import House from '@/components/Icon/ThreeCollapsedHouses.vue';
    import HouseExchange from '@/components/Icon/HouseExchange.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
</script>
<style lang="scss" scoped>
    .exchange-items {
        &__container {
            @apply flex gap-[20px]  w-full flex-col p-[20px] md:justify-center justify-start items-center text-center;
        }
        span {
            @apply text-primary;
        }
        &:deep() {
            svg {
                @apply w-[60px] h-[50px];
            }
        }
        &__card {
            @apply border border-primary rounded-[8px] md:w-1/2 w-full;
            &:hover {
                @apply cursor-pointer bg-gray;
            }
        }
        span {
            @apply uppercase text-[14px];
        }
    }
</style>
