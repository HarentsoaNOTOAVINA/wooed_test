<script lang='ts' setup>
import { ref, reactive, onMounted, PropType } from 'vue';
import Button from '@/components/Common/Button/Button.vue';
import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';

interface propsBtnType {
    label: string;
    handler: (args: any) => any;
}
const props = defineProps({
    title: {
        type: String,
        default: ""
    },
    buttons: {
        type: Array as PropType<propsBtnType[]>,
        default: [
            {
                label: "Suivant",
                handler: () => { }
            },
        ]
    },
    displayNextBtn: {
        type: Boolean,
        default: true
    }
})

</script>
<template>
    <div class="layout-container">
        <div class="layout-body">
            <div class="layout-title">
                <Paragraphe>{{ props.title }}</Paragraphe>
            </div>
            <hr class="__hr" />
            <slot name="body" />
        </div>
        <div v-if="displayNextBtn" class="layout-action">
            <Button v-for="(btn, key) in props.buttons" :key="key" width="100%" @click="btn.handler">
                {{ btn.label }}
            </Button>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.layout {
    &-container {
        @apply w-full flex flex-col py-5 px-2 justify-between rounded-[8px];
        background-color: white;
        min-height: 80vh;
    }

    &-title {
        &:first-child {
            @apply mb-2 font-semibold mx-2;
        }

        color: var(--color-gray-icon);
    }

    &-body {}

    &-action {
        @screen md {
            @apply flex flex-row justify-end gap-5;
        }

    }

    &-form {

        &-placement,
        &-capacity {
            @apply mt-5;

            @screen sm {
                flex: 1;
            }

            @screen md {
                @apply mx-10 mt-10;
            }

            :deep() {
                .ant-radio-wrapper {
                    font-size: 1rem;
                    font-weight: 500;
                    @apply py-1;
                }
            }

            .form {
                &-title {
                    color: var(--color-stroke-gray);
                    @apply mb-5;
                }
            }
        }
    }
}

.__hr {
    @apply block my-4 text-gray;
}
</style>
