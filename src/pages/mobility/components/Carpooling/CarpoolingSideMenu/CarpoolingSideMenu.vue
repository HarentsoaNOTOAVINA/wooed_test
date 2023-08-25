<template>
    <div class="sideMenu__section">
        <div class="sideMenu__container-mobile">
            <template v-for="(item, index) in dataBikes" :key="index">
                <div v-if="item.activeButton === true" class="sideMenu__item">
                    <Icon :icon-name="item.icon" />
                    <span> {{ item.label }} </span>
                </div>
            </template>
        </div>
        <div class="sideMenu__container">
            <Router-link
                v-for="(item, index) in dataBikes"
                :key="index"
                :to="item.link"
                class="sideMenu__item"
                :class="[item.activeButton === true ? 'sideMenu__active' : '']"
            >
                <Icon :icon-name="item.icon" />
                <span>
                    {{ item.label }}
                </span>
            </Router-link>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { PropType } from 'vue';
    const props = defineProps({
        dataBikes: {
            type: Array as PropType<any>,
            required: true,
        },
    });
</script>

<style lang="scss" scoped>
    @import '@/style.scss';

    .sideMenu {
        &__section {
            @apply flex bg-white rounded-lg p-3 w-full;

            @screen md {
                max-width: 315px;
                height: calc(100vh - 94px);
            }
        }

        &__container {
            @apply hidden;

            @screen md {
                @include scrollbar;
                @apply block w-full overflow-y-auto;
            }
        }

        &__container-mobile {
            @apply block w-full;

            @screen md {
                @apply hidden;
            }
            .sideMenu__item {
                @apply m-0 p-0;
            }

            &__item {
                @apply p-0 pointer-events-none;
            }
        }

        &__item {
            @apply text-grayIcon font-semibold flex items-center px-3 w-full py-4 my-[5px] rounded-lg duration-300 gap-x-[16px];

            @screen md {
                &:hover {
                    @apply bg-gray cursor-pointer;
                }
                &.active {
                    @apply bg-gray;
                }
            }
        }

        &__icon {
            @apply mr-[18.5px] w-4 h-4;
        }

        &__active {
            @apply bg-gray cursor-pointer my-[5px];
        }
    }
</style>
