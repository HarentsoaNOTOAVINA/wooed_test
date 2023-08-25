<template>
    <div class="shortcut__container" @click="emitPayload">
        <div class="shortcut__main-content">
            <Icon :icon-name="data.iconName" class="shortcut__icon" />
            <span class="shortcut__title">{{ data.label }}</span>
        </div>
        <ArrowNext />
    </div>
</template>
<script lang="ts" setup>
import ArrowNext from '@/components/Icon/ArrowNext.vue';
import Icon from '@/components/Common/Icon/Icon.vue';
const emit = defineEmits(['click'])
const props = defineProps({
    data: {
        type: Object,
        required: true
    }
})

function emitPayload() {
    let payload : any;
    props.data.routeName ? payload = props.data.routeName : payload = props.data.payload;
    emit('click', payload);
}
</script>
<style lang="scss" scoped>
.shortcut {
    &__container {
        @apply flex items-center justify-between w-full py-3 px-5 rounded-lg border my-2;
        border-color: var(--color-stroke-gray);
        @screen md {
            &:hover {
                @apply cursor-pointer;
                color: var(--color-primary);
            }
        }
    }

    &__main-content {
        @apply flex items-center duration-300;


    }

    &__title {
        @apply truncate block;
    }

    &__icon {
        @apply h-5 w-5 mr-4;
    }

}
</style>
