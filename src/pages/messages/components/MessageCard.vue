<template>
    <div class="message__card">
        <div class="message__card-wrap-head">
            <div class="message__card-head">
                <Avatar :src="dataContent.logo" :size="40" />
                <div class="message__card-title">
                    <Paragraphe type="bold" font-size="14px">
                        {{ dataContent.name }}
                    </Paragraphe>
                    <Paragraphe font-size="12px" class="message__card-subtitle">
                        {{ dataContent.address }}
                    </Paragraphe>
                    <div>
                        <slot name="messages" />
                    </div>
                </div>
            </div>
            <div class="message__card-action">
                <slot name="rightContent" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import { Avatar } from 'ant-design-vue';
import { ref, watch } from 'vue';

    const props = defineProps({
        data: {
            type: Object,
            default: {},
        },
    });

    const dataContent = ref<any>(props.data)

    watch(() => props.data, (value) => {
        dataContent.value = value
    })

</script>

<style lang="scss" scoped>
    .message {
        &__card-head {
            @apply flex gap-[12px];
        }
        &__card-wrap-head {
            @apply flex justify-between;
        }
        &__card-subtitle {
            color: var(--color-gray-icon);
        }
    }
</style>
