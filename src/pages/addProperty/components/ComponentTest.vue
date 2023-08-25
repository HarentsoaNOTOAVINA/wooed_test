<template>
    <AddContainer
        :titleLabel="content"
        @onPrev="prev"
        @onNext="next"
        @onFinished="finished"
        :controlButton="controlButton"
    >
        {{ data }}
    </AddContainer>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import AddContainer from '@/pages/addProperty/components/AddContainer.vue';

    const props = defineProps({
        titleLabel: {
            type: String,
            default: '',
        },
        controlButton: {
            type: Object,
        },
        data: {
            type: Array as any,
        },
    });

    const content = ref<string>(props.titleLabel);
    const data = ref<any>(props.data);

    const emit = defineEmits<{
        (event: 'onClickPrev'): void;
        (event: 'onClickNext'): void;
        (event: 'onClickFinished'): void;
    }>();

    function prev() {
        emit('onClickPrev');
    }

    function next() {
        emit('onClickNext');
    }

    function finished() {
        emit('onClickFinished');
    }
</script>

<style lang="scss" scoped></style>
