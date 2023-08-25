<script setup lang="ts">
    import {
        DefaultOptionType,
        SelectValue,
    } from 'ant-design-vue/lib/select';
    import { Select as ASelect } from "ant-design-vue";
    import { ref, watch } from 'vue';

    interface IProps {
        name: any;
        options: Array<object>;
        placeholder?: string;
        width?: '100%' | string;
        hasSubTitle?: boolean;
        subTitle?: string;
        mb?: string;
        mode: any;
        defaultValue?: string;
    }

    
    const props = withDefaults(defineProps<IProps>(), {
        placeholder: 'Selectionnez',
        hasSubTitle: true,
        width: '100%',
        subTitle: 'Titre',
        mode: '',
    });

    const defaultValue = ref<any>(props.defaultValue)
    
    watch(
    () => props.defaultValue,
    (value) => {
        defaultValue.value = value
    },
    { immediate: true, deep: true }
    );
    


    const emit = defineEmits<{
        (event: 'change-select', value: any, option: any): void;
        (event: 'handle-change', value: any): void;
    }>();

    const handleChange = (value: SelectValue, option: DefaultOptionType) => {
        emit('change-select', value, option);

        console.log(`selected ${value}`);
        console.log('option', option);
        console.log('select value', value);
    };
</script>

<template>
    <div class="select-autocomplete">
        <label v-if="hasSubTitle" class="label-select">{{ subTitle }}</label>
        <a-select
            show-search
            :placeholder="placeholder"
            :options="options"
            @change="handleChange"
            v-model:value="defaultValue"
            :mode="mode"

        >
    </a-select>
            <!-- :defaultValue="defaultValue" -->
    </div>
</template>

<style scoped lang="scss">
    .select-autocomplete {
        margin-bottom: v-bind(mb);
        &:deep() {
            .ant-select-single:not(.ant-select-customize-input)
                .ant-select-selector {
                @apply w-full h-[38px] py-0 px-[11px] flex items-center rounded;
            }
            .ant-select-selector:hover {
                box-shadow: unset;
                border: 1px solid var(--color-primary);
            }
            .ant-select-show-arrow {
                width: v-bind(width);
            }
        }
    }

    .label-select {
        @apply ml-2.5 mr-[5px] text-sm font-medium;
        color: var(--color-gray-icon);
    }
</style>
