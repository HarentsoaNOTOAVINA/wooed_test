<template>
    <Loader v-if="loading" />
    <div v-else class="container offer">
        <BackButton @return="backToDetail" text="Retour" />
        <div class="mt-4">Les offres</div>
        <hr class="mt-[14px]" />

        <!-- <NotaryCard/> -->
        <template v-if="!isShowOfferList">
            <UserOffer
                v-for="(item, index) in userDataCard"
                :dataUserOffer="item"
                :key="index"
                @gotoOfferCard="getOfferByUser(item.id, item.user.id)"
            />
        </template>
        <template v-if="isShowOfferList">
            <OfferCard
                v-for="(item, index) in dataCardOffer"
                :key="index"
                :dataCard="item"
                @openModal="modalHandler"
                @gotoCounterOffer="gotoCounterOffer"
                @validateOffer="handleValidateOffer"
                @rejectOffer="handleDeclineOffer"
                @validSign="validSign"
                :isLast="index === 0"
                :loadingBtnAccepted="loadingButtonAcc"
            />
        </template>
        <Modal
            class="offer__rejectModal"
            title="Refuser l'offre"
            :isShowModal="modalShow"
            @onBack="modalHandler"
        >
            <template #content>
                <TextArea
                    placeholder="La raison de votre refus"
                    label="Raison"
                    required
                    nameInput="reason"
                    v-model:value="reasonValue"
                    @onChange="handleChange"
                ></TextArea>
                <Button
                    class="offer__btnValidate"
                    @on-click="handleDeclineOffer"
                    >Valider</Button
                >
            </template>
        </Modal>
    </div>
</template>

