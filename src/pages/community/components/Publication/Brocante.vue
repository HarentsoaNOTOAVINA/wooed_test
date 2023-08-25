<script lang="ts" setup>
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { string } from 'vue-types';
    import { formatDateFr, formatHourFr } from "@/utils/date/format";

    const props = defineProps({
        image: {
            type: string,
            default:
                'https://petitpalaisdaglae-gordes.com/wp-content/uploads/2017/04/brocante32-1024x768.jpg',
        },

        publication : {
            type : Object,
            default : {}
        }
    });
</script>

<template>
    <div class="brocante">
        <div
            class="brocante__container--wrap"
            :style="{ 'background-image': `url(${props.image})` }"
        >
            <div class="brocante__container">
                <div class="brocante__items">
                    <Paragraphe>
                        <strong> Brocante le </strong>
                        <span> {{formatDateFr(publication.fleatMarket.date)}} </span>
                    </Paragraphe>
                    <span
                        >A
                        <strong> {{publication.fleatMarket.place}} </strong>
                    </span>
                    <span
                        >Prix
                        <strong> {{publication.fleatMarket.minPrice}} € </strong>
                        à
                        <strong> {{publication.fleatMarket.maxPrice}} € </strong>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .brocante {
        @apply flex flex-col gap-y-[18px];
        &__container--wrap {
            background-repeat: no-repeat;
            background-size: cover;
            background-position: center -20px;
            min-height: 266px;
            @apply relative p-[18px] rounded-[4px] flex flex-col justify-center;
            &:after {
                content: '';
                @apply absolute top-0 left-0 w-full h-full bg-grayIcon opacity-60;
            }
        }
        &__container {
            max-width: 442px;
            @apply mx-auto w-full relative z-10;
            &:deep() {
                .ant-radio-wrapper {
                    @apply bg-white;
                }
                .ant-radio-wrapper-checked {
                    @apply bg-primary;
                }
            }
        }
        &__items {
            @apply text-white flex flex-col items-center text-center gap-y-[4px];
            span {
                @apply text-white text-[14px];
                strong {
                    @apply text-white;
                }
            }
        }
    }
</style>
