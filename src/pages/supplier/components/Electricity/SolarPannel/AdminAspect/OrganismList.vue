<template>
    <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="data"
    >
        <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'organism'">
                <a>{{ text }}</a>
            </template>
        </template>
    </a-table>
</template>
<script lang="ts" setup>
    import type { TableProps, TableColumnType } from 'ant-design-vue';
    import { Table as ATable } from 'ant-design-vue';

    const columns = [
        {
            title: 'ORGANISME',
            dataIndex: 'name',
        },
        {
            title: 'DOMAINES D’ACTIVITÉ',
            dataIndex: 'activityField',
        },
        {
            title: 'SIÈGE',
            dataIndex: 'seat',
        },
        {
            title: 'ADRESSE',
            dataIndex: 'adress',
        },
        {
            title: 'TEL',
            dataIndex: 'tel',
        },
        {
            title: 'FAX',
            dataIndex: 'fax',
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
        },
        {
            title: 'Devis',
            // dataIndex: 'devis',
        },
    ];

    const emit = defineEmits<{
        (fn: 'handle-checked-row', v: string): void;
    }>();

    const props = defineProps<{
        operationType: any;
        data: Array<any>;
    }>();

    const rowSelection: TableProps['rowSelection'] = {
        onChange: (selectedRowKeys: any, selectedRows: any) => {
            // console.log(
            //     `selectedRowKeys: ${selectedRowKeys}`,
            //     'selectedRows: ',
            //     selectedRows
            // );
            emit('handle-checked-row', selectedRows);
        },
        getCheckboxProps: (record: any) => ({
            name: record.name,
        }),
    };
</script>
