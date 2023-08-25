<template>
    <div class="checkbox__container">
        <!-- <a-checkbox @click="handleClick" :checked="isChecked"> -->
        <a-checkbox @change="handleClick">
            <span v-if="props.label"> {{ props.label }} </span>
            <slot />
        </a-checkbox>
    </div>
</template>

<script setup>
    import { Checkbox as ACheckbox } from 'ant-design-vue';
    import { ref } from 'vue';

    let checked = ref < Boolean > false;

    const emit = defineEmits(['click', 'handleCheck','clickWithValue']);

    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        returnBoolean: {
            type: Boolean,
            default: false,
        },
        isChecked: {
            type: Boolean,
        },
        name: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
    });

    function handleClick() {
        let payload;
        checked = !checked;
        props.returnBoolean
            ? (payload = checked)
            : checked
                ? (payload = props.label)
                : (payload = '');
        emit('click', payload);

        emit('handleCheck', { [props.name]: checked });
        
        if(props.returnBoolean){
            emit('clickWithValue', { [props.name]: checked });
        }else{
            emit('clickWithValue', {[props.name]: props.value})
        }
    }
</script>

<style lang="scss" scoped>

.checkbox__container {
    @apply block max-w-max;
    &:deep() {
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
