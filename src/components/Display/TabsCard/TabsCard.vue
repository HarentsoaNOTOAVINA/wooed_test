<template>
    <div class="tabs">
        <a-tabs
            v-model:activeKey="activeKey"
            @change="emit('change', dataTabs[activeKey].tabName)"
            :animated="true"
        >
            <a-tab-pane
                :disabled="disabledTab.includes(item.tabName)"
                v-for="(item, index) in dataTabs"
                :key="index"
            >
                <template #tab>
                    <span>
                        {{ item.tabTitle }}
                    </span>
                    <span v-if="item.count" class="tabs__count">
                        {{ item.count }}
                    </span>
                </template>
                <slot :name="item.tabName" />
            </a-tab-pane>
        </a-tabs>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { Tabs as ATabs, TabPane as ATabPane } from 'ant-design-vue';

    const props = defineProps({
        tabTitle: {
            type: String,
            default: '',
        },
        dataTabs: {
            type: Object,
            default: null,
        },
        disabledTab: {
            type: Array,
            default: [],
            required: false,
        },
        count: {
            type: Number,
            default: 0,
        },
    });

    const emit = defineEmits<{
        (e: 'change', value: string): void;
    }>();

    const activeKey = ref<any>(0);
</script>

<style lang="scss" scoped>
    .tabs {
        &__count {
            @apply bg-gray rounded-[4px] text-grayIcon px-[8px] py-[4px] font-[400];
        }
        &:deep() {
            // .ant-tabs-nav-list {
            //     @apply w-full justify-between;
            // }
            .ant-tabs-tab {
                @apply w-full flex justify-center;
            }
            .ant-tabs-tab-btn {
                @apply text-grayIcon flex items-center gap-[10px];
            }
            .ant-tabs-tab-active {
                .ant-tabs-tab-btn {
                    @apply text-secondary font-[600];
                }
            }
            .ant-tabs-ink-bar {
                @apply bg-secondary h-[1px];
            }
            .ant-tabs-nav-wrap {
                overflow: auto;
                &::-webkit-scrollbar {
                    width: 0px;
                }
            }
            /* Start transition */
            .a-tabs-tabpane {
                opacity: 0;
                transition: opacity 0.3s;
            }

            .a-tabs-tabpane-active {
                opacity: 1;
            }
            /* End transition */
        }
    }
</style>
