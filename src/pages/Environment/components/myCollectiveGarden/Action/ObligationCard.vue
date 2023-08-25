<template>
    <div>
        <div v-if="data.id === -1" class="list-container grid grid-cols-1 content-between">
            <span class="block">{{ data.label }}</span>
            <div class="button-container">
                <Button type-button="secondary" class="btn"
                    @click="setActiveContent({ content: data, label: data.label })">
                    Action
                </Button>
            </div>
        </div>
        <div v-else class="list-container grid grid-cols-1 content-between">
            <span class="block">{{ data.id }}. {{ data.label }}</span>
            <div v-if="displayActionBtn && data.content" class="button-container">
                <Button type-button="secondary" class="btn"
                    @click="setActiveContent({ content: data.content[0], label: data.label })">
                    Action
                </Button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Button from '@/components/Common/Button/Button.vue';
import { computed } from 'vue';
const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})

const displayActionBtn = computed(() => {
    let content = props.data.content;
    if (content) {
        if (Array.isArray(content) && content.length >= 1) {
            let contentElement = content[0]
            if (Array.isArray(contentElement.data) && contentElement.data.length === 0) return false
            // else if (contentElement.type === 'menu') return false
            else return true
        } else {
            return false
        }
    } else {
        return false
    }
})

const emit = defineEmits(['set-active-content']);

function setActiveContent(value: any) {
    console.error(value);
    value.content !== undefined ? emit('set-active-content', value) : ''
}
</script>
<style lang="scss" scoped>
.button-container {
    @apply w-full flex justify-end;
}

.list-container {
    @apply border p-2.5 my-2 rounded-md;

    @screen md {
        // @apply h-[128px];
        @apply p-4;
        min-height: 128px;
    }

    border-color: var(--color-stroke-gray);
}

.btn {
    @apply pt-4;
}
</style>