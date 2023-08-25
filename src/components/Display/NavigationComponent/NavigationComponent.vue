<script lang="ts" setup>
    import {
        Breadcrumb as ABreadcrumb,
        BreadcrumbItem as ABreadcrumbItem,
    } from 'ant-design-vue';

    defineProps<{
        navigationMenuArray: any;
    }>();
</script>

<template>
    <div>
        <a-breadcrumb separator="|">
            <a-breadcrumb-item
                @click="$emit('on-navigate-to', item)"
                v-for="(item, index) in navigationMenuArray"
                :key="index"
                >{{ item.label }}</a-breadcrumb-item
            >
        </a-breadcrumb>
    </div>
</template>
