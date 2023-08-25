<script setup lang="ts">
import ARadio from 'ant-design-vue/lib/radio/Radio';
import ARadioGroup from 'ant-design-vue/lib/radio/Group';
import Transition from '@/components/Common/Transition/Transition.vue';
import UploadImage from '@/components/Display/UploadImage/UploadImage.vue';
import { ref, watch } from 'vue';

const payload = ref<{
    value: string,
    annexeLabel: string
}>({
    value: '',
    annexeLabel: ''
});

const value = ref<number>(0);
const subValue = ref<number>(0);

const emit = defineEmits(["select-option", "upload-annexe"])

const props = defineProps({
    options: {
        type: Object,
        required: true
    }
})

watch(
    () => value.value, (newValue) => {
        value.value = newValue;
        subValue.value = 0
    },
    { immediate: true, deep: true }
)

function handleOptionChange(option: any) {
    value.value = option.target.value
    props.options.forEach((element: any) => {
        if (element.value === option.target.value) {
            payload.value.value = element.label
            payload.value.annexeLabel = element.annexeTitle
        }
    })
}

function handleSubOptionChange(option: any) {
    subValue.value = option.target.value
    props.options.forEach((element: any) => {
        if (element.value === value.value && element.subOptions) {
            let subOptions = element.subOptions
            subOptions.forEach((e: any) => {
                if (e.value === option.target.value) {
                    payload.value.value = payload.value.value + ' ' + e.label
                }
            })
        }
    })
}

function handleFileUpload(file: any) {
    emit('upload-annexe', { label: payload.value.annexeLabel, file: file })
}

</script>

<template>
    <div>
        <a-radio-group :value="value" @change="handleOptionChange">
            <a-radio v-for="(option, index) in options" :key="index" :value="option.value">
                <span class="label__radio">{{ option.label }}</span>
                <Transition>
                    <span v-if="option.subOptions && value === option.value" class="subRadio__container">
                        <a-radio-group :value="subValue" @change="handleSubOptionChange">
                            <a-radio v-for="(subOption, idx) in option.subOptions" :key="idx" :value="subOption.value">
                                <span class="label__subRadio">
                                    {{ subOption.label }}
                                </span>
                            </a-radio>
                        </a-radio-group>
                    </span>
                </Transition>
                <div v-show="payload.annexeLabel && option.value === value" class="upload__container">
                    <label>
                        <span> {{ payload.annexeLabel }} </span>
                    </label>
                    <UploadImage :needBase64="false" @upload-single="handleFileUpload" />
                </div>
            </a-radio>
        </a-radio-group>
    </div>
</template>

<style lang="scss" scoped>
.ant-radio-wrapper {
    &:deep() {
        display: flex;

        &>span:nth-child(2) {
            @apply block w-full;
        }
    }
}

span.app-radio-value {
    &:deep() {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        @apply flex text-primary mb-[8px];

        &>span {
            @apply block mt-0 pb-[1.5px];
        }
    }
}

// .ant-radio-wrapper:hover .ant-radio, .ant-radio:hover .ant-radio-inner, .ant-radio-input:focus + .ant-radio-inner
:deep(.ant-radio-inner, .ant-radio-checked) {
    border: 1px double var(--color-primary);

    &:hover {
        border-color: var(--color-primary);
    }

    &::after {
        background-color: var(--color-primary);
    }
}

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

.subRadio__container {
    @apply block flex items-center mb-[4px];

    &:deep() {
        .ant-radio {
            @apply hidden;
        }
    }

    .ant-radio-wrapper {
        transition: all 0.25s ease;

        &.ant-radio-wrapper-checked {
            transition: all 0.25s ease;
            @apply bg-strokeGray;

            .label__subRadio {
                transition: all 0.25s ease;
                @apply font-medium;
            }
        }

        &:deep() {
            &>span:nth-child(2) {
                @apply px-0;
            }
        }
    }

    .ant-radio-group {
        @apply w-full;
    }

    .ant-radio-wrapper {
        @apply bg-gray max-w-full mb-[8px] px-[22px] py-[4px];
    }
}

.upload__container {
    label {
        font-weight: 600;
        font-size: 14px;
        line-height: 17px;
        @apply text-black mb-[10px] flex items-center gap-x-[12px];
    }
}

.annexe {
    font-weight: 300;
    @apply text-primary;
}

.__hr {
    @apply text-gray my-[10px];
}
</style>
