<template>
    <a-radio-group :value="value" @change="handleOptionChange" class="label-container">
        <a-radio v-for="(option, index) in options" :key="index" :value="option.id" style="width:100%">
            <span class="label-container__content">
                <span class="label-container__content-label">
                    <span class="radio__title">{{ option.name }}</span>
                    <hr class="__hr" />
                    <span class="company__info">
                        <Icon :icon-name="'CallIcon'" :color="option.id === value ? '#fff' : 'var(--color-primary)'" />
                        <span class="radio__label">{{ option.telephone }}</span>
                    </span>
                    <span class="company__info">
                        <Icon icon-name="EmailOutline" :color="option.id === value ? '#fff' : 'var(--color-primary)'" />
                        <span class="radio__description block">{{ option.email }}</span>
                    </span>
                </span>
            </span>
        </a-radio>
    </a-radio-group>
</template>

<script setup lang="ts">
import ARadio from "ant-design-vue/lib/radio/Radio";
import ARadioGroup from "ant-design-vue/lib/radio/Group";
import Icon from "@/components/Common/Icon/Icon.vue";
import { ref, watch, onMounted, PropType } from "vue";

const value = ref<number>();

const emit = defineEmits(["select-option"]);

interface ICompany {
    id: number,
    name: string,
    telephone: string,
    email: string
}

const props = defineProps({
    options: {
        type: Array as PropType<ICompany[]>,
        required: true,
    },
    nameInput: {
        type: String,
        required: true,
    },
});

const data = ref<ICompany[]>([]);

watch(() => value.value,
    (newValue) => {
        value.value = newValue;
    },
    { immediate: true }
);

function handleOptionChange(option: any) {
    value.value = option.target.value;
    const radioValue: object = { [props.nameInput]: option.target.value };
    emit("select-option", radioValue);
}
</script>

<style lang="scss" scoped>
.label {

    &__radio,
    &__subRadio {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        transition: all 0.25s ease;
        @apply block text-primary mb-[8px];
    }
}

.label-container {
    @apply grid gap-4 grid-cols-1;

    &:deep() {
        span.ant-radio+* {
            padding-right: 8px;
            padding-left: 8px;
            width: 100%;

        }
    }

    @screen lg {
        @apply grid gap-4 grid-cols-2;
    }

    &__content {
        width: 100%;
        @apply flex gap-4;

        @screen md {
            @apply flex items-center gap-x-4;
        }

        &-icon {
            @apply hidden;

            @screen md {
                @apply block;
            }
        }
    }

    &__content-label {
        width: 100%;
    }

    &:deep() {
        .ant-radio {
            @apply hidden;
        }
    }

    .ant-radio-wrapper {
        @apply w-full border my-2 rounded;
        transition: all 0.25s ease;
        padding: 10px;
        border-color: var(--color-stroke-gray);

        .radio__title {
            @apply text-center block font-semibold;
            color: var(--color-warn);
        }

        .radio__label {
            transition: all 0.25s ease;
            @apply block font-medium block;
        }

        .radio__description {
            @apply block truncate;
        }

        &.ant-radio-wrapper-checked {
            @apply rounded;
            transition: all 0.25s ease;
            background-color: var(--color-primary);
            border-color: var(--color-primary);
            color: #fff;
            padding: 10px;

            .radio__label,
            .radio__title {
                transition: all 0.25s ease;
                color: #fff;
            }

        }
    }

    .ant-radio-group {
        @apply w-full;
    }
}

.company__info {
    @apply w-full block flex gap-x-4 items-end;
}

.__hr {
    @apply text-gray w-full my-2.5;
}
</style>
