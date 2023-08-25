<template>
    <CardWrapper class="info__container">
        <div class="info__title">
            <Title
                type="h2"
                weight="600"
                label="Informations personnels"
                class="info__title-content"
            />
            <Icon icon-name="EditCircle" class="info__edit" />
        </div>
        <div class="info__items">
            <div
                v-for="(item, index) in dataInfo"
                :key="index"
                class="info__items-wrap"
            >
                <div class="info__label">
                    <Icon :icon-name="item.labelIcon" />
                    <span>{{ item.labelTitle }}</span>
                </div>
                <div class="info__content">
                    <span> {{ item.labelContent }} </span>
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
            labelTitle: 'Numéro téléphone',
            labelContent: '+261349429676',
        },
        {
            labelIcon: 'InfoMail',
            labelTitle: 'Adresse email',
            labelContent: 'repeat.yves@yahoo.fr',
        },
        {
            labelIcon: 'InfoCalendar',
            labelTitle: 'Date de naissance',
            labelContent: '2 janvier 1996',
        },
        {
            labelIcon: 'InfoMarker',
            labelTitle: 'Nationalite',
            labelContent: 'Français',
        },
        {
            labelIcon: 'InfoGender',
            labelTitle: 'Genre',
            labelContent: 'Male',
        },
    ];
</script>

<style lang="scss" scoped>
    .info {
        &__container {
            @apply flex flex-col gap-[14px];
        }
        &__title {
            @apply flex justify-between items-center gap-[14px];
        }
        &__title-content {
            @apply text-[14px];
        }
        &__edit {
            @apply cursor-pointer;
        }
        &__items {
            @apply flex flex-col gap-[14px];
        }
        &__items-wrap {
            @apply flex gap-[10px];
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
            span {
                @apply hidden;
                @screen sm {
                    @apply block;
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
