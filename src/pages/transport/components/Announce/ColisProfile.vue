<template>
    <CardWrapper class="location">
        <div class="message__card-head">
            <Avatar src="'https://joeschmoe.io/api/v1/random'" :size="40" />
            <div class="message__card-title">
                <Paragraphe font-size="12px" class="message__card-subtitle">
                    Expéditeur particulier
                </Paragraphe>
                <Paragraphe type="bold" font-size="14px"> {{ data.userName }} {{ data.userFirstName }}</Paragraphe>
            </div>
        </div>
    </CardWrapper>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import { Avatar } from 'ant-design-vue';

    const props = defineProps({
        data : {
            type: Object,
            default: {}
        }
    });
</script>

<style lang="scss" scoped>
    .location {
        @apply flex flex-col gap-[14px];
    }
    .message {
        &__card-head {
            @apply flex gap-[12px];
        }
        &__card-wrap-head {
            @apply flex justify-between;
        }
        &__card-subtitle {
            color: var(--color-gray-icon);
        }
    }
</style>
