<template>
    <Space>
        <label v-if="props.label">{{ props.label }}</label>
        <range-picker
            v-model:value="value"
            :disabled-date="disabledDate"
            @change="onRangeChange"
        />
    </Space>
</template>

<script lang="ts" setup>
    import { RangePicker, Space } from 'ant-design-vue';
    import dayjs, { Dayjs } from 'dayjs';
    import moment from 'moment';
    import { ref } from 'vue';

    let value = ref();

    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        name: {
            type: String,
            required: true,
        },
    });

    // const disabledDate = (current: Dayjs) => {
    //     // Can not select days before today and today
    //     return current && current < dayjs().endOf('day');
    // };

    const disabledDate = (current: any) => {
        return current && current.valueOf() < Date.now();
    };

    const emit = defineEmits<{
        (e: 'handleChange', value: any): void;
    }>();

    const onRangeChange = (value: any) => {
        // let dateStart = moment(value[0].$d).format("L");
        // let dateEnd = moment(value[1].$d).format("L");
        // console.log('Formatted Selected Time: ', dateStart, dateEnd);

        emit('handleChange', value);
    };
</script>
