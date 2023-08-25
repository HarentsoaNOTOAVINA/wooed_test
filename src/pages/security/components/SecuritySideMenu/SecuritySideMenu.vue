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
                label="Sécurity"
                class="sideMenu__title--mobile"
            />
            <Icon icon-name="ArrowBottom" />
        </div>
        <Transition appear name="fadeHeight" mode="out-in">
            <ul class="sideMenu__container" v-show="showMenu">
                <li
                    v-for="(item, index) in dataSideMenu"
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
        <Modal
            :title="modalPartenariatData.modalTitle"
            :isShowModal="isShowModal"
            @onBack="isShowModal = false"
        >
            <template #content>
                <CommunityPerimeters
                    :buttonTitle="modalPartenariatData.modalButton"
                    type-action="otherService"

                />
                    <!-- :data="modalPartenariatData" -->
            </template>
        </Modal>
    </div>
</template>
<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import Title from '@/components/Common/Title/Title.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import CommunityPerimeters from '@/pages/community/components/CommunityPerimeters.vue';
    import { dataSideMenu } from '@/pages/security/components/SecuritySideMenu/DataSecuritySideMenu';
    import { ref } from 'vue';

    interface dataModal {
        icon?: string;
        buttonLabel?: string;
        type?: string;
        modalTitle?: string;
        modalButton?: string;
    }

    const emit = defineEmits(['activeComp']);
    const nameActive = ref<string>(dataSideMenu[0].name);

    function handleClick(item: any) {
        if (item.name === 'degradation') {
            (window as any).open(item.url);
        } else if (item.name === 'partenariat') {
            isShowModal.value = true;
            contentModal.value = item;
        } else {
            emit('activeComp', item);
            nameActive.value = item.name;
        }
    }

    let showMenu = ref<boolean>(false);
    const isShowModal = ref<boolean>(false);
    const contentModal = ref<dataModal>({});

    const modalPartenariatData: dataModal = 
        {
            icon: 'Service',
            buttonLabel: 'Divers services',
            type: 'services',
            modalTitle: 'Services divers',
            modalButton: 'Acceder aux services divers',
        }

    function toggleMenu(value: any) {
        if (window.screen.width <= 768) {
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
                @apply text-[14px];
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
