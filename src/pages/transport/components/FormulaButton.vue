<template>
    <div 
        class="formula-button__container" 
        :class="isActive ? 'activated-style' : ''" 
        @click="handleClick"
    >
        <div class="formula-button__icon">
            <Icon 
                class="mx-auto" 
                :icon-name="iconName"
                :color="isActive ? '#fff' : 'var(--color-primary)'"
            />
        </div>
        <div class="formula-button__main-content">
            <div class="formula-button__header" :class="isActive ? 'activated-text' : 'text'">
                <div class="formula-button__title">
                    {{ label }}
                </div>
                <div class="formula-button__price">
                    <span class="formula-button__price-value">
                        {{ price }} €
                    </span>
                    <ArrowNext :color="isActive ? '#fff' : 'var(--color-primary)'" />
                </div>
            </div>
            <div class="formula-button__descriptions">
                <div v-for="(item, index) in props.descriptions" :key="index" class="formula-button__list-group">
                    <span class="formula-button__subtitle">{{ item.subtitle }}</span>
                    <ul class="formula-button__list">
                        <li v-for="(detail, idx) in item.details" :key="idx">
                            {{ detail }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import ArrowNext from '@/components/Icon/ArrowNext.vue';
import Icon from '@/components/Common/Icon/Icon.vue';

import { PropType } from 'vue';

interface IDescriptionItemChild {
    subtitle: string;
    details: Array<string>
}


const props = defineProps({
    label: {
        type: String,
        default: ''
    },
    price: {
        type: [String, Number],
        default: ''
    },
    iconName: {
        type: String,
        default: 'PiggyBank'
    },
    descriptions: {
        type: Array as PropType<Array<IDescriptionItemChild>>,
        default: []
    },
    isActive: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(["click"])

function handleClick() {    
    emit('click', { budget: props.price })
}

</script>
<style lang="scss" scoped>
.formula-button {
    &__container {
        @apply w-full flex border rounded-lg p-3 flex items-center my-4 cursor-pointer duration-300;
        border-color: var(--color-stroke-gray);
    }

    &__icon {
        @apply hidden;

        @screen md {
            @apply flex mx-auto w-1/12 -ml-1.5;
        }
    }

    &__main-content {
        @screen md {
            @apply w-11/12;
        }
    }

    &__header {
        @apply font-semibold flex flex-row justify-between;

        .text {
            color: var(--color-primary);
        }

        .activated-text {
            color: #fff;
        }
        
    }

    &__title {
        @apply w-2/3 pb-2 text-[16px];
    }

    &__price {
        @apply w-1/3 flex text-end items-center justify-end gap-x-2;
    }

    &__subtitle {
        @apply font-semibold;
    }

    &__list-group {
        @apply pb-2;
    }

    &__list {
        @apply list-disc;

        li {
            @apply ml-6
        }
    }
}

.activated-style {
    background-color: var(--color-primary);
    color: #fff;
}
</style>