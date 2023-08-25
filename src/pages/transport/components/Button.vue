<template>
    <div class="button__container" @click="redirectTo">
        <div class="button__content">
            <Icon :icon-name="icon" />
            <span class="button__label">
                {{ label }}
            </span>
        </div>
    </div>
</template>
<script setup lang="ts">
import Icon from '@/components/Common/Icon/Icon.vue';

const emit = defineEmits(['click'])
const props = defineProps({
    label: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        default: 'YenCare'
    }
})

function redirectTo(){
    emit('click');
}
</script>
<style lang="scss" scoped>
.button {
    &__container {
        @apply w-full flex rounded-lg my-[10px] h-[115px] items-center justify-center;
        background-color: #fff;
        @screen md {
            @apply duration-300 cursor-pointer h-[154px] border;
            border-color: var(--color-stroke-gray);
            &:hover {
                color: var(--color-primary);
            }
        }
    }

    &__content {
        @apply flex flex-wrap text-center justify-center;
    }


    &__label {
        @apply block w-full font-semibold mt-2;
    }
}
</style>