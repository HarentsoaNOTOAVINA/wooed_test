<template>
    <CardWrapper class="CardWrapperTitle place-content-14px">
        <Title
            :type="typeTitle"
            :label="label"
            class="CardWrapperTitle__title"
        />
        <hr class="__hr" />
        <div class="CardWrapperTitle__items place-content-18px">
            <slot />
        </div>
    </CardWrapper>
</template>

<script setup lang="ts">
    import Title from '@/components/Common/Title/Title.vue';
    import CardWrapper from '../CardWrapper/CardWrapper.vue';

    const props = defineProps({
        typeTitle: {
            type: String,
            defalut: 'h2',
        },
        label: {
            type: String,
            defalut: '',
        }
    });
</script>

<style lang="scss" scoped>
.CardWrapperTitle {
    box-shadow: 0 3px 10px 1px (rgba($color: #000000, $alpha: 0.05));
    &__title {
        @apply text-[14px] font-[600] text-primary;
    }
}
</style>
