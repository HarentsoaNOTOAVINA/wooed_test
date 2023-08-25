<template>
    <div class="urbanisme__sideBarMenu">
        <div class="urbanisme__sideBarMenuContainer">
            <Title label="Urbanisme" class="urbanisme__title" type="h3"/>
            <Hr />
            <ul class="urbanisme__sideBarMenu-listContainer">
                <li
                    v-for="(item, index) in menu"
                    :key="index"
                    class="urbanisme__sideBarMenu-list"
                    @click="chooseItemMenu(item.condition)"
                >
                    <Icon
                        :icon-name="item.icon"
                        class="urbanisme__sideBarMenu-icon"
                    />
                    <span>{{ item.label }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import { onMounted, ref } from 'vue';
    import { menu } from './dataUrbaMenu';
    import Title from '@/components/Common/Title/Title.vue';
    import Hr from '@/components/Common/Hr/Hr.vue';
    import Icon from '@/components/Common/Icon/Icon.vue';

    onMounted(() => {
        console.log('educationData:', menu);
    });

    const emit = defineEmits(['switchComponent']);

    const chooseItemMenu = (item: any) => {
        emit('switchComponent', item);
    };
</script>

<style lang="scss" scoped>
    .urbanisme {
        &__sideBarMenu {
            width: 100%;
            background-color: #fff;
            @apply rounded-lg h-fit;
            @screen lg{
              @apply flex ;
            }
        }
        &__sideBarMenuContainer {
            @apply p-[18px] w-full;
            @screen lg{
                // height: 100vh;
            }
        }

        &__title {
            color: var(--color-gray-icon);
        }
        &__sideBarMenu-listContainer {
            @apply flex flex-col gap-[14px] w-full rounded;
        }
        &__sideBarMenu-list {
            border: 1px solid;
            border-color: var(--color-gray);
            cursor: pointer;
            display: flex;
            column-gap: 16px;
            @apply flex px-3 py-4 ;
        }
        &__sideBarMenu-icon {
            @apply w-[30px];
        }

        &__sideBarMenu-list {
            color: var(--color-gray-icon);
            @apply font-semibold duration-300 gap-x-[16px];

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
