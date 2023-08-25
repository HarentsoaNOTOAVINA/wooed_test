<template>
    <div class="confirmation-carac confirmation-carac__container">
        <div class="confirmation-carac__content">
            <div class="confirmation-carac__item" v-if="props.data.boilerType">
                <P class="confirmation-carac__title">Type de chaudière</P>
                <P>{{props.data.boilerType}}</P>
            </div>
            <div class="confirmation-carac__item" v-if="props.data.boilerInstallationTime">
                <P class="confirmation-carac__title">Date d'installation du chaudière</P>
                <P>{{formatDateFr(props.data.boilerInstallationTime)}}</P>
            </div>
            <div class="confirmation-carac__item" v-if="props.data.certnumber">
                <P class="confirmation-carac__title">Résultat PEB</P>
                <P>{{ props.data.certnumber }}</P>
            </div>
        </div>
        <div class="">
            <div class="energy__valuePEB-container">
                <div
                    v-for="item in PEBValue"
                    :key="item.id"
                    :class="[
                        props.data.primaryenergy <= item.max && props.data.primaryenergy >= item.min
                            ? 'energy__active'
                            : '',
                    ]"
                    class="energy__valuePEB"
                >
                    <P :style="{ background: item.color }">{{
                        item.label
                    }}</P>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import P from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { ref } from "vue";
    import { PEBValue } from '@/pages/addProduct/components/Energy/data';
import { formatDateFr } from '@/utils/date/format';

    const props = defineProps({
        data: {
            type: Object,
            default: () => {},
        },
    });

</script>

<style lang="scss" scoped>
    .confirmation-carac {
        background-color: var(--color-gray);
        @apply flex flex-col gap-[10px] p-[10px] rounded-[8px];
        &__container {
            @apply flex flex-col gap-[20px];
        }

        &__item {
            @apply w-full flex justify-between;
        }
        &__title {
            @apply font-[600];
        }
        &__content{
            @apply flex flex-col gap-[10px];
        }
    }

    .energy{
        &__valuePEB {
            p {
                @apply text-[white] w-[33px] h-[33px] rounded-[50%] flex justify-center items-center flex-wrap;
            }
        }
        &__active {
            position: relative;
            z-index: 9;
            &::after {
                content: '';
                width: 115%;
                height: 115%;
                display: inline-block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                border-radius: 50%;
                background-color: var(--color-primary);
                z-index: -1;
            }
        }

        &__valuePEB-container {
            @apply flex w-[100%] gap-[20px] flex-wrap;
        }
        &__peb-container {
            @apply flex flex-wrap gap-[24px];
        }
    }
</style>
