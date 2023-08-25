<template>
    <div class="education__sideBarMenu">
        <div class="education__sideBarMenuContainer">
            <ul class="education__sideBarMenu-listContainer">
                <li
                    v-for="(item, index) in sideBarMenu"
                    :key="index"
                    class="education__sideBarMenu-list"
                    :class="[
                        nameActive === item.name ? 'education__active' : '',
                    ]"
                    @click="chooseItemMenu(item)"
                >
                    <Icon
                        :icon-name="item.icon"
                        class="education__sideBarMenu-icon"
                    />
                    <span>{{ item.label }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { sideBarMenu } from './educationData';

    const nameActive = ref<string>(sideBarMenu[3].name);
    const activeData = ref(sideBarMenu[3]);

    onMounted(() => {
        console.log('educationData:', sideBarMenu);
    });

    const emit = defineEmits(['activeComp']);

    const chooseItemMenu = (item: any) => {
        emit('activeComp', item);
        nameActive.value = item.name;
        activeData.value = item;
    };
</script>

<style lang="scss" scoped>
    .education {
        &__sideBarMenu {
            background-color: #fff;
            height: calc(100vh - 100px);
            @apply rounded-lg gap-[16px];
        }
        &__sideBarMenuContainer {
            width: 315px;
            height: calc(100vh - 100px);
        }
        &__sideBarMenu-listContainer {
            @apply p-[18px] gap-[10px] w-full;
        }
        &__sideBarMenu-list {
            column-gap: 16px;
            @apply flex items-center my-[5px] pl-3 pr-3 pt-4 pb-4;
        }
        &__sideBarMenu-icon {
            @apply w-[30px];
        }

        &__sideBarMenu-list {
            @apply font-semibold flex px-3 w-full py-4 my-[5px] rounded-lg duration-300 gap-x-[16px];

            @screen md {
                &:hover {
                    @apply bg-gray cursor-pointer;
                }
                &.active {
                    @apply bg-gray;
                }
            }
        }
        &__active {
            @apply bg-gray cursor-pointer my-[5px];
        }
    }
</style>
