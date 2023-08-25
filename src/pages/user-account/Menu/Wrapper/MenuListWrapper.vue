<script lang="ts" setup>
    import Title from '@/components/Common/Title/Title.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import NavigationComponent from '@/components/Display/NavigationComponent/NavigationComponent.vue';
    import { ref, watch } from 'vue';

    const props = defineProps<{
        labelMenu: string;
        navigationMenuArray: any;
        isMobile: boolean;
    }>();

    const emit = defineEmits<{
        (e: 'on-navigate-to', v: { label: string; value: any }): void;
    }>();

    const showBackMenu = ref(true);

    function navigationHandler(e: { label: string; value: any }) {
        emit('on-navigate-to', e);
    }

    watch(
        () => props.isMobile,
        (v) => {
            if (v) {
                showBackMenu.value = true;
            } else if (!v && props.navigationMenuArray.length > 1) {
                showBackMenu.value = false;
            }
        },
        { immediate: true, deep: true }
    );
    watch(
        () => props.navigationMenuArray,
        (v) => {
            if (props.isMobile) {
                showBackMenu.value = true;
            } else if (!props.isMobile && v.length > 1) {
                showBackMenu.value = true;
            } else {
                showBackMenu.value = false;
            }
        },
        { immediate: true, deep: true }
    );
</script>

<template>
    <div class="menu-list">
        <div class="menu-list__container">
            <div class="menu-list__header">
                <div v-if="navigationMenuArray.length" class="back-to-menu">
                    <ArrowBack
                        v-if="showBackMenu"
                        @click="$emit('on-go-back')"
                    />
                    <span
                        ><NavigationComponent
                            :navigationMenuArray="navigationMenuArray"
                            @on-navigate-to="navigationHandler"
                    /></span>
                </div>
            </div>
            <hr class="mb-[20px] mt-[20px]" />
            <div class="menu-list__content">
                <slot />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .menu-list {
        min-height: 90vh;
        &__container {
            @apply p-[20px];
            border-radius: 8px;
            background-color: #fff;
            min-height: inherit;
            position: relative;
            &:deep() {
                .custom-loader {
                    background-color: transparent;
                }
            }
        }
        &__header {
            @apply flex flex-col gap-[20px];
            .back-to-menu {
                @apply flex flex-row gap-[10px] items-center w-fit;
                font-weight: 700;
                &:hover {
                    cursor: pointer;
                }
                @screen md {
                    // display: none;
                }
            }
            &:deep() {
                h3 {
                    color: var(--color-gray-icon);
                }
            }
        }
        &__content {
            position: relative;
            min-height: calc(90vh - 150px);
            @apply mb-[10px];
        }
    }
</style>
