<template>
    <div class="contractorItems__items">
        <template v-for="(item, index) in cardData" :key="index">
            <CardWrapper class="contractorItems__items-card">
                <Title
                    type="h3"
                    :label="item.name"
                    class="contractorItems__subtitle"
                />
                <hr class="__hr" />
                <div class="contractorItems__item">
                    <div class="contractorItems__item-wrap">
                        <span>
                            <span class="contractorItems__item-label">
                                <Icon icon-name="CallIcon" />
                            </span>
                        </span>
                        <span class="contractorItems__item-content">
                            {{ item.telephone }}
                        </span>
                    </div>
                    <div class="contractorItems__item-wrap">
                        <span>
                            <span class="contractorItems__item-label">
                                <Icon icon-name="Globe" />
                            </span>
                        </span>
                        <span class="contractorItems__item-content">
                            {{ item.email }}
                        </span>
                    </div>
                </div>
                <hr class="__hr" />
                <Button
                    class="contractorItems__button"
                    @on-click="contacterExpert(item.id, item.email)"
                    :disabled="sendingMail"
                    ><LoadingButton
                        size="xs"
                        v-if="item.id == idExpertSelected && sendingMail"
                    />
                    Contacter
                </Button>
            </CardWrapper>
        </template>
    </div>
</template>

<script lang="ts" setup>
    import Button from '@/components/Common/Button/Button.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { ref } from 'vue';

    const props = defineProps({
        cardData: {
            type: Object,
            default: {},
        },
        idExpertSelected: {
            type: Number,
        },
        sendingMail: {
            type: Boolean,
            default: false,
        },
    });

    const emit = defineEmits<{
        (e: 'handleContact', v: object): void;
    }>();

    function contacterExpert(idSelected: number, mailSelected: string) {
        emit('handleContact', { id: idSelected, mail: mailSelected });
    }
</script>

<style lang="scss" scoped>
    .contractorItems {
        &__subtitle {
            @apply text-[14px] text-primary font-[600] leading-[17px];
        }
        &__items {
            @apply grid grid-cols-1 gap-[14px];
            @screen sm {
                @apply grid-cols-2;
            }
            @screen lg {
                @apply grid-cols-2;
            }
            @screen xl {
                @apply grid-cols-3;
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
            &-content {
                @apply break-all;
            }
        }
        &__button {
            &:deep() {
                button {
                    @apply w-full;
                }
            }
        }
    }
    .__hr {
        @apply text-gray w-full;
    }
</style>
