<template>
    <div class="sideMenu__section">
        <div
            class="sideMenu__container--mobile"
            @click="toggleMenu"
            :class="showMenu ? 'show-menu' : ''"
        >
            <Title
                type="h2"
                weight="600"
                :label="title"
                class="sideMenu__title--mobile"
            />
            <Icon icon-name="ArrowBottom" />
        </div>
        <Transition appear name="fadeHeight" mode="out-in">
            <ul class="sideMenu__container" v-show="showMenu">
                <li
                    v-for="(item, index) in data"
                    :key="index"
                    class="sideMenu__item"
                    :class="[
                        nameActive === item.name ? 'sideMenu__active' : '',
                    ]"
                    @click="handleClick(item), toggleMenu(item)"
                >
                    <Icon :icon-name="item.icon" />
                    <span>
                        {{ item.label }}
                    </span>
                </li>
            </ul>
        </Transition>
    </div>
</template>
<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import { ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const props = defineProps({
        data: {
            type: Array<any>,
        },
        titleMobile: {
            type: String,
            default: '',
        },
    });

    const title = ref<string>(props.titleMobile);
    const data = ref<any>(props.data);
    const emit = defineEmits(['activeComp']);
    const nameActive = ref<string>('');
    const route = useRoute();

    onMounted(() => {
        if (route.query.type) {
            const comp = data.value.filter((item: any) => {
                return item.query === route.query.type;
            });
            nameActive.value = comp[0].name;
        }
    });

    function handleClick(item: any) {
        emit('activeComp', item);
        // nameActive.value = item.name;
    }


    const showMenu = ref<boolean>(false);

    function toggleMenu(value: any) {
        if (window.innerWidth <= 764) {
            showMenu.value = !showMenu.value;
        }
    }
</script>
<style lang="scss" scoped>
    @import '@/style.scss';
    .sideMenu {
        &__section {
            @apply flex flex-col gap-y-[14px];
            @screen md {
                max-width: 315px;
                @apply w-full;
            }
        }
        &__container {
            @apply bg-white rounded-lg p-3 w-full;
            @screen md {
                display: flex !important;
                @include scrollbar;
                @apply h-full flex-col w-full overflow-y-auto gap-y-[5px];
            }
        }
        &__container--mobile {
            @apply flex justify-between items-center bg-white rounded-lg p-3 w-full cursor-pointer;
            @screen md {
                @apply hidden;
            }
            &__item {
                @apply p-0 pointer-events-none;
            }
            .icon {
                transform: rotateX(0deg);
                @apply transition-transform;
            }
            &.show-menu {
                .icon {
                    @apply transition-transform;
                    transform: rotateX(180deg);
                }
            }
        }
        &__title--mobile {
            &:deep() {
                @apply font-[600] text-[14px];
            }
        }
        &__item {
            @apply font-semibold flex px-3 w-full py-4 rounded-lg duration-300 gap-x-[16px];
            span {
                @apply truncate;
            }
            &:hover {
                @apply bg-gray cursor-pointer;
            }
            &.active {
                @apply bg-gray;
            }
            &:deep() {
                .icon {
                    svg {
                        @apply w-[18px] h-[18px];
                    }
                }
            }
        }
        &__icon {
            @apply mr-[18.5px] w-4 h-4;
        }

        &__active {
            @apply bg-gray cursor-pointer;
        }
    }
    .fadeHeight-enter-active,
    .fadeHeight-leave-active {
        transition: all 0.3s ease-in-out;
        max-height: 300px;
    }

    .fadeHeight-enter-from,
    .fadeHeight-leave-to {
        opacity: 0;
        transform: translateY(-8px);
        max-height: 0px;
    }
</style>
