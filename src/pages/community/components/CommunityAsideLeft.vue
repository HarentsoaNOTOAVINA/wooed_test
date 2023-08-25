<script setup lang="ts">
    import Icon from '@/components/Common/Icon/Icon.vue';
    import { Affix } from 'ant-design-vue';
    import HeadCard from '@/pages/community/components/CommunityPublication/HeadCard.vue';
    import Input from '@/components/Common/Input/Input.vue';
    import CommunityInfo from '@/pages/community/components/CommunityInfo.vue';
    import CommunityInfoCard from '@/pages/community/components/CommunityInfoCard.vue';
    import CommunityPerimeters from '@/pages/community/components/CommunityPerimeters.vue';
    import ButtonMenu from '@/components/Common/ButtonMenu/ButtonMenu.vue';
    import CommunityButtonMenu from './CommunityButtonMenu.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Consultation from '../Consultation/Consultation.vue';
    import { ref } from 'vue';
    import Card from '@/components/Display/Card/Card.vue';
    import router from '@/routes';

    interface dataModal {
        icon?: string;
        buttonLabel?: string;
        type?: string;
        modalTitle?: string;
        modalButton?: string;
    }
    enum TypeAction {
        COMMUNITY = 'community',
        CONSULTATION = 'consultation',
        DIVERS_SERVICES = 'otherService',
    }
 
    const props = defineProps({
        details: {
            type: Object,
            default: {},
        },
        typeAction: {
            type: String,
            default: 'community',
        },
    });

    const isShowModal = ref<boolean>(false);
    const contentModal = ref<dataModal>({});

    const asideLeftButtonData: dataModal[] = [
        {
            icon: 'Consultation',
            buttonLabel: 'Consultation',
            type: 'consultation',
            modalTitle: 'Consultation',
            modalButton: 'Acceder à la consultation',
        },
        {
            icon: 'Service',
            buttonLabel: 'Divers services',
            type: 'services',
            modalTitle: 'Services divers',
            modalButton: 'Acceder aux services divers',
        },
        {
            icon: 'Education',
            buttonLabel: 'Education',
            type: 'education',
        },
    ];

    const hanleClick = (value: dataModal) => {
        
        if (value.type === 'education') {
            router.push('/education')
        } else {
            isShowModal.value = true;
            contentModal.value = value;
        }
    };

    let isOpen = ref(true);

    const openMenu = () => {
        isOpen.value = !isOpen.value;
        console.log(isOpen.value);
    };
