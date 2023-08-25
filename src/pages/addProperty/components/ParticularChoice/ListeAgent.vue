<template>
    <AcheckboxGroup
        v-model:value="valueCheck"
        name="checkboxgroup"
        @change="handleCheck"
        class="wrap-list"
    >
        <ACheckbox v-for="d in dataAgent" :value="d.id" :key="d.id">
            <CardAgent :item="d" />
        </ACheckbox>
    </AcheckboxGroup>
</template>

<script setup lang="ts">
    import CardAgent from './CardAgent.vue';

    import { ref, watch } from 'vue';
    import {
        CheckboxGroup as AcheckboxGroup,
        Checkbox as ACheckbox,
    } from 'ant-design-vue';

    const props = defineProps({
        data: {
            type: Array,
        },
    });

    const dataAgent = ref<any>(props.data);
    const valueCheck = ref<any>([]);

    watch(
        () => props.data,
        (value) => {
            dataAgent.value = value;
        }
    );

    const emit = defineEmits<{
        (event: 'change', value: any): void;
    }>();

    function handleCheck(value: any) {
        emit('change', valueCheck.value)
    }
</script>

<style lang="scss" scoped>
    .wrap-list {
        @apply md:grid md:grid-cols-3 xl:grid-cols-4 gap-[15px] mb-[15px];
        &:deep() {
            .ant-checkbox {
                position: absolute;
                top: 15px;
                right: 15px;
            }
            .ant-checkbox-wrapper {
                position: relative;
                margin: 0;
                & > span:last-child {
                    padding: 0;
                    width: 100%;
                }
            }
            .ant-checkbox {
                &-wrapper {
                    font-size: 14px;
                    font-weight: 600;
                    line-height: 15px;
                    @apply flex text-primary;
                    & > span {
                        @apply block mt-0 pb-[1.5px];
                    }
                }
                & {
                    @apply mt-2;
                }
                &-inner {
                    @apply w-[13.5px] h-[13.5px] border-primary border-[1.5px] border-solid rounded-[3px];
                }
                &-checked {
                    .ant-checkbox-inner {
                        @apply bg-white border-primary;
                        &::after {
                            @apply left-[20%] w-[5px] h-[7px] border-primary;
                        }
                    }
                    &::after {
                        @apply border-none;
                    }
                }
            }

            .ant-checkbox-wrapper:hover .ant-checkbox-inner,
            .ant-checkbox-wrapper:hover .ant-checkbox,
            .ant-checkbox:hover .ant-checkbox-inner,
            .ant-checkbox-input:focus + .ant-checkbox-inner {
                @apply border-primary;
            }
        }
    }
</style>
