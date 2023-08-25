<template>
    <CardWrapper class="cardDecision">
        <div class="cardDecision__head">
            <Title type="h3" :label="data.description" class="cardDecision__head-title" />
            <Alert v-if="data.isRealized" :is-icon="false">
                Réaliser
            </Alert>
            <Alert v-else type="warning" :is-icon="false">
                Non réaliser
            </Alert>
        </div>
        <div class="cardDecision__item">
            <div class="cardDecision__content">
                <Icon icon-name="DateTime" />
                <span>{{ data.realizationDate }}</span>
            </div>
            <div class="cardDecision__content">
                <Icon icon-name="SmallComment" />
                <span>
                    {{ data.comment }}
                </span>
            </div>
        </div>
    </CardWrapper>
</template>

<script setup lang="ts">
import Icon from '@/components/Common/Icon/Icon.vue';
import Title from '@/components/Common/Title/Title.vue';
import Alert from '@/components/Display/Alert/Alert.vue';
import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';

const props = defineProps({
    data: {
        type: Object,
        default: {},
    },
});
</script>

<style lang="scss" scoped>
.cardDecision {
    @apply flex flex-col gap-[12px] p-[8px] rounded-[4px];

    &__head {
        @apply flex justify-between gap-[10px];

        &-title {
            @apply text-[14px] font-[600] text-primary;
        }
    }

    &__item {
        @apply flex flex-col gap-[4px];
    }

    &__content {
        @apply flex items-center gap-[8px] text-[12px] text-grayBlack;
    }

    &:deep() {
        .alert {
            @apply rounded-[4px] px-[8px] py-[2px] w-max;

            &__content {
                @apply font-[600] text-[12px];
            }
        }
    }
}
</style>
