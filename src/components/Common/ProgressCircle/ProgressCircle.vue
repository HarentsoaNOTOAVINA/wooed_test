<script lang="ts" setup>
    import { Progress as AProgress } from 'ant-design-vue';
    import { PropType } from 'vue';
    defineProps({
        percent: {
            type: Number as PropType<any>,
            default: 50,
        },
        format: {
            type: String as PropType<any>,
        },
        status : {
            type : String,
        }
    });
</script>

<template>
    <div class="custom-progress-circle">
        <a-progress
            type="circle"
            :format="(_percent: any) => format ? format : `${_percent.toFixed(2)}%`"
            :percent="percent"
        ></a-progress>
    </div>
</template>

<style lang="scss" scoped>
    .custom-progress-circle {
        &:deep() {
            .ant-progress-inner:not(.ant-progress-circle-gradient)
                .ant-progress-circle-path {
                stroke: var(--color-primary) ;
            }
            .ant-progress-text {
                font-size: 14px;
            }
        }
    }
</style>
