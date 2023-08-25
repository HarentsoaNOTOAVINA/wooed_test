<template>
    <div class="actor__items">
        <template v-for="(item, index) in cardData" :key="index">
            <CardWrapper class="actor__items-card">
                <Title type="h3" :label="!item.function.length ? 'Participant' : item.function" class="actor__subtitle" />
                <hr class="__hr" />
                <div class="actor__item">
                    <div class="actor__item-wrap">
                        <span>
                            <span class="actor__item-label">
                                <Icon icon-name="UserLine" />
                                <span>Nom : </span>
                            </span>
                        </span>
                        <span class="actor__item-content">
                            {{ item.name }}
                        </span>
                    </div>
                    <div class="actor__item-wrap">
                        <span>
                            <span class="actor__item-label">
                                <Icon icon-name="EmailOutline" />
                                <span>Email : </span>
                            </span>
                        </span>
                        <span class="actor__item-content">
                            {{ item.email }}
                        </span>
                    </div>
                    <div class="actor__item-wrap">
                        <span>
                            <span class="actor__item-label">
                                <Icon icon-name="Phone" />
                                <span>Téléphone : </span>
                            </span>
                        </span>
                        <span class="actor__item-content">
                            {{ item.telephone }}
                        </span>
                    </div>
                </div>
            </CardWrapper>
        </template>
    </div>
</template>

<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';

    const props = defineProps({
        cardData: {
            type: Object,
            default: {},
        },
    });
</script>

<style lang="scss" scoped>
    .actor {
        &__subtitle {
            @apply text-[14px] text-warn font-[600] leading-[17px];
        }
        &__items {
            @apply grid grid-cols-1 gap-[14px];
            @screen sm {
                @apply grid-cols-2;
            }
            @screen md {
                @apply grid-cols-1;
            }
            @screen lg {
                @apply grid-cols-2;
            }
            &-card {
                @apply flex flex-col gap-[14px];
            }
        }
        &__item {
            @apply flex flex-col gap-[14px];
            &-wrap {
                @apply flex gap-[14px];
            }
            &-label {
                @apply text-strokeGray flex items-center gap-[5px];
                span {
                    @apply whitespace-nowrap min-w-[60px];
                    @media (max-width: 400px) {
                        @apply hidden;
                    }
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
