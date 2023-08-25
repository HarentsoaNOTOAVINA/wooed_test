<template>
    <div>
        <Loader v-if="loading" />
        <div v-else class="detail-container">
            <div class="detail__wrap">
                <BreadCrumb class="detail__breadcrumb" :items="breadcrumbs" />
                <div class="detail">
                    <div v-if="!showNavigationBtn" class="detail-head">
                        <BackButton text="Retour" @return="gotoMainView" />
                        <div class="detail-title">
                            <Paragraphe type="bold">
                                {{ currentTitle }}
                            </Paragraphe>
                        </div>
                    </div>
                    <component
                        :is="activeView"
                        :info="infoData"
                        :is-me="isMe"
                        :offerShared="listsOfferShared"
                        @changeView="changeView"
                        @handleShowOfferShare="showListOfferShare"
                    />
                    <NavigationLayout
                        @is-drower="handleDrower"
                        @handle-modal-choices-offer="choicesOffer"
                    >
                        <template #navigation>
                            <ButtonDetail
                                v-if="showNavigationBtn"
                                width="500px"
                                class="detail__btnList"
                                @clickChangeView="changeView"
                            />
                        </template>
                    </NavigationLayout>
                </div>
            </div>
            <div class="similar">
                <div class="similar__container">
                    <Card class="similar__title">
                        <Paragraphe type="bold" is="p"
                            >Biens similaire
                        </Paragraphe>
                    </Card>
                    <div class="similar__content">
                        <Empty
                            description="Aucun bien similaire"
                            v-if="infoData?.similars.length === 0"
                        />
                        <ProductCards
                            class="detail__productList"
                            v-else
                            :DataCard="infoData.similars"
                            @on-handle-product="gotoItsDetail"
                        />
                    </div>
                </div>
            </div>
            <div class="mobile-similar">
                <a-drawer
                    title="Biens similaire"
                    placement="bottom"
                    :visible="isDrower"
                    @close="isDrower = false"
                    :get-container="false"
                >
                    <div class="similar__content">
                        <Empty
                            description="Aucun bien similaire"
                            v-if="infoData?.similars.length === 0"
                        />
                        <ProductCards
                            class="detail__productList"
                            :DataCard="infoData.similars"
                            @on-handle-product="gotoItsDetail"
                        />
                    </div>
                </a-drawer>
            </div>

            <div class="offerShare__modal">
                <Modal
                    class="modaleOffer"
                    :title="`(${listsOfferShared.length}) offre partagée${
                        listsOfferShared.length > 1 ? 's' : ''
                    }`"
                    :width="widthModalOffer"
                    :is-show-modal="showListOffers"
                    @on-back="handleClosedModalListOffers"
                    ><template #content>
                        <div
                            class="offerShare__modal-list"
                            v-if="
                                isListOfferShared && listsOfferShared.length > 0
                            "
                        >
                            <div
                                class="offerShare__modal-content"
                                v-for="(data, key) in listsOfferShared"
                                :key="'_' + key"
                                @click="showDetailsOfferShared(data)"
                            >
                                <Paragraphe class="offerShare__percentage"
                                    >{{ data.totalQuotes }}%</Paragraphe
                                >

                                <div class="profile-container">
                                    <div
                                        class="profile-badge"
                                        v-for="(profile, index) in data.buyers"
                                        :key="index"
                                    >
                                        <img
                                            class="profile-avatar"
                                            :src="
                                                profile.user.logo ??
                                                '/src/static/images/default_profil.png'
                                            "
                                            alt="Profile Avatar"
                                        />
                                    </div>
                                    <div
                                        v-if="data.buyers.length > 3"
                                        class="profile-badge profile-badge-more"
                                    >
                                        <span class="profile-badge-count"
                                            >+{{ data.buyers.length - 3 }}</span
                                        >
                                    </div>
                                    <Paragraphe class="label-suite">
                                        associées
                                    </Paragraphe>
                                </div>
                            </div>
                        </div>

                        <div
                            class="offerShare__modal-noContent"
                            v-else-if="
                                isListOfferShared &&
                                listsOfferShared.length == 0
                            "
                        >
                            <Empty
                                description="Aucun offre partagée sur cette bien"
                            />
                        </div>
                        <div
                            class="offerShare__modal-details"
                            v-if="!isListOfferShared"
                        >
                            <div class="back" @click="showDetailsOfferShared">
                                <ArrowBack />
                            </div>
                            <div class="profile">
                                <div class="profile-container">
                                    <div
                                        class="profile-badge-detail"
                                        v-for="(
                                            profile, index
                                        ) in detailOfferSharedSelected.buyers"
                                        :key="index"
                                    >
                                        <img
                                            class="profile-avatar"
                                            :src="
                                                profile.user.logo ??
                                                '/src/static/images/default_profil.png'
                                            "
                                            alt="Profile Avatar"
                                        />
                                    </div>
                                </div>
                            </div>
                            <Paragraphe
                                >Le totale de l'offre partagée sur cette bien
                                sont de :
                                <span class="offerShare__percentage"
                                    >{{
                                        detailOfferSharedSelected.totalQuotes
                                    }}%</span
                                ></Paragraphe
                            >
                            <div class="offerShare__btn">
                                <Button
                                    @on-click="goToMakeOfferShared"
                                    v-if="
                                        detailOfferSharedSelected.totalQuotes <
                                            100 || !isMe
                                    "
                                    >Participer</Button
                                >
                                <Button
                                    @on-click="showDetailsOfferShared"
                                    v-else
                                    >Vous ne pouvez plus participer</Button
                                >
                            </div>
                        </div>
                    </template></Modal
                >
            </div>

            <div class="offerChoice__modal">
                <Modal
                    class="modaleOfferChoice"
                    title="Quel type d'offre voulez-vous faire?"
                    :is-show-modal="showChoicesOffer"
                    @on-back="handleClosedModalChoicesOffer"
                    ><template #content
                        ><ChoicesOffer
                            :choices-type="choicesTypeOfferStatus"
                            @handle-choices-type="choicesTypeOffer"
                        />
                        <!-- :user-list="userList" -->
                    </template></Modal
                >
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import ProductCards from '@/components/section/ListProducts/ListProducts.vue';
    import DataProps from '@/components/Display/productCard/CardType';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import Card from '@/components/Display/Card/Card.vue';
    import Paragraphe from '@/components/Common/Paragraphe/Paragraphe.vue';
    import MainDetail from '@/pages/detail/components/mainDetail/MainDetail.vue';
    import ButtonDetail from '@/pages/detail/components/buttonDetail/ButtonDetail.vue';
    import NavigationLayout from './components/layout.vue';
    import LiveVideo from '@/pages/detail/components/liveVideo/LiveVideo.vue';
    import DetailedInfo from '@/pages/detail/components/detailedInfo/DetailedInfo.vue';
    import RelateDocument from '@/pages/detail/components/RelateDocument/RelateDocument.vue';
    import ButtonLocation from '@/pages/detail/components/Location/ButtonLocation.vue';
    import { reactive, computed, shallowRef, ref, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { Store, useStore } from 'vuex';
    import { Empty, Drawer as ADrawer } from 'ant-design-vue';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import ArrowBack from '@/components/Icon/ArrowBack.vue';
    import ChoicesOffer from './components/ChoicesOffer/ChoicesOffer.vue';
    // route
    const route = useRoute();
    const router = useRouter();
    const breadcrumbs = computed(() => {
        return [
            {
                label: 'Acquérir un bien',
                url: '/liste-produit',
            },
            {
                label: 'Détails du bien',
                // url: '/detail',
            },
            // {
            //     label: 'B',
            //     url: '/Detail/B',
            // },
        ];
    });

    let isMe = ref(false);
    // let userList = ref<Array<any>>([]);
    let showListOffers = ref<boolean>(false);
    let showChoicesOffer = ref<boolean>(false);
    let isListOfferShared = ref<boolean>(true);
    let choicesTypeOfferStatus = ref<boolean>(true);
    let widthModalOffer = ref<string>('880');
    let profiles = [
        { avatar: '/src/static/images/immo.jpeg' },
        { avatar: '/src/static/images/immo.jpeg' },
        { avatar: '/src/static/images/immo.jpeg' },
        { avatar: '/src/static/images/immo.jpeg' },
        // ... autres profils
    ];

    //show Button navigation
    const showNavigationBtn = ref<boolean>(false);
    //screen size
    const screenType = ref<string | number>(screen.width);
    //data card
    const store: Store<any> = useStore();
    let dataCard = ref<Array<DataProps>>([]);
    let listsOfferShared = ref<Array<any>>([]);
    let detailOfferSharedSelected = ref<any>();
    //MainDetail data props
    let infoData = ref<any>();
    //loader
    let loading = ref<boolean>(true);
    const isDrower = ref<boolean>(false);

    const viewList: { [key: string]: any } = {
        MainDetail: {
            title: null,
            component: MainDetail,
        },
        LiveVideo: {
            title: 'Video Live',
            component: LiveVideo,
        },
        DetailedInfo: {
            title: 'Descriptif',
            component: DetailedInfo,
        },
        RelateDocument: {
            title: 'Document relatif',
            component: RelateDocument,
        },
        ButtonLocation: {
            title: 'Localisation',
            component: ButtonLocation,
        },
    };
    const currentTitle = ref<string>('');
    const activeView = shallowRef<string>(viewList['MainDetail'].component);

    onMounted(async () => {
        showNavigationBtn.value = true;
        await getOfferShared();
        getAllUserInApp();
        getPropertyList();
        getDetail();
        console.log('route query', route.query.type);
    });

    async function getOfferShared() {
        store.dispatch('MakeOfferModule/setParticipate', false);
        let results = await store.dispatch(
            'MakeOfferModule/setListOfferShared',
            { theProperty: route.params.id }
        );

        listsOfferShared.value = results.data;
    }

    //close detailedInfo
    function gotoMainView() {
        activeView.value = viewList['MainDetail'].component;
        showNavigationBtn.value = true;
    }
    function hide(): void {
        showNavigationBtn.value = false;
    }

    function gotoMap() {
        console.log('DBG go to map here');
    }

    function changeView(view: any) {
        // showInfo.value = false;
        console.log('view:', view);
        switch (view) {
            case 'MainDetail':
                showNavigationBtn.value = true;
                activeView.value = viewList['MainDetail'].component;
                break;
            case 'LiveVideo':
                hide();
                currentTitle.value = viewList['LiveVideo'].title;
                activeView.value = viewList['LiveVideo'].component;
                break;
            case 'DetailedInfo':
                hide();
                currentTitle.value = viewList['DetailedInfo'].title;
                activeView.value = viewList['DetailedInfo'].component;

                break;
            case 'RelateDocument':
                hide();
                currentTitle.value = viewList['RelateDocument'].title;
                activeView.value = viewList['RelateDocument'].component;

                break;
            case 'location':
                hide();

                currentTitle.value = viewList['ButtonLocation'].title;
                activeView.value = viewList['ButtonLocation'].component;
                break;
            case 'service-nearby':
                router.push({
                    name: 'service-nearby',
                    params: { id: route.params.id },
                });
                break;
            case 'AddServicesModal':
                router.push(`/financial-help/${route.params.id}`);
                break;
            case 'moving':
                router.push(`/demenagement/${route.params.id}`);
                // router.push({ name: 'transport-moving-announcement' });
                break;
            default:
                gotoMainView();
                break;
        }
    }

    const getPropertyList = async () => {
        loading.value = true;
        try {
            await store.dispatch('PropertyDetailModule/setPropertyList');
            const data = computed(
                () => store.getters['PropertyDetailModule/getPropertyList']
            );
            const d = computed(
                () => store.getters['PropertyDetailModule/getPropertyDetail']
            );

            isMe.value = d.value.data.isMe; //user conneté  = tomponlay bien
            dataCard.value = data.value.data;

            console.log('isMe:', isMe.value);
            console.log('property list:', dataCard.value);
        } catch (error) {
            console.log('error getting property list', error);
        }
    };

    const getDetail = async () => {
        loading.value = true;
        try {
            console.log('loading:', loading.value);
            await store.dispatch(
                'PropertyDetailModule/setPropertyData',
                route.params.id
            );
            const data = computed(
                () => store.getters['PropertyDetailModule/getPropertyDetail']
            );
            infoData.value = data.value.data;
            console.log('info property:', infoData.value);
        } catch (error) {
            console.log('error getting detail data:', error);
        } finally {
            loading.value = false;
        }
    };
    const gotoItsDetail = (id: number) => {
        router.push({ name: 'detail', params: { id } });
    };

    function handleDrower() {
        isDrower.value = true;
    }

    function showListOfferShare() {
        showListOffers.value = !showListOffers.value;
    }

    function handleClosedModalListOffers() {
        showListOffers.value = false;
        setTimeout(() => {
            isListOfferShared.value = true;
        }, 1000);
    }

    function showDetailsOfferShared(data: any) {
        isListOfferShared.value = !isListOfferShared.value;

        store.dispatch('MakeOfferModule/setDetailOfferShared', data);

        detailOfferSharedSelected.value = data;
    }

    function choicesOffer() {
        showChoicesOffer.value = true;
    }

    function handleClosedModalChoicesOffer() {
        showChoicesOffer.value = false;
        choicesTypeOfferStatus.value = true;
    }

    function choicesTypeOffer(value: any) {
        choicesTypeOfferStatus.value = value;
    }

    function goToMakeOfferShared() {
        store.dispatch('MakeOfferModule/setParticipate', true);
        router.push({
            name: 'make-offer-shared',
            params: { id: route.params.id },
        });
    }

    function getAllUserInApp() {
        store.dispatch('UserModule/setAllUser');
    }
</script>

<style lang="scss" scoped>
    @import '@/style.scss';
    .detail-container {
        // @apply container grid gap-[20px];
        @apply container flex flex-col gap-[20px];
        @screen sm {
            // @apply grid-cols-1;
        }
        @screen lg {
            // @apply grid-cols-3 mt-[20px];
            @apply flex-row justify-between mt-[20px];
        }
    }
    .detail {
        @apply w-full lg:bg-white lg:rounded-lg lg:mb-4 lg:p-3 lg:flex lg:flex-col gap-[14px];
        @screen lg {
            min-height: calc(100vh - 166px);
            @apply relative pb-[56px];
        }
        &-head {
            @apply pt-3 px-2 mb-2 flex flex-row justify-start gap-20 lg:gap-[35%] bg-white;
        }
        &__wrap {
            @apply flex flex-col gap-[18px];
            @screen lg {
                width: calc(100% - 455px);
                //     @apply col-span-2;
            }
        }
        &__txtDetail {
            @apply rounded bg-white mr-[10px] mb-0 ml-[10px] p-[10px];
            //responsive 1024px
            @apply lg:mt-[18px] lg:mx-5;
        }
        &__btnContainer {
            display: flex;
            flex-direction: column;
            gap: 5px;
            justify-content: center;
            @apply lg:flex lg:flex-row lg:justify-center;
        }
        .button {
            @apply w-full;
        }
        &__btnOffer {
            &:deep() {
                .button__primary {
                    width: 100%;
                }
            }
            @apply rounded text-sm font-semibold w-full;
            @media (min-width: 1024px) {
                width: 367px;
            }
        }
        &__btnList {
            padding: 0;
            //responsive lg
            margin-top: 20px;
            @screen lg {
                margin-top: 0px;
            }
            @apply lg:justify-center;
            //md
            @apply gap-[10px];
        }
        &__productList {
            height: fit-content;
            @apply grid sm:grid-cols-2 lg:grid-cols-1;
            &:deep() {
                .card {
                    @apply lg:w-full;
                    &:hover {
                        transform: none;
                    }
                }
            }
        }

        &__breadcrumb {
            @apply hidden lg:block;
        }

        //responsive
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s ease;
    }

    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
    .similar {
        @apply hidden;
        @screen lg {
            @apply block w-[435px];
        }
        &__container {
            width: 435px;
            @apply flex flex-col gap-[18px];
            @screen lg {
                @apply fixed;
            }
        }
        // &__title {
        //     margin-bottom: 10px;
        // }
        &__content {
            // height: calc(100vh - 150px);
            @screen lg {
                height: calc(100vh - 166px);
                @apply overflow-y-auto pr-[5px] mr-[-5px];
                @include scrollbar;
            }
            &:deep() {
                .ant-empty {
                    @apply h-full flex flex-col justify-center;
                }
            }
        }
    }
    .mobile-similar {
        @screen lg {
            @apply hidden;
        }
        &:deep() {
            .ant-drawer-content-wrapper {
                height: calc(100vh - 60px) !important;
            }
            .ant-drawer-body {
                @apply p-[15px];
                background-color: var(--color-gray);
            }
            // .ant-drawer-content {
            //     border-radius: 8px 8px 0 0;
            // }
            .ant-drawer {
                @apply z-[1001];
            }
            .anticon-close {
                @apply p-[4px] m-[-4px] rounded-full;
                &:hover:active,
                &:hover,
                &:active {
                    @apply bg-gray;
                }
            }
        }
        .similar__content {
            height: 100%;
            @apply overflow-y-auto;
            @include scrollbar;
        }
    }
    .detail-content {
        position: relative;
        &:deep() {
            .info {
                position: absolute;
                width: 100%;
                top: 0;
                left: 0;
                height: 100%;
                overflow: auto;
                z-index: 9;
                margin: 0;
                padding: 15px;
            }
        }
    }

    .offerShare {
        &__modal {
            &-list {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                grid-gap: 10px;

                @screen lg {
                    grid-template-columns: repeat(4, 1fr);
                }
            }
            &-content {
                @apply bg-[var(--color-gray)] p-[15px] rounded-[8px]  cursor-pointer;
            }
            &-details {
                @apply relative bg-[var(--color-gray)] rounded-[8px] flex flex-col items-center justify-center gap-[20px] w-[100%] min-h-[369px];
            }
            &-noContent {
                @apply flex items-center justify-center;
            }
        }

        &__percentage {
            @apply mb-4 font-bold;
            font-size: 25px;
        }
    }

    .profile-container {
        display: flex;
    }

    .profile-badge {
        @apply w-[25px] h-[25px] rounded-[25px] overflow-hidden	mr-[-10px];

        &-detail {
            @apply w-[50px] h-[50px] mr-[-5px] rounded-[25px] overflow-hidden;
        }
    }

    .profile-avatar {
        @apply w-[100%] h-[100%] object-cover;
    }

    .profile-badge-more {
        @apply bg-[var(--color-primary)] flex justify-center items-center;
    }

    .profile-badge-count {
        font-size: 18px;
        color: #fff;
    }

    .label-suite {
        @apply ml-[15px];
    }

    .back {
        @apply absolute top-[5px] left-[5px] cursor-pointer p-[5px];
    }
</style>