<script lang="ts" setup>
    import BackButton from '@/components/Common/BackButton/BackButton.vue';
    import OfferCard from '../OfferCard/OfferCard.vue';
    import UserOffer from '../UserOffers/UserOffers.vue';
    import { useRoute, useRouter } from 'vue-router';
    import Modal from '@/components/Display/Modal/Modal.vue';
    import TextArea from '@/components/Common/TextArea/TextArea.vue';
    import Button from '@/components/Common/Button/Button.vue';
    import Loader from '@/components/Common/Loader/Loader.vue';
    import { computed, onMounted, ref } from 'vue';
    import { message, notification } from 'ant-design-vue';
    import store from '@/store';
    const route = useRoute();
    const router = useRouter();

    const dataCardOffer = ref<any>([]);
    const userDataCard = ref<any>([]);
    let reasonValue = ref<string>('');
    let modalShow = ref<boolean>(false);
    let isShowOfferList = ref<boolean>(false);
    let loadingButtonAcc = ref<boolean>(false);
    let signature = ref('');

    //loader
    let loading = ref<boolean>(true);

    onMounted(() => {
        getOfferListByProperties();
        getOfferList();
    });
    const backToDetail = () => {
        console.log('back to detail', route.params.id);
        isShowOfferList.value = false;
        // router.push({ path: `/detail/${route.params.id}` });
    };
    const modalHandler = () => {
        modalShow.value = !modalShow.value;
    };
    const handleChange = (e: string) => {
        reasonValue.value = e;
        console.log('handleChange:', e);
    };
    const onValidate = () => {
        console.log('reasonValue:', reasonValue.value);
    };

    const getOfferList = async () => {
        // loading.value = true;
        try {
            await store.dispatch('SellerModule/setOfferByProperties', route.params.id);
            const data = computed(
                () => store.getters['SellerModule/getOfferList']
            );
            dataCardOffer.value = data.value.data;
            console.log('datacard offer:', dataCardOffer.value);
        } catch (error) {
            console.log('error', error);
        } finally {
            // loading.value = false;
        }
    };

    const gotoCounterOffer = (idOffer: number) => {
        router.push({
            path: `/contre-offre/${idOffer}`,
            query: { type: 'offer' },
        });
    };

    const getOfferListByProperties = async () => {
        console.log('miantso anle izy 2');
        loading.value = true;
        try {
            await store.dispatch(
                'SellerModule/setOfferByProperties',
                route.params.id
            );
            const dataUserOfferList = computed(
                () => store.getters['SellerModule/getOfferByProperties']
            );
            userDataCard.value = dataUserOfferList.value.data;
        } catch (error) {
            console.log('error getting properties offer', error);
        } finally {
            loading.value = false;
        }
    };
    let signSimple = ref<string>('');
    const validSign = (sign: string) => {
        signSimple.value = sign;
        console.log('sign', signSimple.value);
    };

    const handleValidateOffer = async (rs?: object, req?: object) => {
        const __dataValidate = {
            offer: dataCardOffer.value[0].id,
            signOwner: signSimple.value,
            signClient: dataCardOffer.value[0].signClient,
            responseType: 'accepted',
            urlDetailTheProperty: `${window.location.origin}/detail/${dataCardOffer.value[0].theProperty.id}`,
            urlSite: `${window.location.origin}`,
            description: '',
        };
        let signOnSpan = dataCardOffer.value[0].isOnSpanSign;
        // console.log('signOnSpan:', signOnSpan);
        if (signOnSpan) {
            try {
                loadingButtonAcc.value = true;
                let { data } = await store.dispatch(
                    'SellerModule/postValidateOffer',
                    __dataValidate
                );

                if (data.success) {
                    notification['success']({
                        message: 'Validation OK',
                        description:
                            'Veuillez patientez quelques minutes et signer le contrat dans OneSpan',
                    });
                    window.location.href = data.data.urlOnespan2;
                }
            } catch (error) {
                notification['error']({
                    message:
                        "Une erreur est survenue, veuillez ressayer s'il vous plaît",
                });
            } finally {
                loadingButtonAcc.value = false;
            }
        } else {
            console.log('manomboka else:', loadingButtonAcc.value);
            loadingButtonAcc.value = true;
            try {
                await store.dispatch(
                    'SellerModule/postValidateOfferSimple',
                    __dataValidate
                );
                const res = computed(
                    () => store.getters['SellerModule/getDataValidateOffer']
                );
                console.log('res validate:', res.value);
                console.log('res validate:', rs);
            } catch (error) {
                notification['error']({
                    message: "Une erreur s'est produite...",
                    description: 'veuillez réessayer',
                });
            } finally {
                loadingButtonAcc.value = false;
            }
            // notification['success']({
            //     message: 'Offre anvoyée',
            //     description: 'Votre offre a bien été envoyée.',
            // });
            router.go(0); // 0  = step to go back
        }
    };

    const handleDeclineOffer = async () => {
        const __dataDecline = {
            offer: dataCardOffer.value[0].id,
            signOwner: dataCardOffer.value[0].signOwner,
            signClient: dataCardOffer.value[0].signClient,
            responseType: 'refused',
            urlDetailTheProperty: `http://localhost:3002/detail/${dataCardOffer.value[0].theProperty.id}`,
            urlSite: 'http://localhost:3002/',
            description: reasonValue.value,
        };
        try {
            const r = await store.dispatch(
                'SellerModule/postDeclineOffer',
                __dataDecline
            );
            const res = computed(
                () => store.getters['SellerModule/getDataRefusedOffer']
            );
            if (res.value.status === 200) {
                modalShow.value = !modalShow.value;
                notification['warning']({
                    message: "Vous avez refuser l'offre",
                });
                router.go(0);
            }
            console.log('rrrrr', r);
            console.log('res refused', res.value.status);
        } catch (error) {
            notification['error']({
                message: "Une erreur s'est produite...",
                description: 'veuillez réessayer',
            });
        } finally {
        }
    };

    const getOfferByUser = async (idProperty: number, idUser: number) => {
        isShowOfferList.value = true;
        loading.value = true;
        try {
            await store.dispatch('SellerModule/setOfferUser', {
                payloadProperty:
                    store.getters['PropertyDetailModule/getPropertyDetail'].data
                        .id,
                payloadUser: idUser,
            });
            const data = computed(
                () => store.getters['SellerModule/getOfferByProperties']
            );
            dataCardOffer.value = data.value.data;
            console.log('dataaaaaaaaaaaaaaaaaaaaaaa:', dataCardOffer.value);
        } catch (error) {
            console.log('error getting offer by user');
        } finally {
            loading.value = false;
        }
    };
</script>

<style lang="scss" scoped>
    .offer {
        @apply py-[20px] px-[20px] bg-white  my-[10px] rounded-[8px];
        &__rejectModal {
        }
        &__btnValidate {
            @apply lg:w-full lg:flex lg:justify-end;
            &:deep() {
                .button__primary {
                    @apply w-full lg:w-auto;
                }
            }
            @apply rounded text-sm font-semibold w-full mt-[20px];
        }
    }
</style>
