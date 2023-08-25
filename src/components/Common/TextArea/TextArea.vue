<script lang="ts" setup>
    import Textarea from 'ant-design-vue/lib/input/TextArea';
    import { ref, watch, onMounted } from 'vue';

    const value = ref<any>();
    const emit = defineEmits(['onChange', 'handleChange', 'submit']);

    onMounted(() => { if (props.defaultValue !== undefined) value.value = props.defaultValue })

    watch(
        () => value.value,
        (first) => {
            emit('onChange', first);
            emit('handleChange', { [props.nameInput]: first });
        }
    );
    watch(
        () => props.defaultValue,
        (v) => {
            console.log(v, "default value");
            value.value = v;
        },
        { immediate: true }
    );

    const props = defineProps({
        label: {
            type: String,
        },
        nameInput: {
            type: String,
            required: true,
        },
        maxLength: {
            type: Number,
            default: 250
        },
        showCount: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false,
        },
        placeholder: {
            type: String,
            default: '',
        },
        rows: {
            type: Number,
        },
        disabledNewLine: {
            type: Boolean,
            default: false,
        },
        defaultValue: {
            type: String,
            default: undefined
        },
        autoSize: {
            type: Object,
            default: null
        }
    });

    const handleEnter = function (e: any) {
        if (props.disabledNewLine) {
            e.preventDefault();
            emit('submit');
            e.target.value = ''
        } 
    };
</script>

<template>
    <div class="textarea">
        <label v-if="props.label" class="textarea__label">
            <span v-if="props.required" class="textarea__required">*</span>
            {{ props.label }}
        </label>
        <Textarea
            :rows="props.rows"
            :placeholder="props.placeholder"
            :name="props.nameInput"
            :maxlength="props.maxLength"
            :show-count="props.showCount"
            v-model:value="value"
            :required="required"
            @keydown.enter="handleEnter"
            :autoSize="autoSize"
        />
    </div>
</template>

<style lang="scss" scoped>
    .textarea {
        @apply flex flex-col gap-[10px];

        &:deep() {
            .textarea:hover {
                border: solid var(--color-primary) 1px;
                box-shadow: none;
            }
            .ant-input:hover {
                border: solid var(--color-primary) 1px;
                box-shadow: none;
            }
            .ant-input:focus {
                border: solid var(--color-primary) 1px;
                box-shadow: none;
            }
        }

        &__required {
            color: red;
            margin-right: 5px;
        }

        &__label {
            font-size: 14px;
            font-weight: 600;
            color: var(--color-gray-icon);
            display: block;
        }
    }
</style>
