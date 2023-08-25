<template>
    <div class="colis__container">
        <figure class="colis__figure">
            <img
                :src="props.announcementDetails.image"
                alt="Image"
            />
        </figure>
        <div class="colis__items">
            <div class="colis__item-wrap">
                <div class="colis__item">
                    <Icon icon-name="Discount" />
                    <span class="colis__label">Propositions</span>
                    <div>
                        <span v-if="props.announcementDetails.propositions && props.announcementDetails.propositions.length > 0" class="colis__content">{{ props.announcementDetails.propositions.length }}</span>
                        <span v-else class="colis__content">Aucune</span>
                    </div>
                    
                </div>
                <div class="colis__item">
                    <Icon icon-name="Tarif" />
                    <span class="colis__label">Budget</span>
                    <span class="colis__content">{{ props.announcementDetails.budget }}€</span>
                </div>
                <div class="colis__item">
                    <Icon icon-name="CalendarDate" />
                    <span class="colis__label">Livraison souhaité</span>
                    <span class="colis__content">{{ props.announcementDetails.deliveryDate}}</span>
                </div>
            </div>
            <hr class="__hr" />
            <div class="colis__item-wrap--col">
                <div v-if="props.objectData.weight" class="colis__item colis__item--col">
                    <span class="colis__label">Poids</span>
                    <span class="colis__content">{{ props.objectData.weight }} kg</span>
                </div>
                <div v-if="props.objectData.length && props.objectData.width && props.objectData.height" class="colis__item colis__item--col">
                    <span class="colis__label">Dimension</span>
                    <span class="colis__content">{{ props.objectData.length }}cm x {{ props.objectData.width }}cm x {{ props.objectData.height }}cm</span>
                </div>
                <div v-else class="colis__item colis__item--col">
                    <span class="colis__label">Taille</span>
                    <span v-if="props.objectData.sizeValue" class="colis__content">{{ props.objectData.sizeValue }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    const props = defineProps({
        objectData: {
            type: Object,
            default: {}
        },
        announcementDetails: {
            type: Object,
            default: {}
        }
    })
</script>

<style lang="scss" scoped>
    .colis {
        &__container {
            @apply flex flex-col gap-[14px];
            @screen sm {
                @apply grid grid-cols-10;
            }
            @screen md {
                @apply grid-cols-1 gap-[18px];
            }
            @screen lg {
                @apply grid-cols-10 gap-[18px];
            }
        }
        &__figure {
            @apply h-[167px] flex items-center justify-center bg-gray rounded-[8px] overflow-hidden;
            @screen sm {
                @apply col-span-4 h-[210px];
            }
            @screen md {
                @apply col-span-1;
            }
            @screen lg {
                @apply col-span-4;
            }
            img {
                @apply object-contain w-full h-full;
            }
        }
        &__items {
            @apply bg-gray flex flex-col gap-[18px] p-[14px] rounded-[8px];
            @screen sm {
                @apply col-span-6;
            }
            @screen md {
                @apply col-span-1;
            }
            @screen lg {
                @apply col-span-6 px-[36px] py-[18px];
            }
        }
        &__item-wrap {
            @apply flex justify-between gap-[4px];
            &--col {
                @apply flex flex-col gap-y-[18px];
            }
        }
        &__item {
            @apply text-center flex flex-col gap-y-[5px];
            .icon {
                @apply mb-[3px];
            }
            &--col {
                @apply flex-row justify-between;
                .colis {
                    &__label {
                        @apply text-[10px];
                        @screen sm {
                            @apply text-[14px];
                        }
                    }
                    &__content {
                        @apply text-[10px];
                        @screen sm {
                            @apply text-[12px];
                        }
                    }
                }
            }
        }
        &__label {
            @apply text-grayIcon font-[300] text-[10px];
            @screen sm {
                @apply text-[12px];
            }
        }
        &__content {
            @apply font-[700] text-[10px];
            @screen sm {
                @apply font-[600] text-[14px];
            }
        }
    }
    .__hr {
        @apply text-white;
    }
</style>
