<template>
        <CardWrapper class="radio-group__wrap-item">
            <Title type="h4" :label="label" class="radio-group__title" />
            <hr class="__hr" />
            <div class="radio-group__checkbox">
                <div 
                    v-for="(option, index) in options" 
                    :key="index"
                    class="radio-group__checkbox-content"
                >
                    <a-radio-group v-model:value="value" @change="handleChange">
                        <a-radio :value="option.id" class="w-full">
                            <span class="label__radio">{{ option.name }}</span>
                        </a-radio>
                    </a-radio-group>
                </div>
            </div>
        </CardWrapper>
</template>
<script setup lang="ts">
import ARadio from "ant-design-vue/lib/radio/Radio";
import ARadioGroup from "ant-design-vue/lib/radio/Group";
import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
import Title from '@/components/Common/Title/Title.vue';
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const emit = defineEmits(["select-option"]);

const props = defineProps({
    options: {
        type: Object,
        required: true,
    },
    label: {
        type: String,
        default: "",
    },
    nameInput: {
        type: String,
        required: true,
    }
});

const value = computed(() => {
    let data = store.getters["CollectiveGardenModule/getSelectedGarden"];
    if (data) return data.id;
});

function handleChange(option: any) {
    let data = props.options.find((element: any) => element.id === option.target.value);
    const radioValue: object = { [props.nameInput]: data, type: data.type };
    emit("select-option", radioValue);
}
</script>

<style lang="scss" scoped>
.ant-radio-wrapper {
    &:deep() {
        display: flex flex-row;

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
    @apply font-semibold;

    &__radio {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        transition: all 0.25s ease;
        @apply block text-primary mb-[8px];
    }
}

.container__radio {
    @apply flex flex-wrap justify-between;
}

.radio-group {
    &__title {
        @apply text-[14px] text-primary font-[600] leading-[17px];
    }

    &__items {
        @apply flex flex-col gap-[14px];
    }

    &__map {
        &--item {
            max-height: 179px;
            @apply h-[179px] w-full;

            @screen sm {
                max-height: 300px;
                @apply h-[300px];
            }

            @screen md {
                max-height: calc(100vh - 275px);
                @apply h-[325px];
            }
        }
    }
    &__checkbox {
        @apply flex flex-col gap-[10px];

        &-content {
            @apply flex flex-col;
        }

        &:deep() {
            .checkbox__container {
                // .ant-checkbox-wrapper {
                //     @apply items-start;
                // }

                span {
                    @apply text-black font-[400];
                }

                .label-name {
                    @apply font-[300];
                }
            }
        }
    }
}

.__hr {
    @apply text-gray w-full my-2.5;
}
</style>
