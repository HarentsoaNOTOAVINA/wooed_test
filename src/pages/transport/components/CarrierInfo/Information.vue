<template>
    <CardWrapper class="info__container">
        <div class="info__items">
            <div
                v-for="(item, index) in dataInfo"
                :key="index"
                class="info__items-wrap"
            >
                <Icon :icon-name="item.labelIcon" />
                <div class="info__wrap">
                    <div class="info__label">
                        <span>{{ item.labelTitle }}</span>
                    </div>
                    <div class="info__content">
                        <span> {{ item.labelContent }} </span>
                    </div>
                </div>
            </div>
        </div>
    </CardWrapper>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';

    interface IData {
        labelIcon?: string;
        labelTitle?: string;
        labelContent?: string;
    }
    const dataInfo: IData[] = [
        {
            labelIcon: 'InfoPhone',
            labelTitle: 'Numéro téléphone verifié',
            labelContent: '+261349429676',
        },
        {
            labelIcon: 'InfoMail',
            labelTitle: 'Adresse email verifié',
            labelContent: 'repeat.yves@yahoo.fr',
        },
        {
            labelIcon: 'InfoCalendar',
            labelTitle: 'Carte d’identité verifié',
            labelContent: '2 janvier 1996',
        },
        {
            labelIcon: 'InfoGender',
            labelTitle: 'Genre',
            labelContent: 'Français',
        },
    ];
</script>

<style lang="scss" scoped>
    .info {
        &__container {
            @apply flex flex-col gap-[14px];
        }
        &__items {
            @apply flex flex-col gap-[14px];
        }
        &__items-wrap {
            @apply flex gap-[10px];
        }
        &__wrap {
            @screen sm {
                @apply flex w-full;
            }
        }
        &__label {
            @apply flex items-center font-[600] text-strokeGray gap-[8px];
            @screen sm {
                @apply max-w-[200px] w-full;
            }
            @screen lg {
                @apply max-w-[267px] w-full;
            }
            .icon {
                &:deep() {
                    svg {
                        @apply w-[18px] h-[18px];
                    }
                }
            }
        }
        &__content {
            @apply font-[600];
            span {
                word-wrap: anywhere;
            }
        }
    }
</style>
