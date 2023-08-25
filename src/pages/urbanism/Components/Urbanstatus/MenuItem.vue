<template>
    <div>
        <div class="urbanismeStatus__menu">
            <ul class="urbanismeStatus__menu">
                <li class="urbanismeStatus__menu-list">
                    <div class="urbanismeStatus__menu-list-content">
                        <InfoIcon
                            v-if="shwoInfoIcon"
                            class="urbanismeStatus__info-icon"
                            @click="infoClicked"
                        />
                        <span>{{ title }} </span>
                    </div>
                    <Button class="btn" @click="btnClicked">{{
                        titleBtn
                    }}</Button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
    import InfoIcon from '@/components/Icon/InfoIcon.vue';
    import Button from '@/components/Common/Button/Button.vue';

    defineProps({
        title: {
            type: String,
        },
        titleBtn: {
            type: String,
        },
        shwoInfoIcon: {
            type: Boolean,
            default: true,
        },
    });

    const emit = defineEmits<{
        (e: 'hanldeInfo'): void;
        (e: 'handleBtn'): void;
    }>();

    function btnClicked() {
        emit('handleBtn');
    }

    function infoClicked() {
        emit('hanldeInfo');
    }
</script>

<style scoped lang="scss">
    .urbanismeStatus {
        &__title {
            @apply mb-[15px] font-semibold;
        }

        &__subTitle {
            @apply text-[var(--color-primary)] mb-[10px];
        }
        &__menu {
            @apply mt-[15px];
        }
        &__menu-list {
            @apply my-[10px] p-[10px];
            border: 1px solid var(--color-gray);
            @screen md {
                @apply flex items-center justify-between;
                &:hover {
                    @apply bg-gray;
                }
            }
        }
        &__menu-list-content {
            @apply flex gap-[15px] mt-[10px] rounded-[4px] p-[20px] items-center;
        }
        &__info-icon {
            @apply cursor-pointer;
        }
    }

    .btn {
        @apply text-center;
    }
</style>
