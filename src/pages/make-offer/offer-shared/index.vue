<template>
    <div class="container">
        <BreadCrumb class="mt-3" :items="breadCrumbContent" />

        <div class="offerShared__container" id="document-offer">
            <FormOfferShared
                class="offerShared__form"
                :is-save-offer="loadignPuslish"
                @on-sign-offer="handleSignOffer"
                @handle-passed-mail-box-seller="setMailBoxSeller"
                @handle-save-offer-shared="saveOfferShared"
            />

            <DocsOfferShared
                class="offerShared__document"
                :detail-participants="detailParticipant"
                :image-signature="dataDocs.imageSignature"
                :price-offer="dataDocs.priceOffer"
                :name-buyer="dataDocs.nameBuyer"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import Button from '@/components/Common/Button/Button.vue';
    import DocsOfferShared from './components/DocsOfferShared.vue';
    import FormOfferShared from './components/FormOfferShared.vue';
    // import jsPDF from 'jspdf';
    import html2canvas from 'html2canvas';
    import BreadCrumb from '@/components/Display/BreadCrumb/BreadCrumb.vue';
    import OfferService from '@/services/offerService';
    import { computed, onMounted, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    import { notification } from 'ant-design-vue';
    import { useStore } from 'vuex';
    import MiniMailBox from '@/services/miniMailBoxService';

    let route = useRoute();
    let router = useRouter();
    let store = useStore();

    let loadignPuslish = ref<boolean>(false);
    let isParticipate = store.getters['MakeOfferModule/getParticipate'];
    let dataParamsOffer = ref<any>();
    let inBox = ref<any>();

    let dataMailBox = ref<any>({
        inboxMail: '',
        sellerInboxMail: '',
    });

    let detailParticipant = ref<any>();
    let dataDocs = ref<any>({
        imageSignature: '',
        priceOffer: 0,
        nameBuyer: '',
    });

    const breadCrumbContent = computed(() => [
        {
            label: 'Détails du bien',
            url: `/detail/${route.params.id}`,
        },
        { label: 'Faire une offre partagée' },
    ]);

    onMounted(() => {
        getUserDetailsAndCreateMailIdIfnotExist();
    });

    async function getUserDetailsAndCreateMailIdIfnotExist() {
        let userDetails = store.getters['UserModule/getUserDetails'];
        console.log(userDetails, 'User details in offer shared');
        if (userDetails.mailId !== null) {
            inBox.value = userDetails.mailId;
            if (isParticipate) {
                console.log(userDetails.id, 'id userDetails ATO');

                const inboxDataUser = await getInboxById(userDetails.id);

                dataMailBox.value.inboxMail = inboxDataUser[0].emailAddress;

                console.log(inboxDataUser, 'INBOXBYYD ATO >>>>>>>>>>>>>>>>');
            }
        } else {
            // Récupère l'ID inbox de cet utilisateur s'il existe
            try {
                const inboxDataUserConnected = await getInboxById(
                    userDetails.id
                );
                console.log(inboxDataUserConnected, 'INBOXBYYD');
                if (
                    inboxDataUserConnected &&
                    inboxDataUserConnected.length &&
                    inboxDataUserConnected[0].id !== null
                ) {
                    inBox.value = inboxDataUserConnected[0].id;
                    dataMailBox.value.inboxMail =
                        inboxDataUserConnected[0].emailAddress;

                    console.log(
                        dataMailBox.value.inboxMail,
                        'DATAMAILOX GETIINBOX'
                    );
                } else {
                    // Ceci crée un inbox si on n'a pas encore un inbox
                    const param = {
                        userId: userDetails?.id,
                        name: userDetails?.name,
                    };
                    const data = await createInbox(param);
                    console.log(data, 'DATA MAIL BOX CREATED');
                    inBox.value = data.id;
                    dataMailBox.value.inboxMail = data.emailAddress;
                    console.log(
                        dataMailBox.value.inboxMail,
                        'DATAMAILOX CREATE'
                    );
                }
            } catch (error) {
                console.error(error, 'Error when get or create inbox');
            }
        }

        console.log(inBox.value, 'INBOXGLOBAL');

        console.log(dataMailBox.value.inboxMail, 'DATAMAILOX GLOBAl');
    }

    function handleSignOffer(dataToDoc: any) {
        console.log(dataToDoc, 'DATA Value');

        dataDocs.value.imageSignature = dataToDoc.signature;
        dataDocs.value.priceOffer = dataToDoc.price;
        dataDocs.value.nameBuyer = dataToDoc.nameBuyer;
    }

    function setMailBoxSeller(mailSeller: string) {
        dataMailBox.value.sellerInboxMail = mailSeller;
    }

    async function saveOfferShared(dataFromForm: any) {
        dataParamsOffer.value = dataFromForm;

        if (!isParticipate) {
            // inBox when sending message to mini-boit mail or list of the users that had selected in previous step
            dataParamsOffer.value.sellerInboxMail =
                dataMailBox.value.sellerInboxMail;
            dataParamsOffer.value.inboxMail = dataMailBox.value.inboxMail;

            console.log(dataParamsOffer.value, 'DATA To CREate offer shared');
            try {
                loadignPuslish.value = true;
                // add create offer shared
                const responseCreateOfferShared =
                    await OfferService.addOfferShared(dataParamsOffer.value);

                console.log(
                    responseCreateOfferShared,
                    'responseCreateOfferShared'
                );
                if (responseCreateOfferShared.data.code == 201) {
                    loadignPuslish.value = false;
                    notification['success']({
                        message: 'Offre partagé',
                        description: 'Votre offre partagé a été bien publiée.',
                    });
                    console.log('OK', responseCreateOfferShared.data);
                    router.push('/');
                    store.dispatch('MakeOfferModule/setStatusRequest', true);
                } else {
                    notification['warning']({
                        message: 'Erreur',
                        description:
                            "Impossible d'envoyée votre offre partagé",
                    });
                }
            } catch (error) {
                console.log("erreur de validation de l'offre partagé", error);
            } finally {
                loadignPuslish.value = false;
            }
        } else {
            // dataParamsOffer.value = dataFromForm;
            dataParamsOffer.value.offer =
                store.getters['MakeOfferModule/getDetailOfferShared'].id;
            dataParamsOffer.value.inbox = inBox.value;
            dataParamsOffer.value.urlSite = `"${window.location.origin}/"`;
            dataParamsOffer.value.urlPropertyDetail = `"${window.location.origin}/detail/${dataFromForm.theProperty}"`;
            dataParamsOffer.value.inboxMail = dataMailBox.value.inboxMail;

            console.log(dataParamsOffer.value, 'Data params OFFER SHAREED');

            try {
                loadignPuslish.value = true;
                const responseJoinOffer = await OfferService.joinOfferShared(
                    dataParamsOffer.value
                );

                console.log(responseJoinOffer, 'RESPONSE_JOIN_OFFER');
                if (responseJoinOffer.data.code === 200) {
                    loadignPuslish.value = false;
                    notification['success']({
                        message: 'Offre partagée',
                        description:
                            'Votre participation a été prise en compte.',
                    });
                    console.log('OK', responseJoinOffer.data.data);
                    router.push('/');
                    store.dispatch('MakeOfferModule/setStatusRequest', true);
                } else {
                    notification['warning']({
                        message: 'Erreur',
                        description:
                            'Immpossible de rejoindre cette offre partagée',
                    });
                }
            } catch (error) {
                console.log(
                    "erreur lors de demande de rejoindre l'offre",
                    error
                );
            } finally {
                loadignPuslish.value = false;
            }
        }
    }

    async function getInboxById(userId: any) {
        const data = await MiniMailBox.getInboxesById(userId);
        return data;
    }

    async function createInbox(param: any) {
        const { data } = await MiniMailBox.createInbox(param);
        return data;
    }

    // function savePdf() {
    //     html2canvas(document.getElementById('document-offer') as any).then(
    //         (canvas: any) => {
    //             const imgData = canvas.toDataURL('image/png'); // Convertir l'image en base64

    //             // Générer un nouveau document PDF
    //             const pdf: any = new jsPDF();
    //             pdf.addImage(imgData, 'PNG', 0, 0); // Ajouter l'image dans le PDF
    //             pdf.save('document.pdf'); // Télécharger le fichier PDF}
    //         }
    //     );
    // }
</script>

<style scoped lang="scss">
    .offerShared {
        &__container {
            @apply flex flex-row bg-[#fff] mt-3 p-[5px];
        }

        &__form {
            @apply flex-1;
        }

        &__document {
            display: none;

            @screen md {
                @apply block;
            }

            @apply flex-1 bg-[var(--color-gray)] p-[8px];
        }
    }
</style>
