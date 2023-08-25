<script lang="ts" setup>
    import { DatePicker, Space } from 'ant-design-vue';
    import { onMounted, PropType, ref, watch } from 'vue';
    import dayjs, { Dayjs } from 'dayjs';
    import moment from 'moment';

    const emit = defineEmits([
        'handleChange',
        'handleDate',
        'handleDateFormat',
        'handleDateFormatFr',
        'handleDateFormatEn',
        'handleDateEng',
        'handleYear'
    ]);

    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            required: false,
        },
        placeholder: {
            type: String,
        },
        picker: {
            type: String,
            default: ''
        },
        max: {
            type: Boolean,
            default: false,
        },
        min: {
            type: Boolean,
            default: false,
        },
        required: {
            type: Boolean,
            default: false
        },
        format: {
            type: String,
            default: 'DD-MM-YYYY'
        },
        value : {
            type: [String, Number], 
            
        },
        disable: {
            type: Boolean,
            default: false
        },
        disabledDate : {
            type : Boolean,
            default : true 
        }
    });

    const date = ref<Dayjs>();

    function changeDate(date: any, name: any) {
        emit('handleChange', date?.$d);
        emit('handleDate', { [name]: date?.$d });
        emit('handleDateFormat', {
            [name]: `${date?.$y + '-' + (date?.$M + 1) + '-' + date?.$D}`,
        });
        emit('handleDateFormatFr', {
            [name]: `${date?.$D + '/' + (date?.$M + 1) + '/' + date?.$y}`,
        });
        emit('handleDateFormatEn', {
            [name]: `${date?.$D + '-' + (date?.$M + 1) + '-' + date?.$y}`,
        });
        emit('handleDateEng', {
            [name] : `${date?.$y + '-' + (date?.$M + 1) + '-' + date?.$D}`
        });
        emit('handleYear', { [name]: date?.$y })
    }

    function limitMax(current: any) {
        return current && current.valueOf() > Date.now();
    }

    function limitMin(current: any) {
        return current && current.valueOf() <= Date.now();
    }

    watch(()=> props.value,
            (v)=>{
                if (v) {
                    
                    date.value = dayjs(v, props.format);
                }
            },
            {immediate : true, deep : true}
        )
</script>

<template>
    <Space class="date__space">
        <label for="" class="date__label"><span v-if="required" class="date__space--required">*</span>{{ props.label }}</label>
        <DatePicker
            v-if="props.max"
            :disabled="disable ? true : false"
            :format="format"
            class="date__item"
            :placeholder="placeholder"
            v-model:value="date"
            @change="changeDate($event, props.name)"
            :name="props.name"
            :disabled-date="props.max ? limitMax : undefined"
            inputReadOnly
            :picker="(picker as any)"
        />
        <DatePicker
            v-else-if="props.min"
            :disabled="disable ? true : false"
            :format="format"
            class="date__item"
            :placeholder="placeholder"
            v-model:value="date"
            @change="changeDate($event, props.name)"
            :name="props.name"
            :disabled-date="props.min ? limitMin : undefined"
            inputReadOnly
            :picker="(picker as any)"
        />

        <DatePicker
            v-else
            :format="format"
            :disabled="disable ? true : false"
            class="date__item"
            :placeholder="placeholder"
            v-model:value="date"
            @change="changeDate($event, props.name)"
            :name="props.name"
            inputReadOnly
            :picker="(picker as any)"
        />
    </Space>
</template>

<style lang="scss" scoped>
    .ant-picker-focused {
        // border-color: var(--color-primary);
        border: solid var(--color-primary) 1px;
        box-shadow: none;
    }

    .ant-picker {
        height: 38px;
        cursor: pointer;
        border-radius: 4px;
    }
    .ant-picker:hover {
        border-color: var(--color-primary);
    }
    .ant-space-align-center {
        align-items: initial;
    }
    // .ant-picker:hover, .ant-picker-focused{
    //       border-color : "red"
    // }
    .date {
        &__space {
            @apply w-[100%] flex flex-col flex-1;
            &--required {
                @apply text-red mr-[5px];
            }
        }
        &__item {
            @apply flex flex-1;
        }
        &__label {
            font-size: 14px;
            font-weight: 500;
            color: var(--color-gray-icon);
            display: block;
        }
    }

    .property-tax__container {
        .date__label {
            @apply font-semibold text-black;
        }
    }
</style>
