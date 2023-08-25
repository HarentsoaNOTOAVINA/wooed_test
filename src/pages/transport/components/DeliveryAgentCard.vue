<template>
    <CardWrapper class="delivery-agent-card">
        <div class="delivery-agent-card__items">
            <avatar src="https://joeschmoe.io/api/v1/random" shape="square" :size="40" />
            <div class="delivery-agent-card__items-wrap">
                <div class="delivery-agent-card__items-content">
                    <span class="delivery-agent-card__items-title">{{ data.userName }}</span>
                </div>
            </div>
        </div>
        <hr class="__hr" />
        <Paragraphe></Paragraphe>
        <div class="h-9">
            {{ data.message }}
        </div>
        <Button type-button="secondary" class="btn" @click="selectAgent" :disabled="props.disableBtn">
            Choisir
        </Button>
    </CardWrapper>
</template>

<script setup lang="ts">
import Icon from '@/components/Common/Icon/Icon.vue';
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
import Title from '@/components/Common/Title/Title.vue';
import CardWrapper from '@/components/Display/CardWrapper/CardWrapper.vue';
import avatar from 'ant-design-vue/lib/avatar';
import Button from '@/components/Common/Button/Button.vue';

const emit = defineEmits(['select-agent'])

const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    disableBtn: {
        type: Boolean,
        default: false
    }
});

function selectAgent() {
    emit('select-agent', { id: props.data.id, payload: { status: "en cours de livraison" } });
}
</script>

<style lang="scss" scoped>
.delivery-agent-card {
    @apply flex flex-col gap-[4px] items-stretch;

    &__items {
        @apply relative flex gap-x-[12px];

        @screen lg {
            @apply pr-[34px];
        }
    }

    &__items-content {
        @apply flex flex-col gap-[14px];

        @screen sm {
            @apply flex-row;
        }
    }

    &__items-title {
        @apply font-medium;
    }
}

.__hr {
    @apply text-gray my-[18px];
}

.btn {
    @apply w-full mt-[18px];

    &:deep() {
        button {
            width: 100%;
        }

    }
}
</style>
