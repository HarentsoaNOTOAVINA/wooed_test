<template>
    <div class="addBlock">
        <div class="addBlock__container">
            <template v-for="(item, index) in itemsData" :key="item.id">
                <Transition appear name="fadeHeight" mode="out-in">
                    <div :class="(index > 0) ? 'addBlock__form--wrap' : ''" class="addBlock__form">
                        <slot
                            :increment="index"
                            name="increment"
                            :key="index"
                        />
                        <button
                            v-if="index > 0"
                            class="addBlock__btn"
                            @click="deleteItem(index)"
                        >
                            <Icon icon-name="Close" />
                        </button>
                    </div>
                </Transition>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { ref, watch } from 'vue';

    const numberDefault = ref<number>(0);

    const props = defineProps({
        label: {
            type: String,
            default: '',
        },
        data: {
            type: Array,
            default: [{}],
        },
    });

    const itemsData = ref<any>(props.data);
    const emit = defineEmits<{
        (e: 'handleRemove', v: any): void;
    }>();

    watch(
        () => props.data,
        (value) => {
            itemsData.value = value;
        },
        { immediate: true }
    );

    function deleteItem(id: number) {
        // itemsData.value = itemsData.value.filter((el: any, index: any) => {
        //     return index !== id;
        // });
        emit('handleRemove', id);
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .addBlock {
        @apply flex flex-col gap-[14px];
        &__container {
            @apply flex flex-col gap-[10px];
        }
        &__form {
            @apply relative w-full flex flex-col gap-[14px];
            &--wrap {
                @apply bg-gray rounded-[8px] px-[14px] py-[14px];
                @screen md {
                    @apply px-[18px]
                }
            }
        }
        &__btn {
            @apply absolute top-[11px] right-[11px] h-[22px] w-[22px] flex justify-center items-center rounded-full bg-gray;
            @include hoverButtonDark;
            &:hover {
                &:deep() {
                    svg path {
                        @apply fill-primary;
                    }
                }
            }
        }
        &:deep() {
            .addBlock__form {
                div {
                    @apply w-full h-full;
                }
            }
        }
    }
    .__hr {
        @apply text-gray;
    }

    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.3s ease-in-out;
        max-height: 800px;
    }

    .fadeHeight-enter-from,
    .fadeHeight-leave-to {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0px;
    }
</style>
