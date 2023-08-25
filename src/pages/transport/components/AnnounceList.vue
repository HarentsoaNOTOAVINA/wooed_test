<template>
    <div class="announce__items">
        <div class="announce__item">
            <span>Vue</span>
            <div class="announce__item-grid">
                <label :class="listMode ? 'active' : ''">
                    <input type="radio" v-model="listMode" name="listGrid" :value="true" hidden />
                    <Icon icon-name="List" />
                </label>
                <label :class="!listMode ? 'active' : ''">
                    <input type="radio" v-model="listMode" name="listGrid" :value="false" hidden />
                    <Icon icon-name="Grid" />
                </label>
            </div>
        </div>
        <div class="announce__lists" :class="!listMode ? ' announce__grid' : ''">
            <slot />
        </div>
    </div>
</template>
<script lang="ts" setup>
import Icon from '@/components/Common/Icon/Icon.vue';
import { ref } from 'vue';
const listMode = ref<boolean>(true);
</script>
<style lang="scss" scoped>
.announce {
    &__items {
        @apply flex flex-col gap-[14px];
    }

    &__item {
        @apply hidden justify-between items-center;

        @screen sm {
            @apply flex;
        }

        @screen md {
            @apply hidden;
        }

        @screen lg {
            @apply flex;
        }

        span {
            @apply text-[16px] font-[600];
        }

        &-grid {
            @apply flex gap-[4px];

            label {
                @apply cursor-pointer bg-white rounded-[4px];

                &:hover {
                    &:deep() {
                        @apply bg-gray;

                        svg {
                            path {
                                @apply fill-primary;
                            }
                        }
                    }
                }

                &.active {
                    @apply bg-gray;

                    &:deep() {
                        @apply bg-gray;

                        svg {
                            path {
                                @apply fill-primary;
                            }
                        }
                    }
                }
            }
        }
    }

    &__lists {
        max-height: calc(100vh - 354px);
        @apply grid grid-cols-1 gap-[14px];

        &:deep() {
            @screen lg {
                .cardItem {
                    @apply grid-cols-6;

                    &__figure-wrap {
                        @apply col-span-2;
                    }

                    &__items {
                        @apply col-span-4;
                    }
                }
            }
        }
    }

    &__grid {
        @apply grid-cols-1;

        @screen sm {
            @apply grid-cols-2;
        }

        @screen md {
            @apply grid-cols-1;
        }

        @screen lg {
            @apply grid-cols-2;
        }

        @screen xl {
            @apply grid-cols-3;
        }

        &:deep() {
            .cardItem {
                @apply grid-cols-1;

                    &__figure-wrap {
                        @apply col-span-1;
                    }

                    &__items {
                        @apply col-span-1;
                    }
            }
        }
    }
}
</style>