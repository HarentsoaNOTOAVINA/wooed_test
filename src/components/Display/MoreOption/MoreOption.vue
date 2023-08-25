<template>
    <div class="moreOption">
        <Dropdown
            :trigger="['click']"
            v-model:visible="visible"
            placement="bottomRight"
        >
            <CardWrapper
                v-if="borderButton"
                @click.prevent
                class="moreOption__icon ant-dropdown-link"
            >
                <slot name="buttonIcon" />
            </CardWrapper>
            <div v-else @click.prevent class="moreOption__icon ant-dropdown-link rounded-full p-[4px]">
                <slot name="buttonIcon" />
            </div>
            <template #overlay>
                <CardWrapper class="moreOption__container">
                    <ul v-if="filterButton" class="moreOption__lists">
                        <li
                            v-for="(item, index) in optionItems"
                            :key="index"
                            class="moreOption__item"
                            :class="[
                                nameActive === item.name
                                    ? 'moreOption__active'
                                    : '',
                            ]"
                            @click="handleClick(item, item.name)"
                        >
                            {{ item.label }}
                        </li>
                    </ul>
                    <div v-else-if="slotContent">
                        <slot name="content" />
                    </div>
                    <ul v-else class="moreOption__lists">
                        <li
                            v-for="(item, index) in optionItems"
                            :key="index"
                            class="moreOption__item"
                            @click="handleAction(item)"
                        >
                            {{ item.label }}
                        </li>
                    </ul>
                </CardWrapper>
            </template>
        </Dropdown>
    </div>
</template>

<script setup lang="ts">
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import { Dropdown } from 'ant-design-vue';
    import { ref } from 'vue';

    const props = defineProps({
        optionItems: {
            type: Object,
            default: {},
        },
        filterButton: {
            type: Boolean,
            default: false,
        },
        borderButton: {
            type: Boolean,
            default: false,
        },
        slotContent: {
            type: Boolean,
            default: false,
        },
    });

    const visible = ref(false);
    const nameActive = ref<String>(props.optionItems[0] ? props.optionItems[0].name : null);

    const emit = defineEmits<{
        (fn: "on-action", v: any): void
    }>();

    function handleClick(item: any, key: string) {
        if (item) {
            nameActive.value = item.name;
        }
    }
    
    function handleAction(item: any) {
        emit("on-action", item.name);
    }
</script>

<style lang="scss" scoped>
    .moreOption {
        &__icon {
            @apply flex items-center gap-[7px] cursor-pointer max-w-max;
            &:hover {
                @apply bg-gray;
            }
        }
        .ant-dropdown-open {
            @apply bg-gray;
            .open-icon {
                transform: rotateX(180deg);
                @apply transition-transform;
            }
        }
        .open-icon {
            transform: rotateX(0);
            @apply transition-transform;
        }
        &__lists {
            @apply flex flex-col gap-[4px] px-[5px];
        }
        &__item {
            @apply py-[2px] cursor-pointer rounded-[4px];
            &:hover {
                @apply bg-gray px-[10px] -mx-[10px] text-primary transition;
            }
        }
        &__active {
            @apply bg-gray px-[10px] -mx-[10px] text-primary transition;
        }
    }
</style>
