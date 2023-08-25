<script lang="ts" setup>
    import CommunityPublicationAdd from '@/pages/community/components/CommunityPublication/CommunityPublicationAdd.vue';
    import CommunityPublicationCard from '@/pages/community/components/CommunityPublication/CommunityPublicationCard.vue';
    import CommunityAsideLeft from '@/pages/community/components/CommunityAsideLeft.vue';
    import CommunityAsideRight from '@/pages/community/components/CommunityAsideRight.vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import { onMounted, ref, shallowRef, watch } from 'vue';
    import LoadingButton from '@/components/Icon/LoadingButton.vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import PublicationImage from '@/pages/community/components/AddPublication/PublicationImage.vue';
    import PublicationAnimal from '@/pages/community/components/AddPublication/PublicationAnimal.vue';
    import PublicationParty from '@/pages/community/components/AddPublication/PublicationParty.vue';
    import PublicationConsultation from '@/pages/community/components/AddPublication/PublicationConsultation.vue';
    import PublicationServiceHelp from '../AddPublication/PublicationServiceHelp.vue';
    import PublicationBuyGroup from '../AddPublication/PublicationBuyGroup.vue';
    import PublicationObjectSell from '../AddPublication/PublicationObjectSell.vue';
    import PublicationPendaison from '../AddPublication/PublicationPendaison.vue';
    import PublicationBrocante from '../AddPublication/PublicationBrocante.vue';
    import PublicationPlp from '../AddPublication/PublicationPlp/PublicationPlp.vue';
    import { Empty as AEmpty } from 'ant-design-vue';

    enum TypeForm {
        IMAGE = 'image',
        ANIMAL = 'animal',
        PARTY = 'party',
        SERVICE = 'serviceHelp',
        GROUPBUY = 'groupBuy',
        SELLOBJECT = 'sellObject',
        PENDAISON = 'pendaison',
        BROCANTE = 'brocante',
        PLP = 'plp',
    }

    enum TypeAction {
        COMMUNITY = 'community',
        CONSULTATION = 'consultation',
        DIVERS_SERVICES = 'otherService',
    }

    const props = defineProps({
        typeAction: {
            type: String,
            default: 'community',
        },
    });

    const isShowModal = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const store = useStore();
    const routes = useRoute();
    const allPublication = ref<any>(null);
    const activeForm = shallowRef<Object>(PublicationImage);
    const detailsCommunity = ref<any>(null);
    const consultationList = ref<any>(null);
    const publications = ref<any>(null);
    const isPlp = ref<boolean>(false);

    watch(
        () => store.getters['CommunityModule/getAllPublication'],
        (value) => {
            publications.value = value;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => publications.value,
        (value) => {
            publications.value = value;
        },
        { immediate: true, deep: true }
    );

    watch(
        () => store.getters['CommunityModule/getListConsultation'],
        (value) => {
            publications.value = value;
        },
        { immediate: true, deep: true }
    );

    onMounted(() => {
        getAllPublication();
        getDetailsOfCommittee();
    });

    function handleShowModal(type: string) {
        isShowModal.value = true;
        switch (type) {
            case TypeForm.IMAGE:
                activeForm.value = PublicationImage;
                break;
            case TypeForm.ANIMAL:
                activeForm.value = PublicationAnimal;
                break;
            case TypeForm.PARTY:
                activeForm.value = PublicationParty;
                break;
            case TypeForm.SERVICE:
                activeForm.value = PublicationServiceHelp;
                break;
            case TypeForm.GROUPBUY:
                activeForm.value = PublicationBuyGroup;
                break;
            case TypeForm.SELLOBJECT:
                activeForm.value = PublicationObjectSell;
                break;
            case TypeForm.PENDAISON:
                activeForm.value = PublicationPendaison;
                break;
            case TypeForm.BROCANTE:
                activeForm.value = PublicationBrocante;
                break;
            case TypeForm.PLP:
                isPlp.value = true;
                isShowModal.value = false;

                break;

            default:
                activeForm.value = PublicationImage;
                break;
        }
    }

    function handleCloseModal() {
        isShowModal.value = false;
    }

    async function getAllPublication() {
        loading.value = true;
        try {
            if (props.typeAction === TypeAction.COMMUNITY) {
                const data = await store.dispatch(
                    'CommunityModule/getAllPublication',
                    routes.params.id
                );
                publications.value = data;
            } else if (props.typeAction === TypeAction.CONSULTATION) {
                const data = await store.dispatch(
                    'CommunityModule/getConsultation',
                    JSON.parse((localStorage as any).getItem('consultations'))
                );
                publications.value = data.data;
            } else if (props.typeAction === TypeAction.DIVERS_SERVICES) {
                const data = await store.dispatch(
                    'CommunityModule/getDiversServices',
                    JSON.parse((localStorage as any).getItem('consultations'))
                );
                console.log('Efa azo reto ihany ne ireo donnée\n', data);

                publications.value = data;
            }
        } catch (err) {
            console.log(
                'Erreur lors de la recuperation de tous les publications\n',
                err
            );
        } finally {
            loading.value = false;
        }
    }

    async function getDetailsOfCommittee() {
        if (props.typeAction === TypeAction.COMMUNITY) {
            const data = await store.dispatch(
                'CommunityModule/getDetailsOfCommunity',
                routes.params.id
            );
            detailsCommunity.value = data;
        }
    }

    async function onClickLike(idItem: number | string) {
        console.log('like\n', idItem);
        await store.dispatch('CommunityModule/likePublication', idItem);
    }

    function handleAddConsultation() {
        isShowModal.value = !isShowModal.value;
        activeForm.value = PublicationConsultation;
    }
</script>

<template>
    <div class="">
        <Loader v-if="loading" />
        <div class="community__container" v-else>
            <div class="community__wrap">
                <CommunityAsideLeft
                    class="community__left--container"
                    :details="detailsCommunity?.user"
                    :type-action="props.typeAction"
                />
                <div class="community__main">
                    <CommunityPublicationAdd
                        v-if="props.typeAction !== 'consultation'"
                        @click="handleShowModal"
                    />
                    <div class="flex flex-col gap-[20px]">
                        <CommunityPublicationCard
                            v-for="item in publications"
                            :key="item.id"
                            :publication="item"
                            @on-set-favorite="onClickLike"
                            :type-action="props.typeAction"
                        />
                    </div>
                </div>
                <CommunityAsideRight
                    class="community__right--container"
                    :details="detailsCommunity?.committee"
                    :type-action="props.typeAction"
                    @add-consultation="handleAddConsultation"
                />
            </div>
        </div>
        <Modal
            title="Ajouter une publication"
            :isShowModal="isShowModal"
            @onBack="isShowModal = false"
        >
            <template #content>
                <component :is="activeForm" @closeModal="handleCloseModal" />
                <!-- <PublicationImage @closeModal="handleShowModal(false)" /> -->
                <!-- <PublicationAnimal/> -->
            </template>
        </Modal>
        <PublicationPlp :visible="isPlp" @close="isPlp = false" />
    </div>
</template>

<style lang="scss" scoped>
    .community {
        &__container {
            @apply container flex justify-between gap-x-[24px] mt-[18px];
        }
        &__main {
            @apply w-full flex flex-col gap-y-[10px] mb-[20px];
            @screen md {
                width: calc(100% - 315px - 24px);
                @apply gap-y-[24px];
            }
            @screen lg {
                width: calc(100% - 540px - 48px);
            }
            @screen xl {
                width: calc(100% - 630px - 48px);
            }
        }
        &__left--container,
        &__right--container {
            @apply w-full;
            @screen md {
                width: 315px;
            }
            @screen lg {
                width: 270px;
            }
            @screen xl {
                width: 315px;
            }
        }
        &__right--container {
            @apply hidden;
            @screen lg {
                @apply block;
            }
        }
        &__wrap {
            @apply flex flex-col w-full gap-[10px];
            @screen md {
                @apply flex-row gap-[24px];
            }
        }
        &__main-other {
            @apply bg-white rounded-[8px] flex-1 w-[100%] gap-[10px];
        }
    }
</style>
