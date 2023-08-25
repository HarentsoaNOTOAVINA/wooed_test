<template>
    <CardWrapper class="otherUser">
        <div class="otherUser__items">
            <avatar src="https://joeschmoe.io/api/v1/random" shape="square" :size="40" />
            <div class="otherUser__items-wrap">
                <div class="otherUser__items-content">
                    <span class="otherUser__items-title"
                        >Pierre Ratokodimimanana</span
                    >
                </div>
                <div class="flex gap-[4px]">
                    <Icon icon-name="StartRounded" />
                    <span class="text-grayIcon mt-[2px]">4.5</span>
                </div>
            </div>
        </div>
        <Title
            type="h3"
            weight="600"
            label="Table basse"
            class="otherUser__title"
        />
        <Paragraphe>Parfait plus je recommande</Paragraphe>
        <span class="otherUser__date">04/10/2022 à 07h26</span>
    </CardWrapper>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import avatar from 'ant-design-vue/lib/avatar';

    const props = defineProps({
        data: {
            type: Object,
            default: {}
        }
    })
</script>

<style lang="scss" scoped>
    .otherUser {
        @apply flex flex-col gap-[4px];
        &__items {
            @apply relative flex gap-x-[14px];
            @screen lg {
                @apply pr-[34px];
            }
        }
        &__items-wrap {
            width: calc(100% - 50px);
        }
        &__items-title {
            font-weight: 600;
            font-size: 16px;
            line-height: 20px;
        }
        &__items-content {
            @apply flex flex-col gap-[14px];
            @screen sm {
                @apply flex-row;
            }
        }
        &__title {
            @apply text-primary text-[14px];
        }
        &__date {
            @apply text-[12px] text-strokeGray mt-[6px];
        }
    }
</style>
