<template>
    <a-collapse v-model:activeKey="activeKey" expandIconPosition="right" class="custom-collapse" accordion>
        <a-collapse-panel :forceRender="forceRender" v-for="item,index in collapseData" :key="index" :header="item.title" class="custom-collapse__items">
            <component :is="item.content" v-bind="$attrs" />
        </a-collapse-panel>
    </a-collapse>
</template>
<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import { Collapse as ACollapse, CollapsePanel as ACollapsePanel } from 'ant-design-vue';

    const activeKey = ref([]);

    const emit = defineEmits(['set-component']);

    const props = defineProps({
        collapseData: {
            type: Object,
            default: [
                {
                    title: "Collapse one",
                    content: "Collapse content",
                },
                {
                    title: "Collapse two",
                    content: "Collapse content"
                },
            ]
        },
        forceRender: {
            type:Boolean,
            default: false
        }
    });
</script>
<style lang="scss" scoped>
    .custom-collapse{
        @apply flex flex-col gap-[18px] bg-white border-none;
        &__items{
            border: 0.5px solid var(--color-stroke-gray);
            @apply rounded-[4px];
        }
    }
</style>