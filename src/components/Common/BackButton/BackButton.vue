<template>
    <button @click="returnEmit" class="backBtn">
        <ArrowBack />
        <span class="backBtn__txt" data-test="returnTxt">{{text}}</span>
    </button>
</template>

<script lang="ts" setup>
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    const props = defineProps({
        text: {
            type: String,
        },
    });
    const emit = defineEmits<{
        (e: 'return'): void;
    }>();

    function returnEmit(): void {
        console.log('first');
        emit('return');
    }
</script>

<style lang="scss" scoped>
    .backBtn {
        @apply flex flex-row items-center;

        &__txt {
            @apply ml-[8px] font-semibold;
        }
    }
</style>
