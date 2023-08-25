<script setup lang="ts">
    import TransitionComponent from '@/components/Common/Transition/Transition.vue';
    import Status from './StatusPurchase/CardStatusOffer.vue';
    import AgrementCard from './AgrementPurchase/CardAgrement.vue';
    import DeedPurchase from './DeedPurchase/DeedPurchase.vue';

    import {
        LeftCircleOutlined,
        RightCircleOutlined,
    } from '@ant-design/icons-vue';
    import MenuOffer from '@/pages/user-account/Menu/Purchases/Buyer/components/CarouselContent/Offer.vue';
    import MenuAgrrement from '@/pages/user-account/Menu/Purchases/Buyer/components/CarouselContent/Agreement.vue';
    import MenuDeed from '@/pages/user-account/Menu/Purchases/Buyer/components/CarouselContent/Deed.vue';
    import ACarousel from 'ant-design-vue/lib/carousel';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { computed, onBeforeMount, onMounted, ref } from 'vue';
    import { Store, useStore } from 'vuex';
    import moment from 'moment';

    const props = defineProps<{
        id?: any;
    }>();
    const accepted = ref<boolean>(false);

    let loadingListeOffer = ref();
    let oldIdBienOfferedStore = ref();
    const store: Store<any> = useStore();
    let dataOffer = ref<any>([]);
    const compromisList = ref([]);
    let idOffer = ref<number>(0);
    const dateRest = ref();

    onMounted(async() => {
        getStoreOrBack();
        // getOfferList()
    });

    function getStoreOrBack() {
        console.log(props.id, '>>>>> id Menu');
        let dataStore = getStore('MakeOfferModule/getOfferList');

        //0000
        oldIdBienOfferedStore.value = store.getters["MakeOfferModule/getOldIdBienOffered"]

        console.log(store.getters["MakeOfferModule/getOldIdBienOffered"], 'old id dataStore>>>>>');
        console.log(props.id, 'old id id  id dataStore>>>>>');

        if (dataStore.value && oldIdBienOfferedStore.value === props.id) {
            console.log(dataStore.value, '>>>>>.Data No request');
            dataOffer.value = [...dataStore.value.data.offers];
            console.log("data offerrrrrrrrrrrrrr:", dataOffer.value);
            getCompromis(dataStore.value.data);
            console.log('DATA OFFER', dataOffer.value);
            loadingListeOffer.value = false;
        } else {
            getOfferList();
            console.log("get tonga");
        }
    }

    async function getOfferList() {
        await store.dispatch('MakeOfferModule/setOldIdBienOffered', props.id);
        oldIdBienOfferedStore.value = getStore(
            'MakeOfferModule/getOldIdBienOffered'
        );
        try {
            loadingListeOffer.value = true;
            await store.dispatch('MakeOfferModule/setOfferList', props.id);
            let data = getStore('MakeOfferModule/getOfferList');
            console.log(data.value, '>>>>>.Data value');
            dataOffer.value = [...data.value.data.offers];
            console.log(data.value.data, '>>>>>.Data offer');
            await getCompromis(data.value.data);
        } catch (error) {
            console.log(error);
        } finally {
            loadingListeOffer.value = false;
        }
    }

    // function pour utiliser un getters dans store pren en paramere les getters
    function getStore(getterStore: string) {
        return computed(() => store.getters[getterStore]);
    }

    async function getCompromis(data : any){
        console.log("ivelany",data);

        if(data.offerAccepted){
            console.log("anatiny");
            
            handleCalculeDate(data.offerAccepted.dateLimitSalesAgreement);
            loadingListeOffer.value = true;
            idOffer.value =  data.offerAccepted.id;
            await store.dispatch('MakeOfferModule/setListCompromis', data.offerAccepted.id).then((res) => {
                compromisList.value = store.getters['MakeOfferModule/getCompromisList'];
                accepted.value = true;
            }).finally(() => {
                loadingListeOffer.value = false;
                store.dispatch('MakeOfferModule/getIdToGetHistory', 
                {
                    idOffer : data.offerAccepted.id
                });
            })
        }
    }

    

    function handleCalculeDate(date :Date){        
        dateRest.value = moment(date).diff(moment(), 'days');
    }
</script>

