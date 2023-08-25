<template>
    <div class="filterButton">
        <Dropdown :trigger="['click']" v-model:visible="visible" placement="bottomRight">
            <CardWrapper @click.prevent class="filterButton__icon ant-dropdown-link">
                <span class="filterButton__label">{{ nameActive }}</span>
                <Icon icon-name="ArrowBottom" class="open-icon" />
            </CardWrapper>
            <template #overlay>
                <CardWrapper class="filterButton__container">
                    <ul class="filterButton__lists truncate">
                        <li 
                            v-for="(item, index) in menuData" 
                            :key="index" 
                            class="filterButton__item" 
                            @click="handleClick(item)"
                        >
                            {{ item.titre }}
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
import { ref, computed } from 'vue';

const emit = defineEmits(['click'])
const props = defineProps({
    menuData: {
        type: Object,
        default: null,
    },
    nameActive: {
        type: String,
        default: ''
    }
});

const visible = ref(false);

function handleClick(item: any) {
    visible.value = false;
    emit('click', item)
}
</script>

<style lang="scss" scoped>
.filterButton {
    &__icon {
        @apply w-full flex items-center gap-[7px] cursor-pointer max-w-max;

        &:hover {
            @apply bg-gray;
        }
    }

    &__label {
        @apply block w-11/12 truncate;
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
