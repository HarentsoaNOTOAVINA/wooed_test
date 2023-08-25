<template>
    <div class="filterButton">
        <Dropdown
            :trigger="['click']"
            v-model:visible="visible"
            placement="bottomRight"
        >
            <CardWrapper
                @click.prevent
                class="filterButton__icon ant-dropdown-link"
            >
                <Icon icon-name="Filter" />
                <Icon icon-name="ArrowBottom" class="open-icon" />
            </CardWrapper>
            <template #overlay>
                <CardWrapper class="filterButton__container">
                    <ul class="filterButton__lists">
                        <li
                            v-for="(item, index) in filterItem"
                            :key="index"
                            class="filterButton__item"
                            :class="[
                                nameActive === item.name
                                    ? 'filterButton__active'
                                    : '',
                            ]"
                            @click="handleClick(item, item.name)"
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
    import Icon from '@/components/Common/Icon/Icon.vue';
    import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
    import { Dropdown } from 'ant-design-vue';
    import { ref } from 'vue';

    
    const props = defineProps({
        filterItem: {
            type : Object,
            default : null,
        },
    });
    
    const visible = ref(false);
    const nameActive = ref<String>(props.filterItem[0].name);
    
    function handleClick(item: any, key: string) {
        if (item) {
            nameActive.value = item.name;
        }
    }
</script>

<style lang="scss" scoped>
    .filterButton {
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
