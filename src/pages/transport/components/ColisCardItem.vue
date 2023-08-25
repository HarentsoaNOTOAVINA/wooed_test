<template>
    <Card
        class="cardItem"
        :class="
            (gridHorizontal ? 'cardItem--horizontal ' : '') +
            (smallCard ? 'cardItem--smallCard' : '')
        "
        @click="handleClick"
    >
        <div class="cardItem__figure-wrap">
            <figure class="cardItem__figure-img">
                <img :src="colisData.image" alt="Image" />
            </figure>
            <Paragraphe class="cardItem__figure-content">
                <span v-if="colisData.dateExpiration === 'expired'">
                    Cette annonce est expiré
                </span>
                <span v-else-if="colisData.dateExpiration === 'today'">
                    Cette annonce expire aujourd'hui
                </span>
                <span v-else-if="colisData.dateExpiration === 1">
                    Cette annonce expirera demain
                </span>
                <span v-else>Expire dans {{ colisData.dateExpiration }} jours</span>
            </Paragraphe>
            <span v-if="colisData.budget" class="cardItem__head-price">
                {{ colisData.budget }} €
            </span>
        </div>
        <div class="cardItem__items">
            <div class="cardItem__items-head">
                <Paragraphe class="cardItem__head-title">
                    {{ colisData.title }}
                </Paragraphe>
            </div>
            <div class="cardItem__items-container">
                <div v-if="colisData.format" class="cardItem__items-content">
                    <Icon icon-name="Box" />
                    <span>Format : {{ colisData.format }}</span>
                </div>
                <div v-if="colisData.address" class="cardItem__items-content">
                    <Icon icon-name="MapMarkerLine" />
                    <span>
                        {{ colisData.address }}
                    </span>
                </div>
                <div class="cardItem__items-content">
                    <Icon icon-name="SmallCalendar" />
                    <span
                        >A livrer entre le {{ colisData.startingDate }} et le
                        {{ colisData.endingDate }}</span
                    >
                </div>
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Card from '@/components/Display/Card/Card.vue';

    const emit = defineEmits(['click']);

    const props = defineProps({
        colisData: {
            type: Object,
            default: null,
        },
        gridHorizontal: {
            type: Boolean,
            default: false,
        },
        smallCard: {
            type: Boolean,
            default: false,
        },
    });

    function handleClick() {
        emit('click', { announcementInfo: props.colisData });
    }
</script>

<style lang="scss" scoped>
    .cardItem {
        @apply grid grid-cols-1 gap-[14px] border-strokeGray border-[0.5px] p-[10px];
        @screen sm {
            @apply grid-cols-2;
        }
        @screen md {
            @apply grid-cols-1;
        }
        @screen lg {
            @apply grid-cols-2;
        }
        &__figure-wrap {
            @apply relative rounded-[8px] overflow-hidden;
        }
        &__figure-img {
            @apply w-full h-[178px] flex items-center justify-center bg-gray;
            @screen lg {
                @apply h-[145px];
            }
            img {
                @apply w-full h-full object-cover;
            }
        }
        &__figure-content {
            @apply absolute bottom-0 w-full text-center p-[4px] font-bold text-white;
            background: linear-gradient(
                0deg,
                #000000 0%,
                rgba(0, 0, 0, 0.2) 100%
            );
        }
        &__items {
            @apply flex flex-col gap-y-[14px];
        }
        &__items-head {
            @apply flex justify-between items-start gap-x-[4px];
        }
        &__head-title {
            @apply font-semibold mt-[6px];
        }
        &__head-price {
            background: #ffecec;
            @apply absolute top-[4px] right-[4px] text-alertStrRose rounded-[4px] px-[12px] py-[4px] font-semibold;
        }
        &__items-container {
            @apply flex flex-col gap-y-[8px];
        }
        &__items-content {
            @apply flex items-center gap-x-[8px] text-[12px] text-strokeGray font-semibold;
            span {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
        }
        &--horizontal {
            @apply grid grid-cols-1;

            .cardItem__figure-wrap {
                @apply col-span-1;
            }

            .cardItem__items {
                @apply col-span-1;
            }
        }
        &--smallCard {
            &:deep() {
                @apply gap-[6px] p-[6px];
                .cardItem {
                    &__figure-img {
                        @apply w-full h-[100px] flex items-center justify-center bg-gray;
                        @screen lg {
                            @apply h-[92px];
                        }
                    }
                    &__figure-content {
                        @apply text-[10px];
                    }
                    &__items {
                        @apply gap-y-[8px];
                    }
                    &__head-price {
                        @apply text-[10px] font-[700] px-[8px] py-[1px];
                    }
                    &__head-title {
                        @apply text-[12px] mt-0;
                    }
                    &__items-container {
                        @apply gap-y-[2px];
                    }
                    &__items-content {
                        @apply text-[10px];
                        .icon svg {
                            @apply w-[10px] h-[10px];
                        }
                    }
                }
            }
        }
    }
</style>