<template>
    <div>
        <TransitionComponent v-if="!loadingListeOffer">
            <div class="menu__content">
                <a-carousel arrows>
                    <template #prevArrow>
                        <div
                            class="custom-slick-arrow"
                            style="left: 10px; z-index: 1"
                        >
                            <left-circle-outlined />
                        </div>
                    </template>
                    <template #nextArrow>
                        <div class="custom-slick-arrow" style="right: 10px">
                            <right-circle-outlined />
                        </div>
                    </template>
                    <MenuOffer
                        :numberOffers="dataOffer.length"
                        :statusLastOffer="dataOffer"
                        @on-click-detail-offer="
                            $emit('on-change-cmp', {
                                label: 'Details Offres',
                                value: Status,
                                active: true,
                                emittedValue: {
                                    label: 'dataOffre',
                                    value: dataOffer,
                                },
                            })
                        "
                    />
                    <MenuDeed
                        @on-click-detail-deed="
                            $emit('on-change-cmp', {
                                label: 'Details du  acte de vente',
                                value: DeedPurchase,
                                active: true,
                            })
                        "
                    />
                    <!-- <MenuAgrrement
                        @on-click-detail-agreement="
                            $emit('on-change-cmp', {
                                label: 'Details du compromis',
                                value: AgrementCard,
                                active: true,
                                emittedValue: {
                                    label: 'compromisList',
                                    value: compromisList,
                                },
                            })
                        "
                    /> -->
                    <MenuAgrrement  
                        title="Compromis"
                        :compromis-list="compromisList"
                        :date-rest="dateRest"
                        :accepted="accepted"
                        :id-offer="idOffer"
                        @on-click-detail-agreement="$emit('on-change-cmp', {
                            label: 'Details du compromis',
                            value: AgrementCard,
                            active: true,
                            emittedValue: { label: 'compromisList', value: compromisList }

                        })" />
                    <MenuDeed />
                </a-carousel>
            </div>
        </TransitionComponent>
        <TransitionComponent v-if="loadingListeOffer === false">
            <div class="menu__content-web">
                <MenuOffer
                    :numberOffers="dataOffer.length"
                    :statusLastOffer="dataOffer"
                    :idOffer="idOffer"
                    @on-click-detail-offer="
                        $emit('on-change-cmp', {
                            label: 'Details offre',
                            value: Status,
                            active: true,
                            emittedValue: {
                                label: 'dataOffre',
                                value: dataOffer,
                            },
                        })
                    "
                />
                <MenuAgrrement 
                    title="Compromis"    
                    :compromis-list="compromisList"
                    :accepted="accepted"
                    :id-offer="idOffer"
                    :date-rest="dateRest"
                    @on-click-detail-agreement="
                        $emit('on-change-cmp', {
                            label: 'Details du compromis',
                            value: AgrementCard,
                            active: true,
                            emittedValue: {
                                label: 'compromisList',
                                value: compromisList,
                            },
                        })
                    "
                />
                <MenuDeed
                    @on-click-detail-deed="
                        $emit('on-change-cmp', {
                            label: 'Details du  acte de vente',
                            value: DeedPurchase,
                            active: true,
                        })
                    "
                />
            </div>
        </TransitionComponent>
        <div v-if="loadingListeOffer">
            <Loader />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .menu {
        &__content {
            height: 445px;
            &:deep() {
                .ant-carousel
                    .slick-slider
                    .slick-list
                    .slick-track
                    .slick-slide.slick-active
                    div:nth-child(1) {
                    max-height: 100%;
                }
            }

            @screen md {
                display: none;
            }
        }

        &__content-web {
            display: none;

            @screen md {
                @apply flex flex-row items-center justify-between gap-4;
            }
        }
    }
    /* For demo */
    .ant-carousel :deep(.slick-slide) {
        @apply w-[237.33px] h-[445px] h-full text-center truncate rounded-lg;
        border: 2px solid var(--color-gray);
    }

    .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
        @apply w-[25px] h-[25px] text-[25px];
        color: var(--color-primary);
        background-color: rgba(31, 45, 61, 0.11);
        opacity: 0.3;
        z-index: 1;
    }
    .ant-carousel :deep(.custom-slick-arrow:before) {
        display: none;
    }
    .ant-carousel :deep(.custom-slick-arrow:hover) {
        opacity: 0.5;
    }

    .ant-carousel :deep(.slick-dots) {
        z-index: -1;
        // color: #fff;
    }
</style>