</script>
<template>
    <div>
        <div class="asideLeft">
            <Card class="asideLeft__container-mobile">
                <div class="asideLeft__item">
                    <span class="font-[600]"> Comité du quartier </span>
                </div>
            </Card>
            <Card
                class="asideLeft__container-mobile asideLeft__menuButton"
                @click="openMenu"
            >
                <div class="menuButton">
                    <span class="font-[600]"> Menu </span>
                    <Icon
                        icon-name="ArrowBottom"
                        :class="!isOpen ? 'arrowTop' : 'arrowBottom'"
                    />
                </div>
            </Card>
            <Transition appear name="fadeHeight" mode="out-in">
                <div class="asideLeft__section" v-show="!isOpen">
                    <div class="asideLeft__container" v-if="props.details">
                        <HeadCard
                            :labelName="props.details.committeeSurname"
                            dateAdded="il y a 6 jours"
                            :setting="true"
                            :avatar="props.details.committeeAvatar"
                        />
                        <div class="asideLeft__items">
                            <Input
                                :icon-field="true"
                                icon-name-field="Search"
                                placeholder="Recherche"
                                class="asideLeft__searchField"
                            />
                            <CommunityInfoCard
                                :edit-icon="true"
                                title-info="COORDONEES"
                                v-if="props.typeAction === 'community'"
                            >
                                <!-- <CommunityInfo
                            v-for="(items, index) in infoData"
                            :key="index"
                            :icon-name="items.icon"
                            :title-label="items.title"
                            :content-label="items.content"
                        /> -->
                                <CommunityInfo
                                    v-if="
                                        props.details.name ||
                                        props.details.firstname
                                    "
                                    key="0"
                                    icon-name="Profile"
                                    title-label="Nom complet"
                                    :content-label="
                                        props.details.name +
                                        ' ' +
                                        props.details.firstname
                                    "
                                />
                                <CommunityInfo
                                    v-if="props.details.address"
                                    key="1"
                                    icon-name="Map"
                                    title-label="Adresse"
                                    :content-label="props.details.address"
                                />
                                <CommunityInfo
                                    v-if="props.details.role"
                                    key="2"
                                    icon-name="Filled"
                                    title-label="Vous êtes"
                                    :content-label="props.details.role"
                                />
                            </CommunityInfoCard>
                            <CommunityInfoCard title-info="Communaute">
                                <div class="community__buttonMenu--wrap">
                                    <div
                                        v-for="(
                                            item, index
                                        ) in asideLeftButtonData"
                                        :key="index"
                                        class="community__buttonMenu"
                                    >
                                        <ButtonMenu
                                            class="buttonMenu"
                                            @on-click="hanleClick(item)"
                                        >
                                            <Icon
                                                v-if="item.icon"
                                                :icon-name="item.icon"
                                            />
                                            <span>
                                                {{ item.buttonLabel }}
                                            </span>
                                        </ButtonMenu>
                                    </div>
                                </div>
                            </CommunityInfoCard>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
        <Modal
            :title="contentModal.modalTitle"
            :isShowModal="isShowModal"
            @onBack="isShowModal = false"
        >
            <template #content>
                <CommunityPerimeters
                    :buttonTitle="contentModal.modalButton"
                    :data="contentModal"
                />
            </template>
        </Modal>
    </div>
</template>
<style lang="scss" scoped>
    @import '@/style.scss';

    .asideLeft {
        @apply w-full flex flex-col gap-y-[10px];
        @screen md {
            width: 315px;
            @apply fixed;
        }
        @screen lg {
            width: 270px;
        }
        @screen xl {
            width: 315px;
        }
        &__section {
            @apply flex flex-col bg-white rounded-lg p-[18px] w-full;

            @screen md {
                // max-width: 315px;
                width: 100%;
                max-height: calc(100vh - 100px);
                display: flex !important;
            }
        }

        &__container-mobile {
            @apply block w-full;

            @screen md {
                @apply hidden;
            }
            .asideLeft__item {
                @apply m-0 p-0;
            }
            .menuButton {
                @apply m-0 p-0 flex justify-between items-center;
                .arrowBottom {
                    transform: rotateX(0);
                    @apply transition-transform;
                }
                .arrowTop {
                    transform: rotateX(180deg);
                    @apply transition-transform;
                }
            }
        }

        &__menuButton {
            @apply cursor-pointer bg-blend-lighten transition;
            background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
            &:hover {
                @apply bg-blend-darken transition;
            }
        }

        &__container {
            @apply w-full flex flex-col gap-y-[18px];
        }

        &__items {
            @apply flex flex-col gap-y-[18px] px-[18px] -mx-[18px];
            @screen md {
                max-height: calc(100vh - 213px);
                @apply overflow-y-auto;
                @include scrollbar;
            }
        }
        &__searchField {
            @apply mb-0;
            &:deep() {
                .ant-input {
                    @apply bg-gray rounded-[24px] text-[12px];
                }
            }
        }
    }
    .community {
        &__buttonMenu--wrap {
            @apply flex flex-col gap-y-[14px];
        }
    }
    .asideLeft .button-menu {
        @apply w-full flex items-center gap-x-[16px] bg-gray rounded-[8px] border-none transition mb-0;
        &:hover {
            @apply bg-strokeGray transition;
        }
        &:deep() {
            .button-menu__wrap-icon {
                @apply hidden;
            }
            svg {
                @apply w-[18px] h-[18px];
            }
        }
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
