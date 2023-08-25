<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { dataSideMenu } from './dataMenu';
    // import { dataSideMenu } from "../dataMenu.ts";
    import { onMounted, ref, watch } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const emit = defineEmits(['activeComp']);
    const nameActive = ref<string>(dataSideMenu[0].name);
    const activeData = ref<any>(dataSideMenu[0]);
    const route = useRoute();

    watch(
        () => activeData.value,
        (value) => {
            activeData.value = value;
        },
        { immediate: true, deep: true }
    );

    onMounted(() => {
        if (route.query.type) {
            const comp = dataSideMenu.filter((item) => {
                return item.name === route.query.type;
            });
            nameActive.value = comp[0].name;
        }
    });

    function click(item: any) {
        emit('activeComp', item);
        nameActive.value = item.name;
        activeData.value = item;
    }
</script>
<template>
    <div class="sideMenu__section">
        <div class="sideMenu__container-mobile">
            <div class="sideMenu__item">
                <Icon :icon-name="activeData.icon" />
                <span> {{ activeData.label }} </span>
            </div>
        </div>
        <ul class="sideMenu__container">
            <li
                v-for="(item, index) in dataSideMenu"
                :key="index"
                class="sideMenu__item"
                :class="[nameActive === item.name ? 'sideMenu__active' : '']"
                @click="click(item)"
            >
                <Icon :icon-name="item.icon" />
                <span>
                    {{ item.label }}
                </span>
            </li>
        </ul>
    </div>
</template>

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
            @apply font-semibold flex items-center px-3 w-full py-4 my-[5px] rounded-lg duration-300 gap-x-[16px];

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
