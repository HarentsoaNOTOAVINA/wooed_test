<template>
    <div class="tabs-wrap">
        <div class="tabs-header">
            <span class="tabs-header__context">Messages</span>
            <Dropdown
                :trigger="['click']"
                v-model:visible="visible"
                placement="bottomRight"
            >
                <Icon icon-name="MenuRight" class="open-icon" />
                <template #overlay>
                    <div class="tabs-header__content">
                        <div
                            v-for="(tab, index) in tabs"
                            :key="index"
                            :class="{ active: activeTab === index }"
                            class="tabs-item"
                            @click="activeTab = index"
                        >
                            <span>
                                {{ tab.tabTitle }}
                            </span>
                            <span v-if="tab.count" class="tabs-count">
                                {{ tab.count }}
                            </span>
                        </div>
                    </div>
                </template>
            </Dropdown>
        </div>
        <hr class="__hr" />
        <div class="tabs-nav">
            <div
                v-for="(tab, index) in tabs"
                :key="index"
                :class="{ active: activeTab === index }"
                class="tabs-item"
                @click="handleClick(index)"
            >
                <span>
                    {{ tab.tabTitle }}
                </span>
                <span v-if="tab.count" class="tabs-count">
                    {{ tab.count }}
                </span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { Dropdown } from 'ant-design-vue';
    import { ref } from 'vue';

    const props = defineProps({
        tabs: {
            type: Array<any>,
            required: true,
        },
    });

    const emit = defineEmits<{
        (e: 'click', value: string): void;
    }>();

    const activeTab = ref<number>(0);
    const visible = ref<boolean>(false);

    function handleClick(index: number) {
        emit('click', props.tabs[index].tabName);
        activeTab.value = index;
    }
</script>

<style lang="scss" scoped>
    .tabs {
        &-wrap {
            @apply bg-white px-[14px];
            @screen lg {
                @apply block px-0;
            }
        }
        &-header {
            @apply flex justify-between items-center py-[14px];
            @screen lg {
                @apply hidden;
            }
            &__context {
                @apply font-[600];
            }
            &__content {
                box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.25);
                @apply bg-white p-[10px] rounded-[4px] mt-[14px];
                .tabs-item {
                    @apply justify-start py-[4px] px-[10px];
                    &.active {
                        @apply border-0 bg-gray;
                    }
                    .tabs-count {
                        @apply hidden;
                    }
                }
            }
            :deep() {
                .ant-dropdown-open {
                    &.open-icon {
                        transform: rotateX(180deg);
                    }
                }
            }
            .open-icon {
                transform: rotateX(0);
                @apply cursor-pointer;
            }
        }
        &-nav {
            // flex: 1 0 auto;
            // border-bottom: 1px solid;
            box-shadow: inset 0 -1px 0 var(--color-stroke-gray);
            @apply h-[53px] hidden justify-between items-center border-gray;
            @screen lg {
                @apply flex;
            }
        }
        &-item {
            @apply w-auto h-full flex justify-center items-center gap-[10px] cursor-pointer px-[20px] transition-all;
            &.active {
                @apply font-[600] transition-all relative border-b-[1px] border-solid border-secondary;
            }
            &:hover {
                @apply font-[600] transition-all;
            }
        }
        &-title {
            @apply text-grayIcon;
            &.active {
                @apply text-secondary  font-[600];
            }
        }
        &-count {
            @apply bg-gray text-grayIcon font-[400] px-[8px] py-[4px] rounded-[4px];
        }
    }
    .__hr {
        @apply text-gray w-full;
        @screen lg {
            @apply hidden;
        }
    }
</style>
